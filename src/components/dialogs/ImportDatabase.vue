<!--
  - This Source Code Form is subject to the terms of the Mozilla Public
  - License, v. 2.0. If a copy of the MPL was not distributed with this file,
  - you could obtain one at https://mozilla.org/MPL/2.0/.
  -
  - Copyright (c) 2014-2025, Martin Berner, kontenmanager@gmx.de. All rights reserved.
  -->
<script lang="ts" setup>
import {useRecordsStore} from '@/stores/records'
import {useI18n} from 'vue-i18n'
import {useAppApi} from '@/pages/background'
import {useSettingsStore} from '@/stores/settings'
import {useRuntimeStore} from '@/stores/runtime'
import {reactive} from 'vue'
import {frontendMessagePort} from '@/pages/app'

interface IEventTarget extends HTMLInputElement {
  target: { files: File[] }
}

const {t} = useI18n()
const {CONS, log, toISODate} = useAppApi()
const settings = useSettingsStore()

const state = reactive({
  _choosen_file: new Blob()
})

const ok = async (): Promise<void> => {
  log('IMPORTDATABASE: ok', {info: state._choosen_file})
  const {notice} = useAppApi()
  const records = useRecordsStore()
  const runtime = useRuntimeStore()
  const onError = async (): Promise<void> => {
    await notice(['IMPORTDATABASE: onError: FileReader'])
  }
  const onFileLoaded = async (): Promise<void> => {
    log('IMPORTDATABASE: onFileLoaded')
    if (typeof fr.result === 'string') {
      const bkupObject: IBackup = JSON.parse(fr.result)
      let account: IAccount
      let booking: IBooking
      let transfer: Record<string, never>
      let bookingType: IBookingType
      let stock: Record<string, never>
      let credit = 0
      let debit = 0
      let canid = -1
      let tid = -1
      if (bkupObject.sm.cDBVersion < CONS.DB.MIN_VERSION) {
        await notice([t('dialogs.importDatabase.messageVersion', {version: CONS.DB.MIN_VERSION.toString()})])
      } else if (bkupObject.sm.cDBVersion >= CONS.DB.MIN_VERSION && bkupObject.sm.cDBVersion < CONS.DB.START_VERSION) {
        if (records.accounts.length > 0) {
          await notice([t('dialogs.importDatabase.messageVersion')])
          return
        }
        //await records.clean()
        if (records.accounts.length > 0) {
          canid = Math.max(...records.accounts.map((account: IAccount) => account.cID)) + 1
        } else {
          canid = 1
        }
        if (records.bookings.all.length > 0) {
          tid = Math.max(...records.bookings.all.map((account: IAccount) => account.cID)) + 1
        } else {
          tid = 1
        }
        records.accounts.push({cID: canid, cSwift: 'AAAAAAA0000', cNumber: 'XX00000000000000000000', cLogoUrl: CONS.LOGOS.NO_LOGO, cStockAccount: true})
        for (stock of bkupObject.stocks) {
          const company = {
            cID: stock.cID,
            cISIN: stock.cISIN,
            cWKN: stock.cWKN,
            cSymbol: stock.cSym,
            cFadeOut: stock.cFadeOut,
            cFirstPage: stock.cFirstPage,
            cURL: stock.cURL,
            cCompany: stock.cCompany,
            cMeetingDay: toISODate(stock.cMeetingDay),
            cQuarterDay: toISODate(stock.cQuarterDay)
          }
          records.stocks.all.push(company)
        }
        for (transfer of bkupObject.transfers) {
          if (transfer.cAmount === 0 && transfer.cUnitQuotation * transfer.cCount < 0) {
            credit = -transfer.cUnitQuotation * transfer.cCount
          }
          if (transfer.cAmount === 0 && transfer.cUnitQuotation * transfer.cCount > 0) {
            debit = transfer.cUnitQuotation * transfer.cCount
          }
          if (transfer.cAmount < 0) {
            debit = -transfer.cAmount
          }
          if (transfer.cAmount > 0) {
            credit = transfer.cAmount
          }
          const booking: IBooking = {
            cID: transfer.cID || tid,
            cDate: toISODate(transfer.cDate),
            cExDate: toISODate(transfer.cExDay),
            cCount: transfer.cCount < 0 ? -transfer.cCount : transfer.cCount,
            cDescription: transfer.cDescription,
            cBookingTypeID: transfer.cType,
            cTransactionTax: -transfer.cFTax,
            cSourceTax: -transfer.cSTax,
            cFee: -transfer.cFees,
            cTax: -transfer.cTax,
            cMarketPlace: transfer.cMarketPlace,
            cSoli: -transfer.cSoli,
            cStockID: transfer.cStockID,
            cAccountNumberID: canid,
            cCredit: credit,
            cDebit: debit
          }
          records.bookings.all.push(booking)
          ++tid
        }
        const result = await records.storeIntoDatabase()
        if (result !== '') {
          settings.setActiveAccountId(records.accounts[0].cID)
          await browser.storage.local.set({sActiveAccountId: records.accounts[0].cID})
          runtime.setLogo()
          records.sumBookings()
          log('IMPORTDATABASE: onFileLoaded', {info: result})
          await notice(['IMPORTDATABASE: onFileLoaded', result])
        } else {
          await notice(['IMPORTDATABASE: onFileLoaded', result])
        }
      } else {
        await records.cleanStores()
        frontendMessagePort.postMessage({type: CONS.MESSAGES.DB__CLEAN})
        for (account of bkupObject.accounts) {
          records.accounts.push(account)
        }
        for (stock of bkupObject.stocks) {
          records.stocks.all.push(stock)
        }
        for (bookingType of bkupObject.booking_types) {
          records.bookingTypes.all.push(bookingType)
        }
        for (booking of bkupObject.bookings) {
          records.bookings.all.push(booking)
        }
        const result = await records.storeIntoDatabase()
        if (result !== '') {
          settings.setActiveAccountId(records.accounts[0].cID)
          runtime.setLogo()
          records.sumBookings()
          await browser.storage.local.set({sActiveAccountId: records.accounts[0].cID})
          log('IMPORTDATABASE: onFileLoaded', {info: result})
          await notice(['IMPORTDATABASE: onFileLoaded', result])
        } else {
          await notice(['IMPORTDATABASE: onFileLoaded', result])
        }
      }
    } else {
      await notice(['IMPORTDATABASE: onFileLoaded', 'Could not read backup file'])
    }
    console.error(records)
  }
  const fr: FileReader = new FileReader()
  fr.addEventListener(CONS.EVENTS.LOAD, onFileLoaded, CONS.SYSTEM.ONCE)
  fr.addEventListener(CONS.EVENTS.ERR, onError, CONS.SYSTEM.ONCE)
  if (state._choosen_file !== null) {
    fr.readAsText(state._choosen_file, 'UTF-8')
  }
}
const title = t('dialogs.importDatabase.title')

defineExpose({ok, title})

log('--- ImportDatabase.vue setup ---')
</script>

<template>
  <v-form validate-on="submit" v-on:submit.prevent>
    <v-card-text class="pa-5">
      <v-file-input
        accept=".json"
        v-bind:clearable="true"
        v-bind:label="t('dialogs.importDatabase.label')"
        variant="outlined"
        v-on:change="(ev: IEventTarget) => { state._choosen_file = ev.target.files[0] }"
      ></v-file-input>
    </v-card-text>
  </v-form>
</template>

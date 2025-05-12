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
import {useApp} from '@/pages/background'
import {useSettingsStore} from '@/stores/settings'
import {useImportDatabaseStore} from '@/components/dialogs/importdatabase'
import {storeToRefs} from 'pinia'
import {useTitleBarStore} from '@/components/titlebar'

interface IEventTarget extends HTMLInputElement {
  target: { files: File[] }
}

const {t} = useI18n()
const {CONS, log} = useApp()
const settings = useSettingsStore()
const importdatabase = useImportDatabaseStore()

const {_choosen_file} = storeToRefs(importdatabase)

importdatabase.setSteady({
  label: t('dialogs.importDatabase.label'),
})

const ok = (): Promise<string> => {
  log('IMPORTDATABASE: ok', {info: _choosen_file.value})
  return new Promise(async (resolve, reject) => {
    const {log, notice} = useApp()
    const records = useRecordsStore()
    const titlebar = useTitleBarStore()
    const onError = (): void => {
      reject('IMPORTDATABASE: onError: FileReader')
    }
    const onFileLoaded = async (): Promise<void> => {
      log('IMPORTDATABASE: onFileLoaded')
      if (typeof fr.result === 'string') {
        const bkupObject: IBackup = JSON.parse(fr.result)
        let account: IAccount
        let booking: IBooking
        let bookingType: IBookingType
        let stock: IStock
        if (bkupObject.sm.cDBVersion < CONS.DB.MIN_VERSION) {
          await notice(['IMPORTDATABASE: onFileLoaded', 'Invalid backup file version'])
          reject('Invalid backup file version')
        } else {
          for (account of bkupObject.accounts) {
            records.accounts.all.push(account)
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
            settings.setActiveAccountId(records.accounts.all[0].cID)
            titlebar.setLogo()
            records.sumBookings()
            await browser.storage.local.set({sActiveAccountId: records.accounts.all[0].cID})
            log('IMPORTDATABASE: onFileLoaded', {info: result})
            await notice(['IMPORTDATABASE: onFileLoaded', result])
            resolve('Backup file loaded successfully!')
          } else {
            await notice(['IMPORTDATABASE: onLoad', result])
            reject('ERROR: database could not be loaded!')
          }
        }
      } else {
        await notice(['IMPORTDATABASE: onFileLoaded', 'Could not read backup file'])
        reject('Could not read backup file!')
      }
    }
    const fr: FileReader = new FileReader()
    fr.addEventListener(CONS.EVENTS.LOAD, onFileLoaded, CONS.SYSTEM.ONCE)
    fr.addEventListener(CONS.EVENTS.ERR, onError, CONS.SYSTEM.ONCE)
    if (_choosen_file.value !== null) {
      await records.cleanStoreAndDatabase()
      fr.readAsText(_choosen_file.value, 'UTF-8')
    }
  })
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
        v-bind:label="importdatabase.steady.label"
        variant="outlined"
        v-on:change="(ev: IEventTarget) => { _choosen_file = ev.target.files[0] }"
      ></v-file-input>
    </v-card-text>
  </v-form>
</template>

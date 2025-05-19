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

const {t} = useI18n()
const {CONS, log, notice} = useApp()
const records = useRecordsStore()
const prefix = new Date().toISOString().substring(0, 10)
const fn = `${prefix}_${records.dbi.version}_${CONS.DB.NAME}.json`

const ok = async (): Promise<void> => {
  log('EXPORTDATABASE: ok')
  const stringifyDB = (): string => {
    let buffer: string
    let i: number
    buffer = '"accounts":[\n'
    for (i = 0; i < records.accounts.all.length; i++) {
      buffer += JSON.stringify({
        cSwift: records.accounts.all[i].cSwift,
        cNumber: records.accounts.all[i].cNumber,
        cLogoUrl: records.accounts.all[i].cLogoUrl,
        cStockAccount: records.accounts.all[i].cStockAccount,
        cID: records.accounts.all[i].cID
      })
      if (i === records.accounts.all.length - 1) {
        buffer += '\n],\n'
      } else {
        buffer += ',\n'
      }
    }
    buffer += i === 0 ? '],\n' : ''
    buffer += '"stocks":[\n'
    for (i = 0; i < records.stocks.all.length; i++) {
      buffer += JSON.stringify({
        cID: records.stocks.all[i].cID,
        cISIN: records.stocks.all[i].cISIN,
        cWKN: records.stocks.all[i].cWKN,
        cSymbol: records.stocks.all[i].cSymbol,
        cFadeOut: records.stocks.all[i].cFadeOut,
        cFirstPage: records.stocks.all[i].cFirstPage,
        cCompany: records.stocks.all[i].cCompany,
        cMeetingDay: records.stocks.all[i].cMeetingDay,
        cQuarterDay: records.stocks.all[i].cQuarterDay,
        cURL: records.stocks.all[i].cURL
      })
      if (i === records.stocks.all.length - 1) {
        buffer += '\n],\n'
      } else {
        buffer += ',\n'
      }
    }
    buffer += i === 0 ? '],\n' : ''
    buffer += '"booking_types":[\n'
    for (i = 0; i < records.bookingTypes.all.length; i++) {
      buffer += JSON.stringify({
        cID: records.bookingTypes.all[i].cID,
        cName: records.bookingTypes.all[i].cName,
        cAccountNumberID: records.bookingTypes.all[i].cAccountNumberID,
      })
      if (i === records.bookingTypes.all.length - 1) {
        buffer += '\n],\n'
      } else {
        buffer += ',\n'
      }
    }
    buffer += i === 0 ? '],\n' : ''
    buffer += '"bookings":[\n'
    for (i = 0; i < records.bookings.all.length; i++) {
      buffer += JSON.stringify({
        cID: records.bookings.all[i].cID,
        cDate: records.bookings.all[i].cDate,
        cDebit: records.bookings.all[i].cDebit,
        cCredit: records.bookings.all[i].cCredit,
        cDescription: records.bookings.all[i].cDescription,
        cType: records.bookings.all[i].cType,
        cAccountNumberID: records.bookings.all[i].cAccountNumberID
      })
      if (i === records.bookings.all.length - 1) {
        buffer += '\n]\n'
      } else {
        buffer += ',\n'
      }
    }
    buffer += i === 0 ? ']\n' : ''
    return buffer
  }
  let buffer = `{\n"sm": {"cVersion":${browser.runtime.getManifest().version.replace(/\./g, '')}, "cDBVersion":${
    records.dbi.version
  }, "cEngine":"indexeddb"},\n`
  buffer += stringifyDB()
  buffer += '}'
  const blob = new Blob([buffer], {type: 'application/json'}) // create blob object with all stores data
  const blobUrl = URL.createObjectURL(blob) // create url reference for blob object
  const op: browser.downloads._DownloadOptions = {
    url: blobUrl,
    filename: fn
  }
  const onDownloadChange = (change: browser.downloads._OnChangedDownloadDelta): void => {
    log('HEADERBAR: onChanged')
    // noinspection JSDeprecatedSymbols
    browser.downloads.onChanged.removeListener(onDownloadChange)
    if (
      (change.state !== undefined && change.id > 0) ||
      (change.state !== undefined && change.state.current === CONS.EVENTS.COMP)
    ) {
      URL.revokeObjectURL(blobUrl) // release blob object
    }
  }
  // noinspection JSDeprecatedSymbols
  browser.downloads.onChanged.addListener(onDownloadChange) // listener to clean up blob object after download.
  await browser.downloads.download(op) // writing blob object into download file
  await notice(['Database exported!'])
}
const title = t('dialogs.exportDatabase.title')

defineExpose({ok, title})

log('--- ExportDatabase.vue setup ---')
</script>

<template>
  <v-form validate-on="submit" v-on:submit.prevent>
    <v-card-text class="pa-5">
      <v-textarea
        v-bind:disabled="true"
        v-bind:modelValue="t('dialogs.exportDialog', { filename: fn })"
        variant="outlined"
      ></v-textarea>
    </v-card-text>
  </v-form>
</template>

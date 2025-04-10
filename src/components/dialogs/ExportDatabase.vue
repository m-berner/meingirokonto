<!--
  -- This Source Code Form is subject to the terms of the Mozilla Public
  -- License, v. 2.0. If a copy of the MPL was not distributed with this file,
  -- you could obtain one at https://mozilla.org/MPL/2.0/.
  --
  -- Copyright (c) 2014-2025, Martin Berner, meingirokonto@gmx.de. All rights reserved.
  -->
<template>
  <v-form validate-on="submit" v-on:submit.prevent>
    <v-card-text class="pa-5">
      <v-textarea
        v-bind:disabled="true"
        v-bind:modelValue="t('dialogs.exportDialog', { filename: state._file_name })"
        variant="outlined"
      ></v-textarea>
    </v-card-text>
  </v-form>
</template>
<script lang="ts" setup>
//import {useRuntimeStore} from '@/stores/runtime'
import {useRecordsStore} from '@/stores/records'
import {reactive} from 'vue'
import {useI18n} from 'vue-i18n'
import {useApp} from '@/composables/useApp'
import {CONS} from '@/pages/background'

interface IExportDatabase {
  _file_name: string
}

const {t} = useI18n()
const prefix = new Date().toISOString().substring(0, 10)
const fn = `${prefix}_${CONS.DB.VERSION}_${CONS.DB.BKFN}`
const state: IExportDatabase = reactive({
  _file_name: fn
})
//const runtime = useRuntimeStore()

const ok = () => {
  console.log('EXPORTDATABASE: ok')
  const records = useRecordsStore()
  const {notice} = useApp()
  const stringifyDB = (): string => {
    let buffer: string
    let i: number
    buffer = '"accounts":[\n'
    for (i = 0; i < records.account.all.length; i++) {
      buffer += JSON.stringify({
        cSwift: records.account.all[i].cSwift,
        cNumber: records.account.all[i].cNumber,
        cCurrency: records.account.all[i].cCurrency,
        cID: records.account.all[i].cID
      })
      if (i === records.account.all.length - 1) {
        buffer += '\n],\n'
      } else {
        buffer += ',\n'
      }
    }
    buffer += i === 0 ? '],\n' : ''
    buffer += '"booking_types":[\n'
    for (i = 0; i < records.bookingType.all.length; i++) {
      buffer += JSON.stringify({
        cID: records.bookingType.all[i].cID,
        cName: records.bookingType.all[i].cName,
      })
      if (i === records.bookingType.all.length - 1) {
        buffer += '\n]\n'
      } else {
        buffer += ',\n'
      }
    }
    buffer += i === 0 ? '],\n' : ''
    buffer += '"bookings":[\n'
    for (i = 0; i < records.booking.all.length; i++) {
      buffer += JSON.stringify({
        cID: records.booking.all[i].cID,
        cDate: records.booking.all[i].cDate,
        cDebit: records.booking.all[i].cDebit,
        cCredit: records.booking.all[i].cCredit,
        cDescription: records.booking.all[i].cDescription,
        cType: records.booking.all[i].cType,
        cAccountNumber: records.booking.all[i].cAccountNumber
      })
      if (i === records.booking.all.length - 1) {
        buffer += '\n]\n'
      } else {
        buffer += ',\n'
      }
    }
    buffer += i === 0 ? ']\n' : ''
    return buffer
  }
  let buffer = `{\n"sm": {"cVersion":${browser.runtime.getManifest().version.replace(/\./g, '')}, "cDBVersion":${
    CONS.DB.VERSION
  }, "cEngine":"indexeddb"},\n`
  buffer += stringifyDB()
  buffer += '}'
  const blob = new Blob([buffer], {type: 'application/json'})
  const blobUrl = URL.createObjectURL(blob)
  const op: browser.downloads._DownloadOptions = {
    url: blobUrl,
    filename: state._file_name
  }
  const onDownloadChange = (change: browser.downloads._OnChangedDownloadDelta): void => {
    console.log('HEADERBAR: onChanged')
    // noinspection JSDeprecatedSymbols
    browser.downloads.onChanged.removeListener(onDownloadChange)
    if (
      (change.state !== undefined && change.id > 0) ||
      (change.state !== undefined && change.state.current === CONS.EVENTS.COMP)
    ) {
      URL.revokeObjectURL(blobUrl)
    }
  }
  // noinspection JSDeprecatedSymbols
  browser.downloads.onChanged.addListener(onDownloadChange) // wait for download changes
  browser.downloads
    .download(op)
    .then(() => {
      console.log('HEADERBAR: onExportDatabase', 'Download started')
    })
    .catch((err: Error) => {
      notice([err.message])
    })
  //runtime.toggleVisibility()
}
const title = t('dialogs.exportDatabase.title')

defineExpose({ok, title})

// onMounted(() => {
//   console.log('EXPORTDATABASE: onMounted')
//   //runtime.setIsOk(true)
// })

console.log('--- ExportDatabase.vue setup ---')
</script>

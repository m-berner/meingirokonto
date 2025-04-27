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
      <v-file-input
        accept=".json"
        v-bind:clearable="true"
        v-bind:label="t('dialogs.importDatabase.label')"
        variant="outlined"
        v-on:change="choosenFile"
      ></v-file-input>
    </v-card-text>
  </v-form>
</template>

<script lang="ts" setup>
import {useRecordsStore} from '@/stores/records'
import {useI18n} from 'vue-i18n'
import {useApp} from '@/pages/background'
import {useSettingsStore} from '@/stores/settings'

interface IImportDatabase {
  _choosen_file: Blob | null
}

interface IEventTarget extends HTMLInputElement {
  target: { files: File[] }
}

const {t} = useI18n()
const {CONS} = useApp()
const settings = useSettingsStore()

const state: IImportDatabase = {
  _choosen_file: null
}

const choosenFile = (ev: IEventTarget) => { state._choosen_file = ev.target.files[0] }

const ok = (): Promise<string> => {
  console.info('IMPORTDATABASE: ok', state._choosen_file)
  return new Promise(async (resolve, reject) => {
    const {notice} = useApp()
    const records = useRecordsStore()
    const onError = (): void => {
      reject('IMPORTDATABASE: onError: FileReader')
    }
    const onFileLoaded = async (): Promise<void> => {
      console.log('IMPORTDATABASE: onFileLoaded')
      if (typeof fr.result === 'string') {
        const bkupObject: IBackup = JSON.parse(fr.result)
        let account: IAccount
        let booking: IBooking
        let bookingType: IBookingType
        if (bkupObject.sm.cDBVersion < CONS.DB.MINVERSION) {
          await notice(['IMPORTDATABASE: onFileLoaded', 'Invalid backup file version'])
          reject('Invalid backup file version')
        } else {
          for (account of bkupObject.accounts) {
            records.accounts.all.push(account)
          }
          for (bookingType of bkupObject.booking_types) {
            records.bookingTypes.all.push(bookingType)
          }
          for (booking of bkupObject.bookings) {
            records.bookings.all.push(booking)
          }
          const result = await records.storeIntoDatabase()
          if (result !== '') {
            if (settings.activeAccountId < 0) {
              const lName = records.accounts.all[0].cSwift.substring(0, 4)
              settings.setLogo(lName[0].toUpperCase() + lName.toLowerCase().slice(1) + 'Svg')
              settings.setActiveAccountId(result)
              await browser.storage.local.set({sLogo: lName[0].toUpperCase() + lName.toLowerCase().slice(1) + 'Svg'})
              await browser.storage.local.set({sActiveAccountId: records.accounts.all[0].cID})
            }
            console.info('IMPORTDATABASE: onFileLoaded', result)
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
    //
    if (state._choosen_file !== null) {
      await records.cleanStoreAndDatabase()
      fr.readAsText(state._choosen_file, 'UTF-8')
    }
  })
}
const title = t('dialogs.importDatabase.title')

defineExpose({ok, title})

console.log('--- ImportDatabase.vue setup ---')
</script>

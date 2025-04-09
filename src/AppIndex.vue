<!--
  -- This Source Code Form is subject to the terms of the Mozilla Public
  -- License, v. 2.0. If a copy of the MPL was not distributed with this file,
  -- you could obtain one at https://mozilla.org/MPL/2.0/.
  --
  -- Copyright (c) 2014-2025, Martin Berner, meingirokonto@gmx.de. All rights reserved.
  -->
<template>
  <v-app v-bind:flat="true">
    <router-view name="title"></router-view>
    <router-view name="header"></router-view>
    <v-main>
      <router-view></router-view>
    </v-main>
    <router-view name="footer"></router-view>
  </v-app>
</template>

<script lang="ts" setup>
import {useRecordsStore} from '@/stores/records'
import {useSettingsStore} from '@/stores/settings'
import {onBeforeMount} from 'vue'
import {useTheme} from 'vuetify'
import {CONS} from '@/background'

const settings = useSettingsStore()
const records = useRecordsStore()
const theme = useTheme()

onBeforeMount(async (): Promise<void> => {
    console.log('APP: onBeforeMount')
    const keyStrokeController: string[] = []
    const initStorageLocal = async () => {
      console.log('APP: initStorageLocal')
      const storageLocal: IStorageLocal = await browser.storage.local.get()
      if (storageLocal.sSkin === undefined) {
        await browser.storage.local.set({sSkin: CONS.DEFAULTS.STORAGE.SKIN})
      }
      if (storageLocal.sAccountActiveId === undefined) {
        await browser.storage.local.set({sAccountActiveId: CONS.DEFAULTS.STORAGE.ACCOUNT_ACTIVE_ID})
      }
      if (storageLocal.sBookingsPerPage === undefined) {
        await browser.storage.local.set({sBookingsPerPage: CONS.DEFAULTS.STORAGE.BOOKINGS_PER_PAGE})
      }
      if (storageLocal.sDebug === undefined) {
        await browser.storage.local.set({sDebug: CONS.DEFAULTS.STORAGE.DEBUG})
      }
      return 'APP: browser.storage.local initialized'
    }
    const onStorageChange = (changes: Record<string, browser.storage.StorageChange>, area: string): void => {
      console.info('APP: onStorageChange', area)
      switch (true) {
        case changes.sSkin?.oldValue !== undefined:
          theme.global.name.value = changes.sSkin.newValue
          console.error('sdfsfa------', changes.sSkin.newValue)
          break
        default:
      }
    }
    const onBeforeUnload = async (): Promise<void> => {
      console.log('APP: onBeforeUnload')
      const foundTabs = await browser.tabs.query({url: 'about:addons'})
      if (foundTabs.length > 0) {
        await browser.tabs.remove(foundTabs[0].id ?? 0)
      }
      records.dbi.close()
    }
    const onKeyDown = (ev: KeyboardEvent): void => {
      keyStrokeController.push(ev.key)
      if (
        keyStrokeController.includes('Control') &&
        keyStrokeController.includes('Alt') &&
        ev.key === 'r'
      ) {
        browser.storage.local.clear()
      }
      if (
        keyStrokeController.includes('Control') &&
        keyStrokeController.includes('Alt') &&
        ev.key === 'd'
      ) {
        browser.storage.local.set({sDebug: true})
      }
    }
    const onKeyUp = (ev: KeyboardEvent): void => {
      keyStrokeController.splice(keyStrokeController.indexOf(ev.key), 1)
    }

    if (!window.location.href.includes('options')) {
    //  console.log('APP: onBeforeMount options')
      const msg = await initStorageLocal()
      console.info('APP: ', msg, browser.storage.onChanged.hasListener(onStorageChange))
      if (!browser.storage.onChanged.hasListener(onStorageChange)) {
        browser.storage.onChanged.addListener(onStorageChange)
      }
    console.info('APP: ', browser.storage.onChanged.hasListener(onStorageChange))
      window.addEventListener('keydown', onKeyDown, false)
      window.addEventListener('keyup', onKeyUp, false)
      window.addEventListener('beforeunload', onBeforeUnload, {once: true})

      await records.openDatabase()
      await records.databaseIntoStore()
      //await settings.storageIntoStore(theme)
      await records.storageIntoStore()
    }
  await settings.storageIntoStore(theme)
  }
)

console.log('--- AppIndex.vue setup ---')
</script>

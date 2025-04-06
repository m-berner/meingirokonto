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
//import {useApp} from '@/composables/useApp'

const settings = useSettingsStore()
const records = useRecordsStore()
const theme = useTheme()
//const {debug} = useApp()

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
      return 'BACKGROUND: browser.storage.local initialized'
    }
    const onStorageChange = async (change: Record<string, browser.storage.StorageChange>): Promise<void> => {
      console.info('APP: onStorageChange', change)
      switch (true) {
        case change.skin?.oldValue !== undefined:
          theme.global.name.value = change.skin.newValue
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

    const msg = await initStorageLocal()
    console.log('APP: ', msg)
    if (!browser.storage.onChanged.hasListener(onStorageChange)) {
      browser.storage.onChanged.addListener(onStorageChange)
    }
    window.addEventListener('keydown', onKeyDown, false)
    window.addEventListener('keyup', onKeyUp, false)
    window.addEventListener('beforeunload', onBeforeUnload, {once: true})

    await records.openDatabase()
    await records.databaseIntoStore()
    await settings.storageIntoStore(theme)
    await records.storageIntoStore()
  }
)

console.log('--- App.vue setup ---')
</script>

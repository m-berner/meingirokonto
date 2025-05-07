<!--
  - This Source Code Form is subject to the terms of the Mozilla Public
  - License, v. 2.0. If a copy of the MPL was not distributed with this file,
  - you could obtain one at https://mozilla.org/MPL/2.0/.
  -
  - Copyright (c) 2014-2025, Martin Berner, meingirokonto@gmx.de. All rights reserved.
  -->
<script lang="ts" setup>
import {useRecordsStore} from '@/stores/records'
import {useSettingsStore} from '@/stores/settings'
import {onBeforeMount} from 'vue'
import {useTheme} from 'vuetify'
import {useApp} from '@/pages/background'
import {useTitleBarStore} from '@/components/titlebar'

const settings = useSettingsStore()
const records = useRecordsStore()
const titlebar = useTitleBarStore()
const theme = useTheme()
const {CONS} = useApp()

onBeforeMount((): Promise<void> => {
  console.log('APPINDEX: onBeforeMount: before')
  return new Promise(async (resolve) => {
    const keyStrokeController: string[] = []
    const onStorageChange = (changes: Record<string, browser.storage.StorageChange>, area: string): void => {
      console.info('APPINDEX: onStorageChange', area)
      switch (true) {
        case changes.sSkin?.oldValue !== undefined:
          theme.global.name.value = changes.sSkin.newValue
          break
        default:
      }
    }
    const onBeforeUnload = (): Promise<void> => {
      console.log('APPINDEX: onBeforeUnload')
      return new Promise(async (resolve) => {
        const foundTabs = await browser.tabs.query({url: 'about:addons'})
        if (foundTabs.length > 0) {
          await browser.tabs.remove(foundTabs[0].id ?? 0)
        }
        records.dbi.close()
        resolve()
      })
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

    const startSettings = await browser.runtime.sendMessage({type: CONS.MESSAGES.GS})
    if (startSettings !== null) {
      settings.initSettingsStore(theme, startSettings)
    }
    if (!browser.storage.onChanged.hasListener(onStorageChange)) {
      browser.storage.onChanged.addListener(onStorageChange)
    }
    window.addEventListener('keydown', onKeyDown, false)
    window.addEventListener('keyup', onKeyUp, false)
    window.addEventListener('beforeunload', onBeforeUnload, CONS.SYSTEM.ONCE)
    await records.openDatabase()
    await records.databaseIntoStore()
    titlebar.updateTitlebar()
    console.log('APPINDEX: onBeforeMount: after')
    resolve()
  })
})

console.log('--- AppIndex.vue setup ---')
</script>

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

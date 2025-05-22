<!--
  - This Source Code Form is subject to the terms of the Mozilla Public
  - License, v. 2.0. If a copy of the MPL was not distributed with this file,
  - you could obtain one at https://mozilla.org/MPL/2.0/.
  -
  - Copyright (c) 2014-2025, Martin Berner, kontenmanager@gmx.de. All rights reserved.
  -->
<script lang="ts" setup>
import {useRecordsStore} from '@/stores/records'
import {useSettingsStore} from '@/stores/settings'
import {onBeforeMount} from 'vue'
import {useTheme} from 'vuetify'
import {useAppApi} from '@/pages/background'
import {storeToRefs} from 'pinia'
import {frontendMessagePort} from '@/pages/app'
import {useRuntimeStore} from '@/stores/runtime'

const settings = useSettingsStore()
const records = useRecordsStore()
const runtime = useRuntimeStore()
const theme = useTheme()
const {CONS, log} = useAppApi()
const {_debug} = storeToRefs(settings)
const onResponse = (m: object): void => {
  switch (Object.values(m)[0]) {
    case CONS.MESSAGES.DB__INTO_STORE__RESPONSE:
      log('APPINDEX: onResponse', {info: Object.values(m)[1]})
      records.cleanStore()
      records.initStore(Object.values(m)[1])
      runtime.setLogo()
      records.sumBookings()
      break
    case CONS.MESSAGES.STORE__INIT_SETTINGS__RESPONSE:
      log('APPINDEX: onResponse', {info: Object.values(m)[1]})
      settings.initStore(theme, Object.values(m)[1])
      break
    default:
  }
}
// listen for backend responses
frontendMessagePort.onMessage.addListener(onResponse);

onBeforeMount(async (): Promise<void> => {
  log('APPINDEX: onBeforeMount: before')
  const keyStrokeController: string[] = []
  const onStorageChange = (changes: Record<string, browser.storage.StorageChange>, area: string): void => {
    log('APPINDEX: onStorageChange', {info: area})
    switch (true) {
      case changes.sSkin?.oldValue !== undefined:
        theme.global.name.value = changes.sSkin.newValue
        settings.setSkin(changes.sSkin.newValue)
        break
      case changes.sDebug?.oldValue !== undefined:
        settings.setDebug(changes.sDebug.newValue)
        break
      case changes.sBookingsPerPage?.oldValue !== undefined:
        settings.setBookingsPerPage(changes.sBookingsPerPage.newValue)
        break
      case changes.sStocksPerPage?.oldValue !== undefined:
        settings.setStocksPerPage(changes.sStocksPerPage.newValue)
        break
      case changes.sActiveAccountId?.oldValue !== undefined:
        settings.setActiveAccountId(changes.sActiveAccountId.newValue)
        break
      case changes.sPartner?.oldValue !== undefined:
        settings.setPartner(changes.sPartner.newValue)
        break
      case changes.sService?.oldValue !== undefined:
        settings.setService(changes.sService.newValue)
        break
      case changes.sExchanges?.oldValue !== undefined:
        settings.setExchanges(changes.sExchanges.newValue)
        break
      case changes.sIndexes?.oldValue !== undefined:
        settings.setIndexes(changes.sIndexes.newValue)
        break
      case changes.sMaterials?.oldValue !== undefined:
        settings.setMaterials(changes.sMaterials.newValue)
        break
      case changes.sMarkets?.oldValue !== undefined:
        settings.setMarkets(changes.sMarkets.newValue)
        break
      default:
    }
  }
  const onBeforeUnload = async (): Promise<void> => {
    log('APPINDEX: onBeforeUnload')
    const foundTabs = await browser.tabs.query({url: 'about:addons'})
    frontendMessagePort.postMessage({type: CONS.MESSAGES.DB__CLOSE})
    frontendMessagePort.disconnect()
    if (foundTabs.length > 0) {
      await browser.tabs.remove(foundTabs[0].id ?? 0)
    }
  }
  const onKeyDown = (ev: KeyboardEvent): void => {
    keyStrokeController.push(ev.key)
    log('APPINDEX: onKeyDown')
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
      ev.key === 'd' && _debug.value
    ) {
      browser.storage.local.set({sDebug: false})
    }
    if (
      keyStrokeController.includes('Control') &&
      keyStrokeController.includes('Alt') &&
      ev.key === 'd' && !_debug.value
    ) {
      browser.storage.local.set({sDebug: true})
    }
  }
  const onKeyUp = (ev: KeyboardEvent): void => {
    keyStrokeController.splice(keyStrokeController.indexOf(ev.key), 1)
  }
  window.addEventListener('keydown', onKeyDown, false)
  window.addEventListener('keyup', onKeyUp, false)
  window.addEventListener('beforeunload', onBeforeUnload, CONS.SYSTEM.ONCE)
  if (!browser.storage.onChanged.hasListener(onStorageChange)) {
    browser.storage.onChanged.addListener(onStorageChange)
  }
  frontendMessagePort.postMessage({type: CONS.MESSAGES.STORE__INIT_SETTINGS})
  frontendMessagePort.postMessage({type: CONS.MESSAGES.DB__INTO_STORE})
})

log('--- AppIndex.vue setup ---', {info: window.location.href})
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

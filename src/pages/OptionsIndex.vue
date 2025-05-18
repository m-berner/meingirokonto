<!--
  - This Source Code Form is subject to the terms of the Mozilla Public
  - License, v. 2.0. If a copy of the MPL was not distributed with this file,
  - you could obtain one at https://mozilla.org/MPL/2.0/.
  -
  - Copyright (c) 2014-2025, Martin Berner, kontenmanager@gmx.de. All rights reserved.
  -->
<script lang="ts" setup>
import {storeToRefs} from 'pinia'
import {useI18n} from 'vue-i18n'
import {useTheme} from 'vuetify'
import {onMounted, reactive, toRaw} from 'vue'
import {useOptionsIndexStore} from '@/pages/optionsindex'
import {useApp} from '@/pages/background'
import DynamicList from '@/components/helper/DynamicList.vue'
import {useSettingsStore} from '@/stores/settings'

interface IOptionsIndex {
  _tab: number
  _service: string
  _skin: string
  _tabs: string[]
  _themeKeys: string[]
  _themeNames: []
  _serviceKeys: []
  _indexesA: []
  _indexesB: []
  _materialsA: []
  _materialsB: []
}

const {rt, t, tm} = useI18n()
const theme = useTheme()
const {CONS, log} = useApp()
const settings = useSettingsStore()
const optionsindex = useOptionsIndexStore()
const {_tab, _service, _skin} = storeToRefs(optionsindex)
const {_exchanges, _indexes, _markets, _materials} = storeToRefs(settings)

const state: IOptionsIndex = reactive({
  _tab: 0,
  _skin: '',
  _service: '',
  _tabs: [],
  _themeKeys: [],
  _themeNames: [],
  _serviceKeys: [],
  _indexesA: [],
  _indexesB: [],
  _materialsA: [],
  _materialsB: []
})



const indexes_keys_a = []
const indexes_keys_b = []
const indexes_keys = Object.keys(CONS.SETTINGS.INDEXES)
for (let i = 0; i < indexes_keys.length; i++) {
  if (i < indexes_keys.length / 2) {
    indexes_keys_a.push(indexes_keys[i])
  } else {
    indexes_keys_b.push(indexes_keys[i])
  }
}

const materials_keys_a = []
const materials_keys_b = []
const materials_keys = Object.keys(CONS.SETTINGS.MATERIALS)
for (let i = 0; i < materials_keys.length; i++) {
  if (i < materials_keys.length / 2) {
    materials_keys_a.push(materials_keys[i])
  } else {
    materials_keys_b.push(materials_keys[i])
  }
}

const service_keys = []
const all_service_keys = Object.keys(CONS.SERVICES)
for (let i = 0; i < all_service_keys.length - 2; i++) {
    service_keys.push(all_service_keys[i])
}

optionsindex.setSteady({
  tabs: tm('optionsPage.tabs'),
  themeNames: tm(`optionsPage.themeNames`),
  themeKeys: Object.keys(theme.themes.value),
  serviceKeys: service_keys,
  indexes_a: indexes_keys_a,
  indexes_b: indexes_keys_b,
  materials_a: materials_keys_a,
  materials_b: materials_keys_b
})

console.error(service_keys, all_service_keys, optionsindex.steady.serviceKeys)


const setIndexes = async (): Promise<void> => {
  await browser.storage.local.set({sIndexes: toRaw(settings.indexes)})
}

const setMaterials = async (): Promise<void> => {
  await browser.storage.local.set({sMaterials: toRaw(settings.materials)})
}

const setSkin = async (skin: string): Promise<void> => {
  log('OPTIONS_INDEX: setSkin', {info: skin})
  _skin.value = skin
  await browser.storage.local.set({sSkin: skin})
}

const setService = async (service: string): Promise<void> => {
  log('OPTIONS_INDEX: setService', {info: service})
  _service.value = service
  await browser.storage.local.set({sService: service})
}

onMounted(async (): Promise<void> => {
  log('OPTIONS_INDEX: onMounted')
  const localStorage = await browser.storage.local.get()
  _tab.value = 0
  _skin.value = localStorage.sSkin
  _service.value = localStorage.sService
  _indexes.value = localStorage.sIndexes
  _materials.value = localStorage.sMaterials
  _markets.value = localStorage.sMarkets
  _exchanges.value = localStorage.sExchanges
})

log('--- OptionsIndex.vue setup ---', {info: window.location.href})
</script>

<template>
  <v-app v-bind:flat="true">
    <v-main>
      <v-container>
        <v-tabs v-model="_tab" show-arrows>
            <v-tab v-for="(item, i) in optionsindex.steady.tabs" v-bind:key="item.id" v-bind:value="i">
              {{ rt(item.title) }}
            </v-tab>
        </v-tabs>
        <v-tabs-window v-model="_tab" class="pa-5">
          <v-tabs-window-item v-bind:value="0">
            <v-row>
              <v-col cols="12" md="6" sm="6">
                <v-radio-group column v-bind:modelValue="_skin">
                  <v-radio
                    v-for="item in optionsindex.steady.themeKeys"
                    v-bind:key="item"
                    v-bind:label="rt(optionsindex.steady.themeNames[item])"
                    v-bind:value="item"
                    v-on:click="async () => await setSkin(item)"
                  ></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="12" md="6" sm="6">
                <v-radio-group v-model="_service" column>
                  <v-radio
                    v-for="item in optionsindex.steady.serviceKeys"
                    v-bind:key="item"
                    v-bind:label="CONS.SERVICES[item].NAME ?? ''"
                    v-bind:value="item"
                    v-on:click="async () => await setService(item)"
                  ></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
          </v-tabs-window-item>
          <v-tabs-window-item v-bind:value="1">
            <v-row class="pa-10" justify="center">
              <v-col cols="12" md="10" sm="10">
                <DynamicList
                  v-bind:_label="t('optionsPage.markets.label')"
                  v-bind:_list="_markets"
                  v-bind:_tab="CONS.SETTINGS.MARKETS_TAB"
                  v-bind:_title="t('optionsPage.markets.title')"
                ></DynamicList>
              </v-col>
            </v-row>
          </v-tabs-window-item>
          <v-tabs-window-item v-bind:value="2">
            <v-row>
              <v-col>
                <v-checkbox
                  v-for="item in optionsindex.steady.indexes_a"
                  v-bind:key="item"
                  v-model="_indexes"
                  hide-details
                  v-bind:label="CONS.SETTINGS.INDEXES[item]"
                  v-bind:value="item"
                  v-on:change="setIndexes"
                ></v-checkbox>
              </v-col>
              <v-col>
                <v-checkbox
                  v-for="item in optionsindex.steady.indexes_b"
                  v-bind:key="item"
                  v-model="_indexes"
                  hide-details
                  v-bind:label="CONS.SETTINGS.INDEXES[item]"
                  v-bind:value="item"
                  v-on:change="setIndexes"
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-tabs-window-item>
          <v-tabs-window-item v-bind:value="3">
            <v-row>
              <v-col>
                <v-checkbox
                  v-for="item in optionsindex.steady.materials_a"
                  v-bind:key="item"
                  v-model="_materials"
                  hide-details
                  v-bind:label="rt(tm('optionsPage.materials')[item])"
                  v-bind:value="item"
                  v-on:change="setMaterials"
                ></v-checkbox>
              </v-col>
              <v-col>
                <v-checkbox
                  v-for="item in optionsindex.steady.materials_b"
                  v-bind:key="item"
                  v-model="_materials"
                  hide-details
                  v-bind:label="rt(tm('optionsPage.materials')[item])"
                  v-bind:value="item"
                  v-on:change="setMaterials"
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-tabs-window-item>
          <v-tabs-window-item v-bind:value="4">
            <v-row class="pa-12" justify="center">
              <v-col cols="12" md="10" sm="10">
                <DynamicList
                  v-bind:_label="t('optionsPage.exchanges.label')"
                  v-bind:_list="_exchanges"
                  v-bind:_tab="CONS.SETTINGS.EXCHANGES_TAB"
                  v-bind:_title="t('optionsPage.exchanges.title')"
                  v-bind:_toUpperCase="true"
                ></DynamicList>
              </v-col>
            </v-row>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-container>
    </v-main>
  </v-app>
</template>

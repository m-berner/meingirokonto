<!--
  - This Source Code Form is subject to the terms of the Mozilla Public
  - License, v. 2.0. If a copy of the MPL was not distributed with this file,
  - you could obtain one at https://mozilla.org/MPL/2.0/.
  -
  - Copyright (c) 2014-2025, Martin Berner, meingirokonto@gmx.de. All rights reserved.
  -->
<script lang="ts" setup>
import {storeToRefs} from 'pinia'
import {useI18n} from 'vue-i18n'
import {useTheme} from 'vuetify'
import {onMounted} from 'vue'
import {useOptionsIndexStore} from '@/pages/optionsindex'
import {useApp} from '@/pages/background'

const {rt, tm} = useI18n()
const theme = useTheme()
const {log} = useApp()

const optionsindex = useOptionsIndexStore()
const {_tab, _skin} = storeToRefs(optionsindex)

optionsindex.setSteady({
  tabs: tm('optionsPage.tabs'),
  themeNames: tm(`optionsPage.themeNames`),
  themeKeys: Object.keys((theme.themes.value))
})

const setSkin = (skin: string): Promise<void> => {
  log('OPTIONS_INDEX: setSkin', {info:skin})
  return new Promise(async (resolve) => {
    _skin.value = skin
    await browser.storage.local.set({sSkin: skin})
    resolve()
  })
}

onMounted((): Promise<void> => {
  log('OPTIONS_INDEX: onMounted')
  return new Promise(async (resolve) => {
    const skin = await browser.storage.local.get(['sSkin'])
    _tab.value = 0
    _skin.value = skin.sSkin
    resolve()
  })
})

log('--- OptionsIndex.vue setup ---', {info: window.location.href})
</script>

<template>
  <v-app v-bind:flat="true">
    <v-main>
      <v-container>
        <v-tabs v-model="_tab" show-arrows>
          <v-row class="pa-2" justify="space-between">
            <v-tab v-for="(item, i) in optionsindex.steady.tabs" v-bind:key="item.id" v-bind:value="i">
              {{ rt(item.title) }}
            </v-tab>
          </v-row>
        </v-tabs>
        <v-window v-model="_tab" class="pa-5">
          <v-window-item v-bind:value="1">
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
            </v-row>
          </v-window-item>
        </v-window>
      </v-container>
    </v-main>
  </v-app>
</template>

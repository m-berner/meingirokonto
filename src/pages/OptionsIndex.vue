<!--
  - This Source Code Form is subject to the terms of the Mozilla Public
  - License, v. 2.0. If a copy of the MPL was not distributed with this file,
  - you could obtain one at https://mozilla.org/MPL/2.0/.
  -
  - Copyright (c) 2014-2025, Martin Berner, meingirokonto@gmx.de. All rights reserved.
  -->
<script lang="ts" setup>
import {useI18n} from 'vue-i18n'
import {useTheme} from 'vuetify'
import {onMounted, reactive, toRaw} from 'vue'

interface IOptionsIndex {
  tab: number
  tabsLength: number
  themeKeys: string[]
  skin: string
}

const {t, tm} = useI18n()
const theme = useTheme()

const state: IOptionsIndex = reactive({
  tab: 0,
  tabsLength: 0,
  themeKeys: [],
  skin: ''
})

const setSkin = (skin: string): Promise<void> => {
  console.log('OPTIONSINDEX: setSkin')
  return new Promise(async (resolve) => {
    state.skin = skin
    await browser.storage.local.set({sSkin: skin})
    resolve()
  })
}

onMounted((): Promise<void> => {
  console.log('OPTIONSINDEX: onMounted')
  return new Promise(async (resolve) => {
    const skin = await browser.storage.local.get(['sSkin'])
    state.tab = 1
    state.tabsLength = tm('optionsPage.tabs').length
    state.themeKeys = Object.keys(toRaw(theme.themes.value))
    state.skin = skin.sSkin
    resolve()
  })
})

console.info('--- OptionsIndex.vue setup ---', window.location.href)
</script>

<template>
  <v-app v-bind:flat="true">
    <v-main>
      <v-container>
        <v-tabs v-model="state.tab" show-arrows>
          <v-row class="pa-2" justify="space-between">
            <v-tab v-for="i in state.tabsLength" v-bind:key="i" v-bind:value="i">
              {{ t(`optionsPage.tabs[${i - 1}].title`) }}
            </v-tab>
          </v-row>
        </v-tabs>
        <v-window v-model="state.tab" class="pa-5">
          <v-window-item v-bind:value="1">
            <v-row>
              <v-col cols="12" md="6" sm="6">
                <v-radio-group v-model="state.skin" column>
                  <h2>{{ t('optionsPage.capitals.skins') }}</h2>
                  <v-radio
                    v-for="i in state.themeKeys.length"
                    v-bind:key="i"
                    v-bind:label="t(`optionsPage.themeNames.${state.themeKeys[i - 1]}`)"
                    v-bind:value="state.themeKeys[i - 1]"
                    v-on:click="setSkin(state.themeKeys[i - 1])"
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

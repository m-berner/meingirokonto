<!--
  -- This Source Code Form is subject to the terms of the Mozilla Public
  -- License, v. 2.0. If a copy of the MPL was not distributed with this file,
  -- you could obtain one at https://mozilla.org/MPL/2.0/.
  --
  -- Copyright (c) 2014-2025, Martin Berner, meingirokonto@gmx.de. All rights reserved.
  -->
<template>
  <v-app v-bind:flat="true">
    <v-main>
      <v-container>
        <v-tabs v-model="state._tab" show-arrows>
          <v-row class="pa-2" justify="space-between">
            <v-tab v-for="i in state._tabs_length" v-bind:key="i" v-bind:value="i">
              {{ t(`optionsPage.tabs[${i - 1}].title`) }}
            </v-tab>
          </v-row>
        </v-tabs>
        <v-window v-model="state._tab" class="pa-5">
          <v-window-item v-bind:value="1">
            <v-row>
              <v-col cols="12" md="6" sm="6">
                <v-radio-group v-model="state._skin" column>
                  <h2>{{ t('optionsPage.capitals.skins') }}</h2>
                  <v-radio
                    v-for="i in state._theme_keys.length"
                    v-bind:key="i"
                    v-bind:label="t(`optionsPage.themeNames.${state._theme_keys[i - 1]}`)"
                    v-bind:value="state._theme_keys[i - 1]"
                    v-on:click="setSkin(state._theme_keys[i - 1])"
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

<script lang="ts" setup>
import {useI18n} from 'vue-i18n'
import {useTheme} from 'vuetify'
import {onMounted, reactive, toRaw} from 'vue'

interface IOptionsPage {
  _tab: number
  _tabs_length: number
  _theme_keys: string[]
  _skin: string
}

const {t, tm} = useI18n()
/* NOTE: the destructured variables are reactive! */
const theme = useTheme()

const state: IOptionsPage = reactive({
  _tab: 0,
  _tabs_length: 0,
  _theme_keys: [],
  _skin: ''
})
const setSkin = async (skin: string) => {
  state._skin = skin
  await browser.storage.local.set({sSkin: skin})
}

onMounted(async () => {
  console.log('OPTIONSPAGE: onMounted')
  const labelsOptionsPage: Record<string, string> = tm('optionsPage')
  const skin = await browser.storage.local.get(['sSkin'])
  state._tab = 1
  state._tabs_length = labelsOptionsPage.tabs.length
  state._theme_keys = Object.keys(toRaw(theme.themes.value))
  state._skin = skin.sSkin
})

console.log('--- OptionsIndex.vue setup ---', window.location.href)
</script>

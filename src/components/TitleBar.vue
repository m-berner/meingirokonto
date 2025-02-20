<!--
  -- This Source Code Form is subject to the terms of the Mozilla Public
  -- License, v. 2.0. If a copy of the MPL was not distributed with this file,
  -- you could obtain one at https://mozilla.org/MPL/2.0/.
  --
  -- Copyright (c) 2014-2025, Martin Berner, meingirokonto@gmx.de. All rights reserved.
  -->
<template>
  <v-app-bar app color="secondary" v-bind:flat="true">
    <v-app-bar-title>
        <v-btn target="_blank" v-bind:href="settings.service.url">
          <template v-slot:prepend>
            <CustomIcon v-bind:name="settings.service.name"></CustomIcon>
          </template>
          {{ settings.service.name }}
        </v-btn>
        {{ t('titleBar.title') }}
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <v-select
      v-model="state._selected_account"
      item-title="title"
      item-value="id"
      label="Konto"
      max-width="300"
      v-bind:items="state._items_accounts"
    ></v-select>
  </v-app-bar>
</template>

<script lang="ts" setup>
import CustomIcon from '@/components/CustomIcon.vue'
//import {useRecordsStore} from '@/stores/records'
import {useSettingsStore} from '@/stores/settings'
import {useI18n} from 'vue-i18n'
import {reactive} from 'vue'
import {useApp} from '@/composables/useApp'

const {t} = useI18n()
const settings = useSettingsStore()
//const records = useRecordsStore()
const {CONS} = useApp()
// watch(
//   () => settings.service,
//   () => {
//     console.log('TITLEBAR: watch')
//     records.resetActiveStocksValues()
//   }
// )

const state = reactive({
  _show: true,
  _drawer_controls: CONS.DEFAULTS.DRAWER_CONTROLS,
  _selected_account: '€ ING 34242432424',
  _items_accounts: [
    {id: 1, title: '€ ING 34242432424', name: 'ING', cur: '€', number: '34242432424', logo: ''},
    {id: 2, title: '€ DKB 34242432424', name: 'DKB', cur: '€', number: '34242432424', logo: ''}
  ]
})

console.log('--- TitleBar.vue setup ---')
</script>

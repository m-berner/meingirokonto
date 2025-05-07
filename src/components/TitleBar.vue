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
import {useI18n} from 'vue-i18n'
import {useApp} from '@/pages/background'
import {storeToRefs} from 'pinia'
import {useTitleBarStore} from '@/components/titlebar'

const {n, t} = useI18n()
const records = useRecordsStore()
const settings = useSettingsStore()
const titlebar = useTitleBarStore()
const {CONS} = useApp()

const {_active_account_id} = storeToRefs(settings)
titlebar.setSteady({
  title: t('titleBar.title'),
  bookings_sum_label: t('titleBar.bookingsSumLabel'),
  account_label: t('titleBar.selectAccountLabel')
})
console.log('--- TitleBar.vue setup ---')
</script>

<template>
  <v-app-bar app color="secondary" v-bind:flat="true">
    <template v-slot:prepend>
      <img v-bind:src="titlebar.logo" alt="brandfetch.com logo">
    </template>
    <v-app-bar-title>{{ titlebar.steady.title }}</v-app-bar-title>
    <v-text-field
      v-bind:modelValue="n(records.bookingSum, 'currency')"
      v-bind:label="titlebar.steady.bookings_sum_label"
      max-width="150"
      v-bind:disabled="true"
    ></v-text-field>
    <v-spacer></v-spacer>
    <v-select
      v-if="_active_account_id > -1"
      v-model="_active_account_id"
      v-bind:label="titlebar.steady.account_label"
      max-width="300"
      v-bind:items="records.accounts.all"
      v-bind:item-title="CONS.DB.STORES.ACCOUNTS.FIELDS.N"
      v-bind:item-value="CONS.DB.STORES.ACCOUNTS.FIELDS.ID"
      v-on:update:modelValue="titlebar.updateTitlebar"
    ></v-select>
  </v-app-bar>
</template>

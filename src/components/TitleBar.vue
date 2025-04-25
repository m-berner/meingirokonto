<!--
  -- This Source Code Form is subject to the terms of the Mozilla Public
  -- License, v. 2.0. If a copy of the MPL was not distributed with this file,
  -- you could obtain one at https://mozilla.org/MPL/2.0/.
  --
  -- Copyright (c) 2014-2025, Martin Berner, meingirokonto@gmx.de. All rights reserved.
  -->
<template>
  <v-app-bar app color="secondary" v-bind:flat="true">
    <template v-slot:prepend>
      <CustomLogo v-bind:name="logo"></CustomLogo>
    </template>
    <v-app-bar-title>{{ t('titleBar.title') }}</v-app-bar-title>
    <v-select
      v-if="records.accounts.all.length > 0"
      v-model="activeAccountId"
      label="IBAN"
      max-width="300"
      v-bind:item-title="CONS.DB.STORES.ACCOUNTS.FIELDS.N"
      v-bind:item-value="CONS.DB.STORES.ACCOUNTS.FIELDS.ID"
      v-bind:items="records.accounts.all"
      v-on:update:modelValue="settings.onUpdateAccount"
    ></v-select>
  </v-app-bar>
</template>

<script lang="ts" setup>
import {useRecordsStore} from '@/stores/records'
import {useSettingsStore} from '@/stores/settings'
import {useI18n} from 'vue-i18n'
import CustomLogo from '@/components/helper/CustomLogo.vue'
import {CONS} from '@/pages/background'
import {storeToRefs} from 'pinia'

const {t} = useI18n()
const records = useRecordsStore()
const settings = useSettingsStore()

const {logo, activeAccountId} = storeToRefs(settings)

// TODO calculate booking sums cCredit + cDebit

console.log('--- TitleBar.vue setup ---')
</script>

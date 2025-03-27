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
      <CustomLogo v-bind:name="state.logo"></CustomLogo>
    </template>
    <v-app-bar-title>{{ t('titleBar.title') }}</v-app-bar-title>
    <v-select
      v-if="records.account.all.length > 0"
      v-model="records.account.active_id"
      item-title="cAccountNumber"
      item-value="cID"
      label="IBAN"
      max-width="300"
      v-bind:items="records.account.all"
    ></v-select>
  </v-app-bar>
</template>

<script lang="ts" setup>
import {useRecordsStore} from '@/stores/records'
import {useI18n} from 'vue-i18n'
import {reactive, watchEffect} from 'vue'
import CustomLogo from '@/components/logos/CustomLogo.vue'

const {t} = useI18n()
const records = useRecordsStore()

const state = reactive({
  logo: 'nologo'
  // DE12 5001 0517 5419 2996 72 INGDEFFXXX
  // DE13 1203 0000 1064 5069 99 BYLADEM1001
})
// TODO calculate booking sums cCredit + cDebit
watchEffect(() => {
  const accountIndex = records.getAccountIndexById(records.account.active_id)
  if (accountIndex === -1) { return }
  state.logo = records.account.all[accountIndex].cSwift.substring(0,4).toLowerCase()
  browser.storage.local.set({ sAccountActiveId: records.account.all[accountIndex].cID })
})

console.log('--- TitleBar.vue setup ---')
</script>

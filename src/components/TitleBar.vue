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
      v-if="records.accounts.all.length > 0"
      v-model="records.accounts.active_id"
      label="IBAN"
      max-width="300"
      v-bind:item-title="CONS.DB.STORES.ACCOUNTS.FIELDS.N"
      v-bind:item-value="CONS.DB.STORES.ACCOUNTS.FIELDS.ID"
      v-bind:items="records.accounts.all"
    ></v-select>
  </v-app-bar>
</template>

<script lang="ts" setup>
import {useRecordsStore} from '@/stores/records'
import {useI18n} from 'vue-i18n'
import {reactive, watchEffect} from 'vue'
import CustomLogo from '@/components/helper/CustomLogo.vue'
import {CONS} from '@/pages/background'

const {t} = useI18n()
const records = useRecordsStore()

const state = reactive({
  logo: 'DefaultSvg'
  // DE12 5001 0517 5419 2996 72 INGDEFFXXX
  // DE13 1203 0000 1064 5069 99 BYLADEM1001
})
// TODO calculate booking sums cCredit + cDebit
watchEffect(() => {
  const accountIndex = records.getAccountIndexById(records.accounts.active_id)
  if (accountIndex > -1) {
    const lName = records.accounts.all[accountIndex].cSwift.substring(0, 4)
    if (Object.keys(CONS.LOGOS).includes(lName.toUpperCase())) {
      state.logo = lName[0].toUpperCase() + lName.toLowerCase().slice(1) + 'Svg'
    } else {
      state.logo = 'DefaultSvg'
    }
    console.info('TITLEBAR: watchEffect', state.logo)
    browser.storage.local.set({sAccountActiveId: records.accounts.all[accountIndex].cID})
  }
})

console.log('--- TitleBar.vue setup ---')
</script>

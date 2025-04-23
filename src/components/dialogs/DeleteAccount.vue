<!--
  -- This Source Code Form is subject to the terms of the Mozilla Public
  -- License, v. 2.0. If a copy of the MPL was not distributed with this file,
  -- you could obtain one at https://mozilla.org/MPL/2.0/.
  --
  -- Copyright (c) 2014-2025, Martin Berner, meingirokonto@gmx.de. All rights reserved.
  -->
<template>
  <v-form ref="form-ref" validate-on="submit" v-on:submit.prevent>
    <v-select
      v-model="state.selected"
      density="compact"
      required
      v-bind:label="t('dialogs.deleteAccount.accountNumberLabel')"
      variant="outlined"
      v-bind:item-title="CONS.DB.STORES.ACCOUNTS.FIELDS.N"
      v-bind:item-value="CONS.DB.STORES.ACCOUNTS.FIELDS.ID"
      v-bind:items="records.accounts.all"
    ></v-select>
  </v-form>
</template>

<script lang="ts" setup>
import {defineExpose, onMounted, reactive, useTemplateRef} from 'vue'
import {useI18n} from 'vue-i18n'
import {useRecordsStore} from '@/stores/records'
import {CONS, useApp} from '@/pages/background'

const {t} = useI18n()
const {notice} = useApp()
const formRef = useTemplateRef('form-ref')
const records = useRecordsStore()

const state = reactive({
  selected: null
})
// TODO titlebar logo...
const ok = async (): Promise<void> => {
  console.log('DELETE_ACCOUNT: ok')
    try {
      const result = await records.deleteAccount(state.selected)
      if (result === 'Account deleted') {
        formRef.value?.reset()
        await notice([t('dialogs.deleteAccount.success')])
      }
    } catch (e) {
      console.error(e)
      await notice([t('dialogs.deleteAccount.error')])
    }
}
const title = t('dialogs.deleteAccount.title')

defineExpose({ok, title})

onMounted(() => {
  console.log('DELETE_ACCOUNT: onMounted', formRef)
  formRef.value?.reset()
})

console.log('--- DeleteAccount.vue setup ---')
</script>

<!--
  -- This Source Code Form is subject to the terms of the Mozilla Public
  -- License, v. 2.0. If a copy of the MPL was not distributed with this file,
  -- you could obtain one at https://mozilla.org/MPL/2.0/.
  --
  -- Copyright (c) 2014-2025, Martin Berner, meingirokonto@gmx.de. All rights reserved.
  -->
<template>
  <v-form ref="form-ref" validate-on="submit">
    <v-select
      v-model="records.accounts.all.cNumber"
      density="compact"
      required
      v-bind:label="t('dialogs.deleteAccount.accountNumberLabel')"
      variant="outlined"
    ></v-select>
  </v-form>
</template>

<script lang="ts" setup>
import {defineExpose, onMounted, reactive, useTemplateRef} from 'vue'
import {useI18n} from 'vue-i18n'
import {useRecordsStore} from '@/stores/records'
import {useApp} from '@/pages/background'
import {CONS} from '@/pages/background'

const {t} = useI18n()
const {notice} = useApp()
const formRef = useTemplateRef('form-ref')
const state: Omit<IAccount, 'cID' | 'cSwift' | 'cCurrency'> = reactive({
  cNumber: ''
})
const records = useRecordsStore()

const ok = async (): Promise<void> => {
  console.log('DELETE_ACCOUNT: ok')
  const formIs = await formRef.value!.validate()
  if (formIs.valid) {
    try {
      const records = useRecordsStore()
      const result = await records.addAccount({
        cNumber: state.cNumber.replace(/\s/g, '')
      })
      if (result === CONS.RESULTS.SUCCESS) {
        await notice([t('dialogs.deleteAccount.success')])
        formRef.value!.reset()
      }
    } catch (e) {
      console.error(e)
      await notice([t('dialogs.deleteAccount.error')])
    }
  }
}
const title = t('dialogs.deleteAccount.title')

defineExpose({ok, title})

onMounted(() => {
  console.log('DELETE_ACCOUNT: onMounted', formRef)
  formRef.value!.reset()
})

console.log('--- DeleteAccount.vue setup ---')
</script>

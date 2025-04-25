<!--
  -- This Source Code Form is subject to the terms of the Mozilla Public
  -- License, v. 2.0. If a copy of the MPL was not distributed with this file,
  -- you could obtain one at https://mozilla.org/MPL/2.0/.
  --
  -- Copyright (c) 2014-2025, Martin Berner, meingirokonto@gmx.de. All rights reserved.
  -->
<template>
  <v-form ref="form-ref" validate-on="submit">
    <v-text-field
      ref="swift-input"
      v-model="state.cSwift"
      autofocus
      required
      v-bind:label="t('dialogs.addAccount.swiftLabel')"
      v-bind:rules="VALIDATORS.swiftRules([t('validators.swiftRules', 0), t('validators.swiftRules', 1)])"
      variant="outlined"
    ></v-text-field>
  </v-form>
</template>

<script lang="ts" setup>
import {defineExpose, onMounted, reactive, useTemplateRef} from 'vue'
import {useI18n} from 'vue-i18n'
import {useApp} from '@/pages/background'

const {t} = useI18n()
const {notice, VALIDATORS} = useApp()
const formRef = useTemplateRef('form-ref')
const state: Omit<IAccount, 'cID'> = reactive({
  cSwift: '',
  cCurrency: '',
  cNumber: ''
})

const ok = (): Promise<void> => {
  console.log('SHOW_ACCOUNTING: ok')
  return new Promise(async (resolve): Promise<void> => {
    const formIs = await formRef.value!.validate()
    if (formIs.valid) {
      try {
        //const records = useRecordsStore()
        //const result = await records.addAccount({
        //  cSwift: state.cSwift.trim(),
        //  cNumber: state.cNumber.replace(/\s/g, ''),
        //  cCurrency: state.cCurrency.trim().toUpperCase()
        //})
        // if (result === CONS.RESULTS.SUCCESS) {
        //   await notice([t('dialogs.showAccounting.success')])
        //   formRef.value!.reset()
        // }
        resolve()
      } catch (e) {
        console.error(e)
        await notice([t('dialogs.showAccounting.error')])
      }
    }
  })
}
const title = t('dialogs.showAccounting.title')

defineExpose({ok, title})

onMounted(() => {
  console.log('SHOW_ACCOUNTING: onMounted', formRef)
  formRef.value!.reset()
})

console.log('--- ShowAccounting.vue setup ---')
</script>

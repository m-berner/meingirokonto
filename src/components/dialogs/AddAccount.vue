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
      v-model="state.swiftInput"
      autofocus
      required
      v-bind:label="t('dialogs.addAccount.swiftLabel')"
      v-bind:rules="validators.swiftRules([t('validators.swiftRules', 0), t('validators.swiftRules', 1)])"
      variant="outlined"
    ></v-text-field>
    <v-text-field
      v-model="state.accountNumberInput"
      v-bind:placeholder="t('dialogs.addAccount.accountNumberPlaceholder')"
      required
      v-bind:label="t('dialogs.addAccount.accountNumberLabel')"
      v-bind:rules="validators.ibanRules([t('validators.ibanRules', 0), t('validators.ibanRules', 1), t('validators.ibanRules', 2)])"
      variant="outlined"
      @update:modelValue="ibanMask"
    ></v-text-field>
    <v-text-field
      v-model="state.currencyInput"
      required
      v-bind:placeholder="t('dialogs.addAccount.currencyPlaceholder')"
      v-bind:label="t('dialogs.addAccount.currencyLabel')"
      variant="outlined"
    ></v-text-field>
  </v-form>
</template>

<script lang="ts" setup>
import {defineExpose, onMounted, reactive, useTemplateRef} from 'vue'
import {useI18n} from 'vue-i18n'
import {useRecordsStore} from '@/stores/records'
import {useApp} from '@/composables/useApp'

const {t} = useI18n()
const {CONS, notice, validators} = useApp()
const formRef = useTemplateRef('form-ref')
const swiftInputRef = useTemplateRef('swift-input')
//cDate: new Date(state._date).getTime(),
const state = reactive({
  swiftInput: '',
  currencyInput: '',
  accountNumberInput: ''
})
//   <td v-if="item.cDate > 0">{{ d(new Date(item.cDate), 'short', 'de-DE') }}</td>
// <td v-else></td>
// <td v-if="item.cExDay > 0">{{ d(new Date(item.cExDay), 'short', 'de-DE') }}</td>
// <td v-else></td>
const ibanMask = (iban: string) => {
  if (iban !== null) {
    const withoutSpace = iban.replace(/\s/g, '')
    const loops = Math.ceil(withoutSpace.length / 4)
    let masked = ''
    for (let i = 0; i < loops; i++) {
      if (i === 0) {
        masked = withoutSpace.slice(i * 4, (i + 1) * 4).toUpperCase()
      } else {
        masked += ' ' + withoutSpace.slice(i * 4, (i + 1) * 4)
      }
    }
    state.accountNumberInput = masked
  }
}

const ok = async (): Promise<void> => {
  console.log('ADD_ACCOUNT: ok')
  const form = await formRef.value!.validate()
  if (!form.valid) { return }
  //
  const records = useRecordsStore()
  try {
    const result = await records.addAccount({cSwift: state.swiftInput, cNumber: state.accountNumberInput.replace(/\s/g, ''), cCurrency: state.currencyInput})
    if (result === CONS.RESULTS.SUCCESS) {
      notice([t('dialogs.addAccount.success')])
    }
  } catch (e) {
    console.info(e)
    notice([state.swiftInput, t('dialogs.addAccount.error')])
  } finally {
    state.swiftInput = ''
    state.accountNumberInput = ''
    state.currencyInput = ''
    swiftInputRef.value!.focus()
  }
}
const title = t('dialogs.addAccount.title')

defineExpose({ok, title})

onMounted(() => {
  console.log('ADD_ACCOUNT: onMounted', formRef)
  formRef.value!.reset()
})

console.log('--- AddAccount.vue setup ---')
</script>

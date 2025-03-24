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
      ref="name-input"
      v-model="state.nameInput"
      autofocus
      required
      v-bind:label="t('dialogs.addAccount.nameLabel')"
      v-bind:rules="validators.nameRules([t('validators.nameRules', 0), t('validators.nameRules', 1), t('validators.nameRules', 2)])"
      variant="outlined"
    ></v-text-field>
    <v-text-field
      v-model="state.accountIdInput"
      placeholder="e.g. DE67 1234 5678 9123 8531 78"
      required
      v-bind:label="t('dialogs.addAccount.accountIdLabel')"
      v-bind:rules="validators.ibanRules([t('validators.ibanRules', 0), t('validators.ibanRules', 1), t('validators.ibanRules', 2)])"
      variant="outlined"
      @update:modelValue="ibanMask"
    ></v-text-field>
    <v-text-field
      v-model="state.logoInput"
      required
      v-bind:label="t('dialogs.addAccount.logoLabel')"
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
const nameInputRef = useTemplateRef('name-input')

const state = reactive({
  nameInput: '',
  currencyInput: '',
  accountIdInput: '',
  logoInput: ''
})

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
    state.accountIdInput = masked
  }
}

const ok = async (): Promise<void> => {
  console.log('ADD_ACCOUNT: ok')
  const form = await formRef.value!.validate()
  if (!form.valid) { return }
  //
  const records = useRecordsStore()
  try {
    const result = await records.addAccount({cName: state.nameInput, cNumber: state.accountIdInput.replace(/\s/g, ''), cLogo: state.logoInput})
    if (result === CONS.RESULTS.SUCCESS) {
      notice([t('dialogs.addAccount.success')])
    }
  } catch (e) {
    console.info(e)
    notice([state.nameInput, t('dialogs.addAccount.error')])
  } finally {
    state.nameInput = ''
    state.accountIdInput = ''
    state.logoInput = ''
    nameInputRef.value!.focus()
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

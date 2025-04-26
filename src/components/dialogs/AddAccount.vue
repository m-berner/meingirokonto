<!--
  -- This Source Code Form is subject to the terms of the Mozilla Public
  -- License, v. 2.0. If a copy of the MPL was not distributed with this file,
  -- you could obtain one at https://mozilla.org/MPL/2.0/.
  --
  -- Copyright (c) 2014-2025, Martin Berner, meingirokonto@gmx.de. All rights reserved.
  -->
<template>
  <v-form ref="form-ref" validate-on="submit" v-on:submit.prevent>
    <v-text-field
      ref="swift-input"
      v-model="state.cSwift"
      autofocus
      required
      v-bind:label="t('dialogs.addAccount.swiftLabel')"
      v-bind:rules="VALIDATORS.swiftRules([t('validators.swiftRules', 0), t('validators.swiftRules', 1)])"
      variant="outlined"
    ></v-text-field>
    <v-text-field
      v-model="state.cNumber"
      required
      v-bind:label="t('dialogs.addAccount.accountNumberLabel')"
      v-bind:placeholder="t('dialogs.addAccount.accountNumberPlaceholder')"
      v-bind:rules="VALIDATORS.ibanRules([t('validators.ibanRules', 0), t('validators.ibanRules', 1), t('validators.ibanRules', 2)])"
      variant="outlined"
      @update:modelValue="ibanMask"
    ></v-text-field>
    <v-text-field
      v-model="state.cCurrency"
      required
      v-bind:label="t('dialogs.addAccount.currencyLabel')"
      v-bind:placeholder="t('dialogs.addAccount.currencyPlaceholder')"
      v-bind:rules="VALIDATORS.currencyCodeRules([t('validators.currencyCodeRules', 0), t('validators.currencyCodeRules', 1), t('validators.currencyCodeRules', 2)])"
      variant="outlined"
    ></v-text-field>
  </v-form>
</template>

<script lang="ts" setup>
import {defineExpose, onMounted, reactive, useTemplateRef} from 'vue'
import {useI18n} from 'vue-i18n'
import {useRecordsStore} from '@/stores/records'
import {useSettingsStore} from '@/stores/settings'
import {useApp} from '@/pages/background'

const {t} = useI18n()
const {notice, VALIDATORS} = useApp()
const formRef = useTemplateRef('form-ref')
const state: Omit<IAccount, 'cID'> = reactive({
  cSwift: '',
  cCurrency: '',
  cNumber: ''
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
    state.cNumber = masked
  }
}

const ok = (): Promise<void> => {
  console.log('ADD_ACCOUNT: ok')
  return new Promise(async (resolve): Promise<void> => {
    const formIs = await formRef.value!.validate()
    if (formIs.valid) {
      try {
        const records = useRecordsStore()
        const settings = useSettingsStore()
        const result = await records.addAccount({
          cSwift: state.cSwift.trim().toUpperCase(),
          cNumber: state.cNumber.replace(/\s/g, ''),
          cCurrency: state.cCurrency.trim().toUpperCase()
        })
        if (settings.activeAccountId < 0) {
          const accountIndex = records.getAccountIndexById(result)
          const lName = records.accounts.all[accountIndex].cSwift.substring(0, 4)
          settings.setLogo(lName[0].toUpperCase() + lName.toLowerCase().slice(1) + 'Svg')
          settings.setActiveAccountId(result)
          await browser.storage.local.set({sLogo: lName[0].toUpperCase() + lName.toLowerCase().slice(1) + 'Svg'})
          await browser.storage.local.set({sActiveAccountId: result})
        }
        await notice([t('dialogs.addAccount.success')])
        formRef.value!.reset()
        resolve()
      } catch (e) {
        console.error(e)
        await notice([t('dialogs.addAccount.error')])
      }
    }
  })
}
const title = t('dialogs.addAccount.title')

defineExpose({ok, title})

onMounted(() => {
  console.log('ADD_ACCOUNT: onMounted', formRef)
  formRef.value!.reset()
})

console.log('--- AddAccount.vue setup ---')
</script>

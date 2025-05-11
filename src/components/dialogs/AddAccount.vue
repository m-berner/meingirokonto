<!--
  - This Source Code Form is subject to the terms of the Mozilla Public
  - License, v. 2.0. If a copy of the MPL was not distributed with this file,
  - you could obtain one at https://mozilla.org/MPL/2.0/.
  -
  - Copyright (c) 2014-2025, Martin Berner, meingirokonto@gmx.de. All rights reserved.
  -->
<script lang="ts" setup>
import {defineExpose, onMounted, useTemplateRef} from 'vue'
import {useI18n} from 'vue-i18n'
import {useRecordsStore} from '@/stores/records'
import {useSettingsStore} from '@/stores/settings'
import {useApp} from '@/pages/background'
import {useAddAccountStore} from '@/components/dialogs/addaccount'
import {storeToRefs} from 'pinia'
import {useTitleBarStore} from '@/components/titlebar'

const {t} = useI18n()
const {log, notice, VALIDATORS} = useApp()
const formRef = useTemplateRef('form-ref')
const addaccount = useAddAccountStore()
const titlebar = useTitleBarStore()
const {_logoUrl, _number, _swift, _brandFetchName} = storeToRefs(addaccount)

addaccount.setSteady({
  swiftLabel: t('dialogs.addAccount.swiftLabel'),
  accountNumberLabel:t('dialogs.addAccount.accountNumberPlaceholder'),
  logoLabel: t('dialogs.addAccount.logoLabel')
})
const onInput = () => {
  _logoUrl.value = `https://cdn.brandfetch.io/${_brandFetchName.value}/w/48/h/48?c=1idV74s2UaSDMRIQg-7`
}
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
    _number.value = masked
  }
}

const ok = (): Promise<void> => {
  log('ADD_ACCOUNT: ok')
  return new Promise(async (resolve): Promise<void> => {
    const formIs = await formRef.value!.validate()
    if (formIs.valid) {
      try {
        const records = useRecordsStore()
        const settings = useSettingsStore()
        const result = await records.addAccount({
          cSwift: _swift.value.trim().toUpperCase(),
          cNumber: _number.value.replace(/\s/g, ''),
          cLogoUrl: _logoUrl.value
        })
        if (result > 0) {
          settings.setActiveAccountId(result)
          titlebar.setLogo()
          await browser.storage.local.set({sActiveAccountId: result})
          await notice([t('dialogs.addAccount.success')])
          formRef.value!.reset()
          resolve()
        }

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
  log('ADD_ACCOUNT: onMounted')
  formRef.value!.reset()
})

log('--- AddAccount.vue setup ---')
</script>

<template>
  <v-form ref="form-ref" validate-on="submit" v-on:submit.prevent>
    <v-text-field
      ref="swift-input"
      v-model="_swift"
      autofocus
      required
      v-bind:label="addaccount.steady.swiftLabel"
      v-bind:rules="VALIDATORS.swiftRules([t('validators.swiftRules', 0), t('validators.swiftRules', 1)])"
      variant="outlined"
    ></v-text-field>
    <v-text-field
      v-model="_number"
      required
      v-bind:label="t('dialogs.addAccount.accountNumberLabel')"
      v-bind:placeholder="addaccount.steady.accountNumberLabel"
      v-bind:rules="VALIDATORS.ibanRules([t('validators.ibanRules', 0), t('validators.ibanRules', 1), t('validators.ibanRules', 2)])"
      variant="outlined"
      @update:modelValue="ibanMask"
    ></v-text-field>
    <v-text-field
      v-model="_brandFetchName"
      autofocus
      placeholder="z. B. ing.com"
      required
      v-bind:label="addaccount.steady.logoLabel"
      v-bind:rules="VALIDATORS.brandNameRules([t('validators.brandNameRules', 0)])"
      variant="outlined"
      v-on:input="onInput"
    ></v-text-field>
    <img alt="brandfetch.com logo" v-bind:src="_logoUrl">
  </v-form>
</template>

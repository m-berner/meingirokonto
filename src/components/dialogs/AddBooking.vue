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
      ref="date-input"
      v-model="state.cDate"
      autofocus
      density="compact"
      required
      type="date"
      v-bind:label="t('dialogs.addBooking.dateLabel')"
      v-bind:rules="VALIDATORS.dateRules([t('validators.dateRules', 0)])"
      variant="outlined"
      v-on:focus="formRef?.resetValidation"
    ></v-text-field>
    <CurrencyInput
      v-model="state.cCredit"
      v-bind:label="t('dialogs.addBooking.creditLabel')"
      v-bind:options="{ currency: 'EUR' }"
    ></CurrencyInput>
    <CurrencyInput
      v-model="state.cDebit"
      v-bind:label="t('dialogs.addBooking.debitLabel')"
      v-bind:options="{ currency: 'EUR' }"
    ></CurrencyInput>
    <v-text-field
      v-model="state.cDescription"
      density="compact"
      required
      v-bind:label="t('dialogs.addBooking.descriptionLabel')"
      variant="outlined"
    ></v-text-field>
    <v-select
      ref="type-input"
      v-model="state.cType"
      density="compact"
      max-width="300"
      v-bind:item-title="CONS.DB.STORES.BOOKING_TYPES.FIELDS.N"
      v-bind:item-value="CONS.DB.STORES.BOOKING_TYPES.FIELDS.ID"
      v-bind:items="records.bookingTypes.all.sort((a: IBookingType, b: IBookingType): number => { return a.cName.localeCompare(b.cName) })"
      v-bind:label="t('dialogs.addBookingType.label')"
      v-bind:menu=false
      v-bind:menu-props="{ maxHeight: 250 }"
      v-bind:rules="VALIDATORS.requiredRule([t('validators.requiredRule', 0)])"
      variant="outlined"
    ></v-select>
  </v-form>
</template>

<script lang="ts" setup>
import {defineExpose, onMounted, reactive, useTemplateRef} from 'vue'
import {useI18n} from 'vue-i18n'
import {useRecordsStore} from '@/stores/records'
import {useApp} from '@/pages/background'
import CurrencyInput from '@/components/helper/CurrencyInput.vue'
import {useSettingsStore} from '@/stores/settings'

const {t} = useI18n()
const {notice, VALIDATORS} = useApp()
const records = useRecordsStore()
const settings = useSettingsStore()
const formRef = useTemplateRef('form-ref')
const {CONS} = useApp()

const state: Omit<IBooking, 'cID'> = reactive({
  cDate: '',
  cDebit: 0,
  cCredit: 0,
  cDescription: '',
  cType: 0,
  cAccountNumber: ''
})

const ok = (): Promise<void> => {
  console.log('ADD_BOOKING: ok', state.cType)
  return new Promise(async (resolve): Promise<void> => {
    const formIs = await formRef.value!.validate()
    if (formIs.valid) {
      try {
        const aNumber = records.accounts.all[records.getAccountIndexById(settings.activeAccountId)][CONS.DB.STORES.ACCOUNTS.FIELDS.N]
        const aDescription = state.cDescription !== undefined && state.cDescription !== null ? state.cDescription.trim() : ''
        const result = await records.addBooking({
          cDate: state.cDate,
          cCredit: state.cCredit,
          cDebit: state.cDebit,
          cDescription: aDescription,
          cType: state.cType,
          cAccountNumber: aNumber
        })
        if (result === CONS.RESULTS.SUCCESS) {
          await notice([t('dialogs.addBooking.success')])
          formRef.value!.reset()
          resolve()
        }
      } catch (e) {
        console.error(e)
        await notice([t('dialogs.addBooking.error')])
      }
    }
  })
}
const title = t('dialogs.addBooking.title')

defineExpose({ok, title})

onMounted(() => {
  console.log('ADD_BOOKING: onMounted', formRef)
  formRef.value!.reset()
})

console.log('--- AddBooking.vue setup ---')
</script>

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
      density="compact"
      autofocus
      required
      type="date"
      v-bind:label="t('dialogs.addBooking.dateLabel')"
      v-bind:rules="validators.dateRules([t('validators.dateRules', 0)])"
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
      required
      density="compact"
      v-bind:label="t('dialogs.addBooking.descriptionLabel')"
      variant="outlined"
    ></v-text-field>
    <v-select
      density="compact"
      variant="outlined"
      v-model="state.cType"
      ref="type-input"
      item-title="cName"
      item-value="cID"
      v-bind:label="t('dialogs.addBookingType.label')"
      v-bind:rules="validators.requiredRule([t('validators.requiredRule', 0)])"
      max-width="300"
      v-bind:menu=false
      v-bind:menu-props="{ maxHeight: 250 }"
      v-bind:items="records.bookingType.all.sort((a: IBookingType, b: IBookingType): number => { return a.cName.localeCompare(b.cName) })"
    ></v-select>
  </v-form>
</template>

<script lang="ts" setup>
import {defineExpose, onMounted, reactive, useTemplateRef} from 'vue'
import {useI18n} from 'vue-i18n'
import {useRecordsStore} from '@/stores/records'
import {useApp} from '@/composables/useApp'
import CurrencyInput from '@/components/CurrencyInput.vue'
//import {useRuntimeStore} from '@/stores/runtime'

const {t} = useI18n()
const {CONS, notice, validators} = useApp()
//const runtime = useRuntimeStore()
const records = useRecordsStore()
const formRef = useTemplateRef('form-ref')
const dateInputRef = useTemplateRef('date-input')
const state: Omit<IBooking, 'cID'> = reactive({
  cDate: '',
  cDebit: 0,
  cCredit: 0,
  cDescription: '',
  cType: 0,
  cAccountNumber: 0
})

//const localDate = new Date('2025-03-25').toUTCString()

const ok = async (): Promise<void> => {
  console.log('ADD_BOOKING: ok', state.cType)
  const formIs = await formRef.value!.validate()
  console.error('lpö', formIs.valid)
  //const records = useRecordsStore()
  //const bookingType = toRaw(state.selected)
  if (formIs.valid) {
    try {
      const result = await records.addBooking({
        cDate: state.cDate,
        cCredit: state.cCredit,
        cDebit: state.cDebit,
        cDescription: state.cDescription,
        cType: state.cType,
        cAccountNumber: 'DE3242342442424'
      })
      if (result === CONS.RESULTS.SUCCESS) {
        notice([t('dialogs.addBooking.success')])
        state.cDate = ''
        state.cDebit = 0
        state.cCredit = 0
        state.cDescription = ''
        state.cType = 0
        state.cAccountNumber = 0
      }
    } catch (e) {
      console.info(e)
      notice([t('dialogs.addBooking.error')])
    } finally {
      dateInputRef.value!.focus()
    }
  }
}
const title = t('dialogs.addBooking.title')

defineExpose({ok, title})

onMounted(() => {
  console.log('ADD_BOOKING: onMounted', formRef)
  formRef.value!.reset()
})

console.log('--- AddBooking.vue setup ---')
</script>

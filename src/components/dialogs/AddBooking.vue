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
import {useApp} from '@/pages/background'
import CurrencyInput from '@/components/helper/CurrencyInput.vue'
import {useSettingsStore} from '@/stores/settings'
import {useAddBookingStore} from '@/stores/components/dialogs/addbooking'
import {storeToRefs} from 'pinia'

const {t} = useI18n()
const {notice, VALIDATORS} = useApp()
const records = useRecordsStore()
const settings = useSettingsStore()
const formRef = useTemplateRef('form-ref')
const {CONS} = useApp()
const addbooking = useAddBookingStore()
const {_date, _credit, _debit, _description, _type} = storeToRefs(addbooking)

addbooking.setSteady({
  dateLabel: t('dialogs.addBooking.dateLabel'),
  creditLabel: t('dialogs.addBooking.creditLabel'),
  debitLabel: t('dialogs.addBooking.debitLabel'),
  descriptionLabel: t('dialogs.addBooking.descriptionLabel')  ,
  typeLabel: t('dialogs.addBooking.typeLabel'),
})
const ok = (): Promise<void> => {
  console.log('ADD_BOOKING: ok')
  return new Promise(async (resolve): Promise<void> => {
    const formIs = await formRef.value!.validate()
    if (formIs.valid) {
      try {
        const aNumber = records.accounts.all[records.getAccountIndexById(settings.activeAccountId)][CONS.DB.STORES.ACCOUNTS.FIELDS.N]
        const aDescription = _description.value !== undefined && _description.value !== null ? _description.value.trim() : ''
        const result = await records.addBooking({
          cDate: _date.value,
          // NOTE: CurrencyInput ensure 0 instead of null
          cCredit: _credit.value === null ? 0 : _credit.value,
          cDebit: _debit.value === null ? 0 : _debit.value,
          cDescription: aDescription,
          cType: _type.value,
          cAccountNumber: aNumber
        })
        if (result === CONS.RESULTS.SUCCESS) {
          _debit.value = 0
          _credit.value = 0
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

<template>
  <v-form ref="form-ref" validate-on="submit" v-on:submit.prevent>
    <v-text-field
      ref="date-input"
      v-model="_date"
      autofocus
      density="compact"
      required
      type="date"
      v-bind:label="addbooking.steady.stateLabel"
      v-bind:rules="VALIDATORS.dateRules([t('validators.dateRules', 0)])"
      variant="outlined"
      v-on:focus="formRef?.resetValidation"
    ></v-text-field>
    <CurrencyInput
      v-model="_credit"
      v-bind:label="addbooking.steady.creditLabel"
      v-bind:options="{ currency: 'EUR' }"
    ></CurrencyInput>
    <CurrencyInput
      v-model="_debit"
      v-bind:label="addbooking.steady.debitLabel"
      v-bind:options="{ currency: 'EUR' }"
    ></CurrencyInput>
    <v-text-field
      v-model="_description"
      density="compact"
      required
      v-bind:label="addbooking.steady.descriptionLabel"
      variant="outlined"
    ></v-text-field>
    <v-select
      ref="type-input"
      v-model="_type"
      density="compact"
      max-width="300"
      v-bind:item-title="CONS.DB.STORES.BOOKING_TYPES.FIELDS.N"
      v-bind:item-value="CONS.DB.STORES.BOOKING_TYPES.FIELDS.ID"
      v-bind:items="records.bookingTypes.all.sort((a: IBookingType, b: IBookingType): number => { return a.cName.localeCompare(b.cName) })"
      v-bind:label="addbooking.steady.typeLabel"
      v-bind:menu=false
      v-bind:menu-props="{ maxHeight: 250 }"
      v-bind:rules="VALIDATORS.requiredRule([t('validators.requiredRule', 0)])"
      variant="outlined"
    ></v-select>
  </v-form>
</template>

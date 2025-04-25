<!--
  -- This Source Code Form is subject to the terms of the Mozilla Public
  -- License, v. 2.0. If a copy of the MPL was not distributed with this file,
  -- you could obtain one at https://mozilla.org/MPL/2.0/.
  --
  -- Copyright (c) 2014-2025, Martin Berner, meingirokonto@gmx.de. All rights reserved.
  -->
<template>
  <v-form ref="form-ref" validate-on="submit">
    <v-combobox
      v-model="state.cName"
      ref="name-input"
      v-bind:item-title="CONS.DB.STORES.BOOKING_TYPES.FIELDS.N"
      v-bind:item-value="CONS.DB.STORES.BOOKING_TYPES.FIELDS.ID"
      v-bind:label="t('dialogs.addBookingType.label')"
      v-bind:rules="VALIDATORS.nameRules([t('validators.nameRules', 0), t('validators.nameRules', 1), t('validators.nameRules', 2)])"
      max-width="300"
      v-bind:menu=true
      v-bind:menu-props="{ maxHeight: 250 }"
      v-bind:items="records.bookingTypes.all.sort((a: IBookingType, b: IBookingType): number => { return a.cName.localeCompare(b.cName) })"
    ></v-combobox>
  </v-form>
</template>

<script lang="ts" setup>
import {defineExpose, onMounted, reactive, useTemplateRef} from 'vue'
import {useI18n} from 'vue-i18n'
import {useRecordsStore} from '@/stores/records'
import {useApp} from '@/pages/background'

const {t} = useI18n()
const {CONS, notice, VALIDATORS} = useApp()
const formRef = useTemplateRef('form-ref')
const records = useRecordsStore()

const state: Omit<IBookingType, 'cID'> = reactive({
  cName: ''
})

const ok = (): Promise<void> => {
  console.log('ADD_BOOKING_TYPE: ok')
  return new Promise(async (resolve): Promise<void> => {
    const formIs = await formRef.value!.validate()
    if (formIs.valid) {
      try {
        const records = useRecordsStore()
        const result = await records.addBookingType({cName: state.cName.trim()})
        if (result === CONS.RESULTS.SUCCESS) {
          await notice([t('dialogs.addBookingType.success')])
          formRef.value!.reset()
          resolve()
        }
      } catch (e) {
        console.error(e)
        await notice([t('dialogs.addBookingType.error')])
      }
    }
  })
}
const title = t('dialogs.addBookingType.title')

defineExpose({ok, title})

onMounted(() => {
  console.log('ADD_BOOKING_TYPE: onMounted', formRef)
  formRef.value!.reset()
})

console.log('--- AddBookingType.vue setup ---')
</script>

<!--
  -- This Source Code Form is subject to the terms of the Mozilla Public
  -- License, v. 2.0. If a copy of the MPL was not distributed with this file,
  -- you could obtain one at https://mozilla.org/MPL/2.0/.
  --
  -- Copyright (c) 2014-2025, Martin Berner, meingirokonto@gmx.de. All rights reserved.
  -->
<template>
  <v-form ref="form-ref" validate-on="submit" v-on:submit.prevent>
    <v-select
      v-model="state.selected"
      density="compact"
      required
      v-bind:item-title="CONS.DB.STORES.BOOKING_TYPES.FIELDS.N"
      v-bind:item-value="CONS.DB.STORES.BOOKING_TYPES.FIELDS.ID"
      v-bind:items="records.bookingTypes.all"
      v-bind:label="t('dialogs.deleteBookingType.label')"
      variant="outlined"
    ></v-select>
  </v-form>
</template>

<script lang="ts" setup>
import {onMounted, reactive, useTemplateRef} from 'vue'
import {useI18n} from 'vue-i18n'
import {CONS, useApp} from '@/pages/background'
import {useRecordsStore} from '@/stores/records'

const {t} = useI18n()
const {notice} = useApp()
const records = useRecordsStore()
const formRef = useTemplateRef('form-ref')

const state = reactive({
  selected: null
})

const ok = async (): Promise<void> => {
  console.log('DELETE_BOOKING_TYPE: ok')
  try {
    const result = await records.deleteBookingType(state.selected)
    if (result === 'Booking type deleted') {
      formRef.value?.reset()
      await notice([t('dialogs.deleteBookingType.success')])
    }
  } catch (e) {
    console.error(e)
    await notice([t('dialogs.deleteBookingType.error')])
  }
}
const title = t('dialogs.deleteBookingType.title')

defineExpose({ok, title})

onMounted(() => {
  console.log('DELETE_BOOKING_TYPE: onMounted', formRef)
  formRef.value?.reset()
})

console.log('--- DeleteBookingType.vue setup ---')
</script>

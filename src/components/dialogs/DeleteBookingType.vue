<!--
  - This Source Code Form is subject to the terms of the Mozilla Public
  - License, v. 2.0. If a copy of the MPL was not distributed with this file,
  - you could obtain one at https://mozilla.org/MPL/2.0/.
  -
  - Copyright (c) 2014-2025, Martin Berner, kontenmanager@gmx.de. All rights reserved.
  -->
<script lang="ts" setup>
import {onMounted, reactive, useTemplateRef} from 'vue'
import {useI18n} from 'vue-i18n'
import {useAppApi} from '@/pages/background'
import {useRecordsStore} from '@/stores/records'

const {t} = useI18n()
const {CONS, log, notice} = useAppApi()
const records = useRecordsStore()
const formRef = useTemplateRef('form-ref')

const state = reactive({
  _selected: -1
})
const ok = async (): Promise<void> => {
  log('DELETE_BOOKING_TYPE: ok')
  try {
    if (state._selected !== null && state._selected > 1) {
      const result = await records.deleteBookingType(state._selected)
      if (result === 'Booking type deleted') {
        formRef.value?.reset()
        await notice([t('dialogs.deleteBookingType.success')])
      }
    } else {
      await notice(['Start kann nicht entfernt werden'])
    }
  } catch (e) {
    console.error(e)
    await notice([t('dialogs.deleteBookingType.error')])
  }
}
const title = t('dialogs.deleteBookingType.title')

defineExpose({ok, title})

onMounted(() => {
  log('DELETE_BOOKING_TYPE: onMounted')
  formRef.value?.reset()
})

log('--- DeleteBookingType.vue setup ---')
</script>

<template>
  <v-form ref="form-ref" validate-on="submit" v-on:submit.prevent>
    <v-select
      v-model="state._selected"
      density="compact"
      required
      v-bind:item-title="CONS.DB.STORES.BOOKING_TYPES.FIELDS.NAME"
      v-bind:item-value="CONS.DB.STORES.BOOKING_TYPES.FIELDS.ID"
      v-bind:items="records.bookingTypes"
      v-bind:label="t('dialogs.deleteBookingType.label')"
      variant="outlined"
    ></v-select>
  </v-form>
</template>

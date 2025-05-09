<!--
  - This Source Code Form is subject to the terms of the Mozilla Public
  - License, v. 2.0. If a copy of the MPL was not distributed with this file,
  - you could obtain one at https://mozilla.org/MPL/2.0/.
  -
  - Copyright (c) 2014-2025, Martin Berner, meingirokonto@gmx.de. All rights reserved.
  -->
<script lang="ts" setup>
import {onMounted, useTemplateRef} from 'vue'
import {useI18n} from 'vue-i18n'
import {useApp} from '@/pages/background'
import {useRecordsStore} from '@/stores/records'
import {useDeleteBookingTypeStore} from '@/components/dialogs/deletebookingtype'
import {storeToRefs} from 'pinia'

const {t} = useI18n()
const {CONS, log, notice} = useApp()
const records = useRecordsStore()
const formRef = useTemplateRef('form-ref')
const deletebookingtype = useDeleteBookingTypeStore()

const {_selected} = storeToRefs(deletebookingtype)
deletebookingtype.setSteady({
  label: t('deleteBooking.confirm')
})
const ok = (): Promise<void> => {
  log('DELETE_BOOKING_TYPE: ok')
  return new Promise(async (resolve, reject): Promise<void> => {
    try {
      if (_selected.value !== null && _selected.value > 1) {
        const result = await records.deleteBookingType(_selected.value)
        if (result === 'Booking type deleted') {
          formRef.value?.reset()
          await notice([t('dialogs.deleteBookingType.success')])
          resolve()
        }
      } else {
        await notice(['Start kann nicht entfernt werden'])
        reject()
      }
    } catch (e) {
      console.error(e)
      await notice([t('dialogs.deleteBookingType.error')])
    }
  })
}
const title = t('dialogs.deleteBookingType.title')

defineExpose({ok, title})

onMounted(() => {
  log('DELETE_BOOKING_TYPE: onMounted')
  formRef.value?.reset()
})

console.log('--- DeleteBookingType.vue setup ---')
</script>

<template>
  <v-form ref="form-ref" validate-on="submit" v-on:submit.prevent>
    <v-select
      v-model="_selected"
      density="compact"
      required
      v-bind:item-title="CONS.DB.STORES.BOOKING_TYPES.FIELDS.N"
      v-bind:item-value="CONS.DB.STORES.BOOKING_TYPES.FIELDS.ID"
      v-bind:items="records.bookingTypes.all"
      v-bind:label="deletebookingtype.steady.t('dialogs.deleteBookingType.label')"
      variant="outlined"
    ></v-select>
  </v-form>
</template>

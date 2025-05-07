<!--
  - This Source Code Form is subject to the terms of the Mozilla Public
  - License, v. 2.0. If a copy of the MPL was not distributed with this file,
  - you could obtain one at https://mozilla.org/MPL/2.0/.
  -
  - Copyright (c) 2014-2025, Martin Berner, meingirokonto@gmx.de. All rights reserved.
  -->
<script lang="ts" setup>
import {useI18n} from 'vue-i18n'
import {useApp} from '@/pages/background'
import {useRecordsStore} from '@/stores/records'
import {useRuntimeStore} from '@/stores/runtime'
import {useDeleteBookingStore} from '@/stores/components/dialogs/deletebooking'

const {t} = useI18n()
const {notice} = useApp()
const records = useRecordsStore()
const runtime = useRuntimeStore()
const deletebooking = useDeleteBookingStore()

deletebooking.setSteady({
  label: t('dialogs.deleteBooking.ask')
})
const ok = (): Promise<void> => {
  console.log('DELETE_BOOKING: ok')
  return new Promise(async (resolve): Promise<void> => {
    try {
      const result = await records.deleteBooking(runtime.bookingId)
      if (result === 'Booking deleted') {
        await notice([t('dialogs.deleteBooking.success')])
        resolve()
      }
    } catch (e) {
      console.error(e)
      await notice([t('dialogs.deleteBooking.error')])
    }
  })
}
const title = t('dialogs.deleteBooking.title')

defineExpose({ok, title})

console.log('--- DeleteBooking.vue setup ---')
</script>

<template>
  <v-form validate-on="submit" v-on:submit.prevent>
    <p class="text-align-center">{{ records.getBookingTextById(runtime.bookingId) }}</p>
    <p class="text-align-center">{{ deletebooking.steady.label }}</p>
  </v-form>
</template>

<!--
  - This Source Code Form is subject to the terms of the Mozilla Public
  - License, v. 2.0. If a copy of the MPL was not distributed with this file,
  - you could obtain one at https://mozilla.org/MPL/2.0/.
  -
  - Copyright (c) 2014-2025, Martin Berner, kontenmanager@gmx.de. All rights reserved.
  -->
<script lang="ts" setup>
import {useI18n} from 'vue-i18n'
import {useApp} from '@/pages/background'
import {useRecordsStore} from '@/stores/records'
import {useRuntimeStore} from '@/stores/runtime'

const {t} = useI18n()
const {log, notice} = useApp()
const records = useRecordsStore()
const runtime = useRuntimeStore()

const ok = async (): Promise<void> => {
  log('DELETE_BOOKING: ok')
  try {
    const result = await records.deleteBooking(runtime.bookingId)
    if (result === 'Booking deleted') {
      await notice([t('dialogs.deleteBooking.success')])
    }
  } catch (e) {
    console.error(e)
    await notice([t('dialogs.deleteBooking.error')])
  }
}
const title = t('dialogs.deleteBooking.title')

defineExpose({ok, title})

log('--- DeleteBooking.vue setup ---')
</script>

<template>
  <v-form validate-on="submit" v-on:submit.prevent>
    <p class="text-align-center">{{ records.getBookingTextById(runtime.bookingId) }}</p>
    <p class="text-align-center">{{ t('dialogs.deleteBooking.ask') }}</p>
  </v-form>
</template>

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
      v-bind:id="INPUT_FIELD_ID"
      v-model="state.selected"
      autofocus
      required
      v-bind:label="t('dialogs.addBooking.label')"
      v-bind:rules="validators.nameRules"
      variant="outlined"
    ></v-text-field>
  </v-form>
</template>

<script lang="ts" setup>
import {defineExpose, onMounted, reactive, toRaw, useTemplateRef} from 'vue'
import {useI18n} from 'vue-i18n'
import {useRecordsStore} from '@/stores/records'
import {useApp} from '@/composables/useApp'
import {useRuntimeStore} from '@/stores/runtime'

const {t} = useI18n()
const {CONS, notice, validators} = useApp()
const runtime = useRuntimeStore()
const formRef = useTemplateRef('form-ref')

const INPUT_FIELD_ID = 'abt_input'
const state = reactive({
  selected: ''
})

const ok = async (): Promise<void> => {
  console.log('ADD_BOOKING: ok')
  formRef.value!.validate()
  const records = useRecordsStore()
  const bookingType = toRaw(state.selected)
  try {
    const result = await records.addBookingType({cName: bookingType})
    if (result === CONS.RESULTS.SUCCESS) {
      notice([t('dialogs.addBooking.success')])
    }
  } catch (e) {
    console.info(e)
    notice([bookingType, t('dialogs.addBooking.error')])
  } finally {
    state.selected = ''
    document.getElementById(INPUT_FIELD_ID)!.focus()
  }
}
const title = t('dialogs.addBooking.title')

defineExpose({ok, title})

onMounted(() => {
  console.log('ADD_BOOKING: onMounted', formRef)
  formRef.value!.reset()
  runtime.setIsOk(true)
})

console.log('--- AddBooking.vue setup ---')
</script>

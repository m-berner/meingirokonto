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
      v-model="state.nameInput"
      autofocus
      required
      ref="name-input"
      v-bind:label="t('dialogs.addBookingType.label')"
      variant="outlined"
    ></v-text-field>
  </v-form>
</template>

<script lang="ts" setup>
import {defineExpose, onMounted, reactive, toRaw, useTemplateRef} from 'vue'
import {useI18n} from 'vue-i18n'
import {useRecordsStore} from '@/stores/records'
import {useApp} from '@/composables/useApp'

const {t} = useI18n()
const {CONS, notice} = useApp()
const formRef = useTemplateRef('form-ref')
const nameInputRef = useTemplateRef('name-input')

const state = reactive({
  nameInput: ''
})

const ok = async (): Promise<void> => {
  console.log('ADD_BOOKING_TYPE: ok')
  const form = await formRef.value!.validate()
  if (!form.valid) { return }
  //
  const records = useRecordsStore()
  const nameInput = toRaw(state.nameInput).trim()
  try {
    const result = await records.addBookingType({cName: nameInput})
    if (result === CONS.RESULTS.SUCCESS) {
      notice([t('dialogs.addBookingType.success')])
    }
  } catch (e) {
    console.info(e)
    notice([nameInput, t('dialogs.addBookingType.error')])
  } finally {
    state.nameInput = ''
    nameInputRef.value!.focus()
  }
}
const title = t('dialogs.addBookingType.title')

defineExpose({ok, title})

onMounted(() => {
  console.log('ADD_BOOKING_TYPE: onMounted', formRef)
  formRef.value!.reset()
})

console.log('--- AddBookingType.vue setup ---')
</script>

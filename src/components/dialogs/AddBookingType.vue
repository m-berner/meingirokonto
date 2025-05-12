<!--
  -- This Source Code Form is subject to the terms of the Mozilla Public
  -- License, v. 2.0. If a copy of the MPL was not distributed with this file,
  -- you could obtain one at https://mozilla.org/MPL/2.0/.
  --
  -- Copyright (c) 2014-2025, Martin Berner, kontenmanager@gmx.de. All rights reserved.
  -->
<script lang="ts" setup>
import {defineExpose, onMounted, useTemplateRef} from 'vue'
import {useI18n} from 'vue-i18n'
import {useRecordsStore} from '@/stores/records'
import {useApp} from '@/pages/background'
import {useAddBookingTypeStore} from '@/components/dialogs/addbookingtype'
import {storeToRefs} from 'pinia'
import {useSettingsStore} from '@/stores/settings'

const {t} = useI18n()
const {CONS, log, notice, VALIDATORS} = useApp()
const formRef = useTemplateRef('form-ref')
const records = useRecordsStore()
const settings = useSettingsStore()

const addbookingtype = useAddBookingTypeStore()
const {_name} = storeToRefs(addbookingtype)

addbookingtype.setSteady({
  bookingTypeLabel: t('dialogs.addBookingType.label')
})
const ok = (): Promise<void> => {
  log('ADD_BOOKING_TYPE: ok')
  return new Promise(async (resolve): Promise<void> => {
    const formIs = await formRef.value!.validate()
    if (formIs.valid) {
      try {
        const records = useRecordsStore()
        const result = await records.addBookingType({cName: _name.value.trim(), cAccountNumberID: settings.activeAccountId})
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
  log('ADD_BOOKING_TYPE: onMounted')
  formRef.value!.reset()
})

log('--- AddBookingType.vue setup ---')
</script>

<template>
  <v-form ref="form-ref" validate-on="submit" v-on:submit.prevent>
    <v-combobox
      v-model="_name"
      ref="name-input"
      v-bind:item-title="CONS.DB.STORES.BOOKING_TYPES.FIELDS.N"
      v-bind:item-value="CONS.DB.STORES.BOOKING_TYPES.FIELDS.ID"
      v-bind:label="addbookingtype.steady.bookingTypeLabel"
      v-bind:rules="VALIDATORS.nameRules([t('validators.nameRules', 0), t('validators.nameRules', 1), t('validators.nameRules', 2)])"
      max-width="300"
      v-bind:menu=true
      v-bind:menu-props="{ maxHeight: 250 }"
      v-bind:items="records.bookingTypes.all.sort((a: IBookingType, b: IBookingType): number => { return a.cName.localeCompare(b.cName) })"
    ></v-combobox>
  </v-form>
</template>

<!--
  -- This Source Code Form is subject to the terms of the Mozilla Public
  -- License, v. 2.0. If a copy of the MPL was not distributed with this file,
  -- you could obtain one at https://mozilla.org/MPL/2.0/.
  --
  -- Copyright (c) 2014-2025, Martin Berner, meingirokonto@gmx.de. All rights reserved.
  -->
<template>
  <v-form ref="form-ref" validate-on="submit" v-on:submit.prevent>
    <v-combobox
      label="Buchungstyp"
      autofocus
      required
      :items="[{ cID: 1, cName: 'Garage' }, { cID: 2, cName: 'Bargeld' }]"
      item-value="cID"
      item-title="cName"
      variant="outlined"
    ></v-combobox>
  </v-form>
</template>

<script lang="ts" setup>
import {onMounted, reactive, useTemplateRef} from 'vue'
import {useI18n} from 'vue-i18n'
import {useRecordsStore} from '@/stores/records'
import {useApp} from '@/composables/useApp'
import {useRuntimeStore} from '@/stores/runtime'

const {t} = useI18n()
const {notice} = useApp()
const runtime = useRuntimeStore()
const formRef = useTemplateRef('form-ref')

const state: IBookingType = reactive({
    cID: 0,
    cName: ''
})

// const onMessageAddCompany = async (ev: MessageEvent): Promise<void> => {
//   console.info('addAccount: onMessageAddCompany', ev)
//   if (ev.data === undefined) {
//     notice(['Sorry, no data arrived'])
//   } else {
//     switch (ev.type) {
//       case CONS.FETCH_API.ANSWER__COMPANY_DATA:
//         state._company = ev.data.company
//         state._wkn = ev.data.wkn.toUpperCase()
//         state._sym = ev.data.symbol.toUpperCase()
//         break
//     }
//   }
// }

onMounted(() => {
  console.log('booking: onMounted', formRef)
  formRef.value?.reset()
  // state._auto = true
  runtime.setIsOk(true)
  // if (!browser.runtime.onMessage.hasListener(onMessageAddCompany)) {
  //   // noinspection JSDeprecatedSymbols
  //   browser.runtime.onMessage.addListener(onMessageAddCompany)
  // }
})

const ok = async (): Promise<void> => {
  console.log('BOOKING_TYPE: ok')
  const records = useRecordsStore()
  const booking: Omit<IBookingType, 'cID'> = {
    cName: state.cName,
  }
  const verify = records.booking.all_per_account.filter(() => {
    return 0 //state._isin.toUpperCase() === rec.cName.toUpperCase()
  })
  if (verify.length > 0) {
    notice(['booking ERROR: booking exists already'])
  } else {
    await records.bookingType(booking)
    //runtime.toggleVisibility(CONS.DIALOGS.BOOKING)
  }
}
const title = () => {
  return t('dialogs.bookingType.title')
}
const classes = () => {
  return ''
}
defineExpose({ok, title, classes})

console.log('--- booking.vue setup ---')
</script>

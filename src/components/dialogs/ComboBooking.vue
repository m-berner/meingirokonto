<!--
  -- This Source Code Form is subject to the terms of the Mozilla Public
  -- License, v. 2.0. If a copy of the MPL was not distributed with this file,
  -- you could obtain one at https://mozilla.org/MPL/2.0/.
  --
  -- Copyright (c) 2014-2025, Martin Berner, meingirokonto@gmx.de. All rights reserved.
  -->
<template>
  <v-form ref="form-ref" validate-on="submit" v-on:submit.prevent>
    <v-text-field
      v-model="state.cDate"
      autofocus
      required
      v-bind:label="t('dialogs.addAccount.isin')"
      variant="outlined"
    ></v-text-field>
    <v-text-field
      v-model="state.cDebit"
      required
      v-bind:label="t('dialogs.addAccount.company')"
      variant="outlined"
    ></v-text-field>
    <v-text-field
      v-model="state.cCredit"
      required
      v-bind:label="t('dialogs.addAccount.company')"
      variant="outlined"
    ></v-text-field>
    <v-text-field
      v-model="state.cDescription"
      v-bind:label="t('dialogs.addAccount.wkn')"
      variant="outlined"
    ></v-text-field>
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

const state: IBooking = reactive({
    cID: 0,
    cDate: 0,
    cDebit: 0,
    cCredit: 0,
    cDescription: '',
    cAccountID: 0,
    cAccountTypeID: 0
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
  console.log('booking: ok')
  const records = useRecordsStore()
  const booking: Omit<IBooking, 'cID'> = {
    cDate: state.cDate,
    cDebit: state.cDebit,
    cCredit: state.cCredit,
    cDescription: state.cDescription,
    cAccountID: state.cAccountID,
    cAccountTypeID: state.cAccountTypeID
  }
  const verify = records.booking.all_per_account.filter(() => {
    return 0 //state._isin.toUpperCase() === rec.cName.toUpperCase()
  })
  if (verify.length > 0) {
    notice(['booking ERROR: booking exists already'])
  } else {
    await records.booking(booking)
    //runtime.toggleVisibility(CONS.DIALOGS.BOOKING)
  }
}
const title = () => {
  return t('dialogs.booking.title')
}
const classes = () => {
  return ''
}
defineExpose({ok, title, classes})

console.log('--- booking.vue setup ---')
</script>

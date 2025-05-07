<!--
  - This Source Code Form is subject to the terms of the Mozilla Public
  - License, v. 2.0. If a copy of the MPL was not distributed with this file,
  - you could obtain one at https://mozilla.org/MPL/2.0/.
  -
  - Copyright (c) 2014-2025, Martin Berner, meingirokonto@gmx.de. All rights reserved.
  -->
<script lang="ts" setup>
import {defineExpose, onMounted} from 'vue'
import {useI18n} from 'vue-i18n'
import {useRecordsStore} from '@/stores/records'
import {useShowAccountingStore} from '@/stores/components/dialogs/showaccounting'

const {n, t} = useI18n()
const records = useRecordsStore()
const showaccounting = useShowAccountingStore()

const title = t('dialogs.showAccounting.title')

defineExpose({title})

onMounted(() => {
  console.log('SHOW_ACCOUNTING: onMounted')
  const sums = []
  for (let i = 1; i < records.bookingTypes.all.length; i++) {
    sums[i-1] = records.bookings.all.filter((entry: IBooking) => {
      return entry.cType === records.bookingTypes.all[i].cID
    }).map((entry: IBooking) => {
      return entry.cCredit - entry.cDebit
    }).reduce((acc: number, cur: number) => acc + cur, 0)
    showaccounting.addEntryToResult({title: records.bookingTypes.all[i].cName, subtitle: n(sums[i-1], 'currency')})
  }
})

console.log('--- ShowAccounting.vue setup ---')
</script>

<template>
  <v-form>
    <v-list height="440">
      <v-list-item
        v-for="entry in showaccounting.getResult"
        :key="entry.title"
        :subtitle="entry.subtitle"
        :title="entry.title"></v-list-item>
    </v-list>
  </v-form>
</template>

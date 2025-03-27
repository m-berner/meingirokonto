<!--
  -- This Source Code Form is subject to the terms of the Mozilla Public
  -- License, v. 2.0. If a copy of the MPL was not distributed with this file,
  -- you could obtain one at https://mozilla.org/MPL/2.0/.
  --
  -- Copyright (c) 2014-2025, Martin Berner, meingirokonto@gmx.de. All rights reserved.
  -->
<template>
  <v-text-field
    v-model="state.search"
    density="compact"
    hide-details
    prepend-inner-icon="$magnify"
    single-line
    v-bind:label="t('transfersTable.search')"
    variant="outlined"
  ></v-text-field>
  <v-data-table
    density="compact"
    item-key="cID"
    v-bind:headers="tableHeaders"
    v-bind:hide-no-data="false"
    v-bind:hover="true"
    v-bind:items="records.getBookingsPerAccount() as IBooking[]"
    v-bind:items-per-page="settings.itemsPerPageTransfers"
    v-bind:items-per-page-options="CONS.SETTINGS.ITEMS_PER_PAGE_OPTIONS"
    v-bind:items-per-page-text="t('transfersTable.itemsPerPageText')"
    v-bind:no-data-text="t('transfersTable.noDataText')"
    v-bind:search="state.search"
    v-on:update:items-per-page="
      (count) => {
        settings.setItemsPerPageTransfers(count)
      }
    "
  >
    <template v-slot:[`item`]="{ item }">
      <tr class="table-row">
        <td>
          <OptionMenu
            menuType="transfers"
            v-bind:menuItems="options"
            v-bind:recordID="item.cID"
          ></OptionMenu>
        </td>
        <td>{{ d(utcDate(item.cDate), 'short', 'de-DE') }}</td>
        <td>{{ n(item.cDebit, 'currency') }}</td>
        <td>{{ n(item.cCredit, 'currency') }}</td>
        <td>{{ item.cDescription }}</td>
        <td>{{ item.cType }}</td>
        <td>{{ item.cAccountNumber }}</td>
      </tr>
    </template>
  </v-data-table>
</template>

<script lang="ts" setup>
// const setDynamicStyleWinLoss = (el: HTMLElement | null): void => {
//   if (el !== null) {
//     if (toNumber(el.textContent) < 0) {
//       el.classList.add('color-red')
//     } else if (toNumber(el.textContent) > 0) {
//       el.classList.add('color-black')
//     }
//     el.classList.add('font-weight-bold')
//   }
// }

import OptionMenu from '@/components/OptionMenu.vue'
import {useI18n} from 'vue-i18n'
import {reactive} from 'vue'
import {useRecordsStore} from '@/stores/records'
import {useSettingsStore} from '@/stores/settings'
import {useApp} from '@/composables/useApp'

const {d, n, rt, t, tm} = useI18n()
const {CONS, utcDate} = useApp()
const records = useRecordsStore()
const settings = useSettingsStore()

const state = reactive({
  search: '',
  //bookings_per_account: []
})
const tableHeaders = tm('bookingTable.headers').map((item: {
  title: string,
  align: string,
  sortable: boolean,
  key: string
}) => {
  return {
    title: rt(item.title),
    align: rt(item.align) as 'start' | 'center' | 'end' | undefined,
    sortable: item.sortable,
    key: rt(item.key)
  }
})
const options: Record<string, string>[] = tm('bookingTable.menuItems')

//watchEffect(() => {
// const activeAccountIndex = records.getAccountIndexById(records.account.active_id)
// if (activeAccountIndex === -1) { return }
// state.bookings_per_account = records.booking.all.filter((rec: IBooking) => {
//   return rec.cAccountNumber === records.account.all[activeAccountIndex].cAccountNumber
// })
// state.bookings_per_account.sort((a: IBooking, b: IBooking)=> {
//   const A = new Date(a.cDate).getTime()
//   const B = new Date(b.cDate).getTime()
//   return A - B
// })
//state.bookings_per_account = records.getBookingsPerAccount()
//})

console.log('--- HomePage.vue setup ---')
</script>

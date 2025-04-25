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
    v-bind:label="t('bookingTable.search')"
    variant="outlined"
  ></v-text-field>
  <v-data-table
    v-if="runtime.lazyLoadBookingTable"
    density="compact"
    item-key="cID"
    v-bind:headers="tableHeaders"
    v-bind:hide-no-data="false"
    v-bind:hover="true"
    v-bind:items="records.getBookingsPerAccount() as IBooking[]"
    v-bind:items-per-page="settings.bookingsPerPage"
    v-bind:items-per-page-options="CONS.SETTINGS.ITEMS_PER_PAGE_OPTIONS"
    v-bind:items-per-page-text="t('bookingTable.itemsPerPageText')"
    v-bind:no-data-text="t('bookingTable.noDataText')"
    v-bind:search="state.search"
    v-on:update:items-per-page="
      (count) => {
        settings.setBookingsPerPage(count)
      }
    "
  >
    <template v-slot:[`item`]="{ item }">
      <tr class="table-row">
        <td>
          <OptionMenu
            v-bind:menuItems="options"
            v-bind:recordID="item.cID"
          ></OptionMenu>
        </td>
        <td>{{ d(utcDate(item.cDate), 'short', 'de-DE') }}</td>
        <td>{{ n(item.cDebit, 'currency') }}</td>
        <td>{{ n(item.cCredit, 'currency') }}</td>
        <td>{{ item.cDescription }}</td>
        <td>{{ records.getBookingTypeNameById(item.cType) }}</td>
        <td>{{ item.cAccountNumber }}</td>
      </tr>
    </template>
  </v-data-table>
</template>

<script lang="ts" setup>
import OptionMenu from '@/components/OptionMenu.vue'
import {useI18n} from 'vue-i18n'
import {reactive} from 'vue'
import {useRecordsStore} from '@/stores/records'
import {useSettingsStore} from '@/stores/settings'
import {useApp} from '@/pages/background'
import {useRuntimeStore} from '@/stores/runtime'

const {d, n, rt, t, tm} = useI18n()
const {CONS, utcDate} = useApp()
const records = useRecordsStore()
const settings = useSettingsStore()
const runtime = useRuntimeStore()

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

// const bookingTypeNameById = (id: number): string => {
//   //const {_booking_types} = storeToRefs(records)
//   //const all = toRaw(records.bookingTypes.all)
//   console.error('---koooo-------', id)
//   // let result = ''
//   // if (all.length > 0) {
//   //   const tmp = all.filter((entry: IBookingType) => {
//   //     console.error('---', entry)
//   //      return entry
//   //   })
//   //   console.error(id, all.length, all, tmp)
//   // }
//   return 'pp'
// }

console.log('--- HomePage.vue setup ---')
</script>

<!--
  - This Source Code Form is subject to the terms of the Mozilla Public
  - License, v. 2.0. If a copy of the MPL was not distributed with this file,
  - you could obtain one at https://mozilla.org/MPL/2.0/.
  -
  - Copyright (c) 2014-2025, Martin Berner, meingirokonto@gmx.de. All rights reserved.
  -->
<script lang="ts" setup>
import {storeToRefs} from 'pinia'
import {reactive} from 'vue'
import {useI18n} from 'vue-i18n'
import {useApp} from '@/pages/background'
import {useRecordsStore} from '@/stores/records'
import {useSettingsStore} from '@/stores/settings'
import OptionMenu from '@/components/OptionMenu.vue'

interface IHeader {
  title: string,
  align: string,
  sortable: boolean,
  key: string
}

interface IHomePage {
  bookings: readonly IBooking[],
  bookingHeaders: {
    readonly key?:
      | (string & {})
      | 'data-table-group'
      | 'data-table-select'
      | 'data-table-expand'
      | undefined
    readonly title?: string | undefined
    readonly align?: 'end' | 'start' | 'center' | undefined
    readonly sortable?: boolean | undefined
  }[]
  bookingsPerPage: number,
  search: string
}

const {d, n, rt, t, tm} = useI18n()
const {CONS, utcDate} = useApp()
const records = useRecordsStore()
const settings = useSettingsStore()

const {bookingsPerAccount} = storeToRefs(records)
const {bookingsPerPage} = storeToRefs(settings)

const state: IHomePage = reactive({
  bookings: bookingsPerAccount,
  bookingHeaders: tm('appPage.headers').map((item: IHeader): IHeader => {
    return {
      title: rt(item.title),
      align: rt(item.align),
      sortable: item.sortable,
      key: rt(item.key)
    }
  }),
  bookingsPerPage: bookingsPerPage,
  search: ''
})

console.log('--- HomePage.vue setup ---')
</script>

<template>
  <v-text-field
    v-model="state.search"
    density="compact"
    hide-details
    prepend-inner-icon="$magnify"
    single-line
    v-bind:label="t('appPage.search')"
    variant="outlined"
  ></v-text-field>
  <v-data-table
    density="compact"
    item-key="cID"
    v-bind:headers="state.bookingHeaders"
    v-bind:hide-no-data="false"
    v-bind:hover="true"
    v-bind:items="state.bookings"
    v-bind:items-per-page="state.bookingsPerPage"
    v-bind:items-per-page-options="CONS.SETTINGS.ITEMS_PER_PAGE_OPTIONS"
    v-bind:items-per-page-text="t('appPage.itemsPerPageText')"
    v-bind:no-data-text="t('appPage.noDataText')"
    v-bind:search="state.search"
    v-on:update:items-per-page="(count) => { settings.setBookingsPerPage(count) }">
    <template v-slot:[`item`]="{ item }">
      <tr class="table-row">
        <td>
          <OptionMenu
            v-bind:menuItems="tm('appPage.menuItems')"
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

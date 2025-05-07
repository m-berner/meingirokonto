<!--
  - This Source Code Form is subject to the terms of the Mozilla Public
  - License, v. 2.0. If a copy of the MPL was not distributed with this file,
  - you could obtain one at https://mozilla.org/MPL/2.0/.
  -
  - Copyright (c) 2014-2025, Martin Berner, meingirokonto@gmx.de. All rights reserved.
  -->
<script lang="ts" setup>
import {storeToRefs} from 'pinia'
import {useI18n} from 'vue-i18n'
import {useApp} from '@/pages/background'
import {useRecordsStore} from '@/stores/records'
import {useSettingsStore} from '@/stores/settings'
import OptionMenu from '@/components/OptionMenu.vue'
import {useHomeContentStore} from '@/stores/components/homecontent'

interface IHeader {
  title: string,
  align: string,
  sortable: boolean,
  key: string
}

const {d, n, rt, t, tm} = useI18n()
const {CONS, utcDate} = useApp()
const records = useRecordsStore()
const settings = useSettingsStore()
const homecontent = useHomeContentStore()

const {bookingsPerAccount} = storeToRefs(records)
const {bookingsPerPage} = storeToRefs(settings)
const {_search} = storeToRefs(homecontent)

homecontent.setSteady({
  bookingHeaders: tm('appPage.headers').map((item: IHeader): IHeader => {
    return {
      title: rt(item.title),
      align: rt(item.align),
      sortable: item.sortable,
      key: rt(item.key)
    }
  }),
  searchLabel: t('appPage.search'),
  itemsPerPageText: t('appPage.itemsPerPageText'),
  noDataText: t('appPage.noDataText'),
  dotMenuItems: tm('appPage.menuItems')
})

console.log('--- HomeContent.vue setup ---')
</script>

<template>
  <v-text-field
    v-model="_search"
    density="compact"
    hide-details
    prepend-inner-icon="$magnify"
    single-line
    v-bind:label="homecontent.steady.searchLabel"
    variant="outlined"
  ></v-text-field>
  <v-data-table
    density="compact"
    item-key="cID"
    v-bind:headers="homecontent.steady.bookingHeaders"
    v-bind:hide-no-data="false"
    v-bind:hover="true"
    v-bind:items="bookingsPerAccount as readonly IBooking[]"
    v-bind:items-per-page="bookingsPerPage"
    v-bind:items-per-page-options="CONS.SETTINGS.ITEMS_PER_PAGE_OPTIONS"
    v-bind:items-per-page-text="homecontent.steady.itemsPerPageText"
    v-bind:no-data-text="homecontent.steady.noDataText"
    v-bind:search="_search"
    v-on:update:items-per-page="(count) => { settings.setBookingsPerPage(count) }">
    <template v-slot:[`item`]="{ item }">
      <tr class="table-row">
        <td>
          <OptionMenu
            v-bind:menuItems="homecontent.steady.dotMenuItems"
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

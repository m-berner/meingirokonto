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
    v-bind:label="t('appPage.search')"
    variant="outlined"
  ></v-text-field>
  <v-data-table
    v-if="runtime.lazyLoadBookingTable"
    density="compact"
    item-key="cID"
    v-bind:headers="tableHeaders"
    v-bind:hide-no-data="false"
    v-bind:hover="true"
    v-bind:items="(): IBooking[] => records.getBookingsPerAccount()"
    v-bind:items-per-page="settings.bookingsPerPage"
    v-bind:items-per-page-options="CONS.SETTINGS.ITEMS_PER_PAGE_OPTIONS"
    v-bind:items-per-page-text="t('appPage.itemsPerPageText')"
    v-bind:no-data-text="t('appPage.noDataText')"
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
const runtime = useRuntimeStore()

const state = reactive({
  search: '',
})
const tableHeaders = tm('appPage.headers').map((item: IHeader): IHeader => {
  return {
    title: rt(item.title),
    align: rt(item.align),
    sortable: item.sortable,
    key: rt(item.key)
  }
})
const options: Record<string, string>[] = tm('appPage.menuItems')

console.log('--- HomePage.vue setup ---')
</script>

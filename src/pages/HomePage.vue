<!--
  -- This Source Code Form is subject to the terms of the Mozilla Public
  -- License, v. 2.0. If a copy of the MPL was not distributed with this file,
  -- you could obtain one at https://mozilla.org/MPL/2.0/.
  --
  -- Copyright (c) 2014-2025, Martin Berner, meingirokonto@gmx.de. All rights reserved.
  -->
<template>
  <v-text-field
    v-model="search"
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
    v-bind:items="records.booking.all as IBooking[]"
    v-bind:items-per-page="settings.itemsPerPageTransfers"
    v-bind:items-per-page-options="CONS.SETTINGS.ITEMS_PER_PAGE_OPTIONS"
    v-bind:items-per-page-text="t('transfersTable.itemsPerPageText')"
    v-bind:no-data-text="t('transfersTable.noDataText')"
    v-bind:search="search"
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
        <td>{{ d(new Date(item.cDate), 'short', 'de-DE') }}</td>
        <td>{{ n(item.cDebit, 'currency') }}</td>
        <td>{{ n(item.cCredit, 'currency') }}</td>
        <td>{{ item.cDescription }}</td>
        <td>{{ item.cAccountID }}</td>
        <td>{{ item.cAccountTypeID }}</td>
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
// const onMessageStocksTable = async (ev: MessageEvent): Promise<void> => {
//   console.info('STOCKSTABLE: onMessageStocksTable', ev)
//   if (ev.data === undefined) {
//     notice(['Sorry, no data arrived'])
//   } else {
//     if (ev.type === CONS.FETCH_API.ANSWER__MIN_RATE_MAX) {
//       runtime.setIsStocksLoading(false)
//       records.updatePage(ev.data)
//       records.setDrawerDepot()
//     } else if (ev.type === CONS.FETCH_API.ANSWER__DATES_DATA && ev.data.length > 0 && !runtime.isImportDb) {
//       for (let i = 0; i < ev.data.length; i++) {
//         const index = records._getAccountIndexById(ev.data[i].key)
//         records.setDates(index, ev.data[i].value)
//       }
//       await records.storeIntoDatabase('update')
//     }
//   }
// }
// if (!browser.runtime.onMessage.hasListener(onMessageStocksTable)) {
//   // noinspection JSDeprecatedSymbols
//   browser.runtime.onMessage.addListener(onMessageStocksTable)
// }
import OptionMenu from '@/components/OptionMenu.vue'
import {useI18n} from 'vue-i18n'
import {ref, watchEffect} from 'vue'
import {useRecordsStore} from '@/stores/records'
import {useSettingsStore} from '@/stores/settings'
import {useApp} from '@/composables/useApp'
import {useRuntimeStore} from '@/stores/runtime'

const {d, n, rt, t, tm} = useI18n()
const {CONS} = useApp()
const records = useRecordsStore()
const settings = useSettingsStore()
const runtime = useRuntimeStore()

const search = ref('')
const headers = tm('bookingTable.headers')
const tableHeaders = headers.map((item: { title: string, align: string, sortable: boolean, key: string }) => {
  return {
    title: rt(item.title),
    align: rt(item.align) as 'start' | 'center' | 'end' | undefined,
    sortable: item.sortable,
    key: rt(item.key)
  }
})
const options: Record<string, string>[] = tm('transfersTable.menuItems')
// const onUpdatePageHandler = async (p: number): Promise<void> => {
//  console.info('STOCKSTABLE: onUpdatePageHandler', p)
//  records.setActiveStocksPage(p)
//  await records.updateWrapper()
//}

watchEffect(
  () => {
    console.error("EW-----------")
    if (runtime.isAddAccount === true) {
      console.error("E-W-------")
    }
  }
)

console.log('--- HomePage.vue setup ---')
</script>

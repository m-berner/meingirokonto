/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * you could obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2014-2025, Martin Berner, stockmanager@gmx.de. All rights reserved.
 */
import {defineStore, type StoreDefinition} from 'pinia'
import {useRecordsStore} from '@/stores/records'
import {useSettingsStore} from '@/stores/settings'

interface ITitleBarStore {
  _title: string
  _logo: string
  _bookings_sum: number
  _bookings_sum_formatted: string
  _bookings_sum_label: string
  //_active_account_id: number
  //_accounts: IAccount[]
}

export const useTitleBarStore: StoreDefinition<'titlebar', ITitleBarStore> = defineStore('titlebar', {
  state: (): ITitleBarStore => {
    return {
      _title: '',
      _logo: 'https://cdn.brandfetch.io/brandfetch.com/w/48/h/48?c=1idV74s2UaSDMRIQg-7',
      _bookings_sum: 0,
      _bookings_sum_formatted: '',
      _bookings_sum_label: '',
      //_active_account_id: -1,
      //_accounts: []
    }
  },
  getters: {
    logo(state: ITitleBarStore) {
      return state._logo
    },
    title(state: ITitleBarStore) {
      return state._title
    },
    // activeAccountId(state: ITitleBarStore) {
    //   return state._active_account_id
    // },
    bookingsSumLabel(state: ITitleBarStore) {
      return state._bookings_sum_label
    },
    bookingsSumFormatted(state: ITitleBarStore) {
      return state._bookings_sum_formatted
    }
  },
  actions: {
    setLogo(){
      const records = useRecordsStore()
      const settings = useSettingsStore()
      if (settings.activeAccountId > -1) {
        this._logo = records.accounts.all[records.getAccountIndexById(settings.activeAccountId)].cLogoUrl
      }
    },
    setTitle(value: string) {
      this._title = value
    },
    // setActiveAccountId(value: number) {
    //   this._active_account_id = value
    // },
    setBookingsSumLabel(value: string) {
      this._bookings_sum_label = value
    },
    setBookingsSumFormatted(value: string) {
      this._bookings_sum_formatted = value
    },
    // v-bind:src="records.accounts.all[records.getAccountIndexById(_active_account_id)].cLogoUrl">
  }
})

console.log('--- STORE privacypage.js ---')

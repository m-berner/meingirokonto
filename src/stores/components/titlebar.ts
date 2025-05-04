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
  _logo: string
  _bookings_sum: number
  _bookings_sum_label: string
}

export const useTitleBarStore: StoreDefinition<'titlebar', ITitleBarStore> = defineStore('titlebar', {
  state: (): ITitleBarStore => {
    return {
      _logo: 'https://cdn.brandfetch.io/brandfetch.com/w/48/h/48?c=1idV74s2UaSDMRIQg-7',
      _bookings_sum: 0,
      _bookings_sum_label: ''
    }
  },
  getters: {
    logo(state: ITitleBarStore) {
      return state._logo
    },
    bookingsSumLabel(state: ITitleBarStore) {
      return state._bookings_sum_label
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
    setBookingsSumLabel(value: string) {
      this._bookings_sum_label = value
    },
    updateTitlebar() {
      const records = useRecordsStore()
      const settings = useSettingsStore()
      records.sumBookings()
      this.setLogo()
      return new Promise(async (resolve) => {
        await browser.storage.local.set({
          sActiveAccountId: settings.activeAccountId
        })
        resolve(null)
      })
    }
  }
})

console.log('--- STORE privacypage.js ---')

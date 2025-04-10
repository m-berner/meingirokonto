/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * you could obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2014-2025, Martin Berner, meingirokonto@gmx.de. All rights reserved.
 */
import {defineStore, type StoreDefinition} from 'pinia'
import {type ThemeInstance} from 'vuetify'
import {CONS} from '@/pages/background'

interface ISettingsStore {
  _skin: string
  _bookings_per_page: number
}


export const useSettingsStore: StoreDefinition<'settings', ISettingsStore> = defineStore('settings', {
  state: (): ISettingsStore => {
    return {
      _skin: CONS.DEFAULTS.STORAGE.SKIN,
      _bookings_per_page: CONS.DEFAULTS.STORAGE.BOOKINGS_PER_PAGE
    }
  },
  getters: {
    skin(state: ISettingsStore) {
      return state._skin
    },
    bookingsPerPage(state: ISettingsStore) {
      return state._bookings_per_page
    }
  },
  actions: {
    // async setSkin(value: string, theme?: ThemeInstance): Promise<void> {
    //   console.log(theme)
    //   this._skin = value
    //   await browser.storage.local.set({sSkin: value})
    // },
    async storageIntoStore(theme: ThemeInstance): Promise<void> {
      console.log('SETTINGS: storageIntoStore')
      const response: IStorageLocal = await browser.storage.local.get()
      theme.global.name.value = response.sSkin ?? CONS.DEFAULTS.STORAGE.SKIN
      this._skin = response.sSkin ?? CONS.DEFAULTS.STORAGE.SKIN
      this._bookings_per_page = response.sBookingsPerPage ?? CONS.DEFAULTS.STORAGE.BOOKINGS_PER_PAGE
    }
  }
})

console.log('--- STORE settings.js ---')

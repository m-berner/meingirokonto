/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * you could obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2014-2025, Martin Berner, meingirokonto@gmx.de. All rights reserved.
 */
import {defineStore, type StoreDefinition} from 'pinia'
import {type ThemeInstance} from 'vuetify'
import {useApp} from '@/pages/background'

interface ISettingsStore {
  _skin: string
  _bookings_per_page: number
  _active_account_id: number
  _debug: boolean
}

const {CONS, log} = useApp()

export const useSettingsStore: StoreDefinition<'settings', ISettingsStore> = defineStore('settings', {
  state: (): ISettingsStore => {
    return {
      _skin: CONS.DEFAULTS.STORAGE.SKIN,
      _bookings_per_page: CONS.DEFAULTS.STORAGE.BOOKINGS_PER_PAGE,
      _active_account_id: -1,
      _debug: false
    }
  },
  getters: {
    activeAccountId(state: ISettingsStore) {
      return state._active_account_id
    },
    bookingsPerPage(state: ISettingsStore) {
      return state._bookings_per_page
    },
    skin(state: ISettingsStore) {
      return state._skin
    }
  },
  actions: {
    setActiveAccountId(value: number): void {
      this._active_account_id = value
    },
    setBookingsPerPage(value: number): void {
      this._bookings_per_page = value
    },
    initSettingsStore(theme: ThemeInstance, settings: ISettings): void {
      log('SETTINGS: initSettingsStore')
      theme.global.name.value = settings.skin
      this._skin = settings.skin
      this._bookings_per_page = settings.bookingsPerPage
      this._active_account_id = settings.activeAccountId
      this._debug = settings.debug
    }
  }
})

log('--- STORE settings.js ---')

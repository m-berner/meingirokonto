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
import {useRecordsStore} from '@/stores/records'

interface ISettingsStore {
  _skin: string
  _bookings_per_page: number
  _active_account_id: number
  _logo: string
  _debug: boolean
}

const {CONS} = useApp()

export const useSettingsStore: StoreDefinition<'settings', ISettingsStore> = defineStore('settings', {
  state: (): ISettingsStore => {
    return {
      _skin: CONS.DEFAULTS.STORAGE.SKIN,
      _bookings_per_page: CONS.DEFAULTS.STORAGE.BOOKINGS_PER_PAGE,
      _active_account_id: -1,
      _logo: 'DefaultSvg',
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
    logo(state: ISettingsStore) {
      return state._logo
    },
    skin(state: ISettingsStore) {
      return state._skin
    }
  },
  actions: {
    setActiveAccountId(value: number): void {
      this._active_account_id = value
    },
    setLogo(value: string): void {
      this._logo = value
    },
    initSettingsStore(theme: ThemeInstance, settings: ISettings): void {
      console.info('SETTINGS: initSettingsStore', settings)
      theme.global.name.value = settings.skin
      this._skin = settings.skin
      this._bookings_per_page = settings.bookingsPerPage
      this._active_account_id = settings.activeAccountId
      this._logo = settings.logo
      this._debug = settings.debug
    },
    onUpdateAccount(value: number): Promise<void> {
      console.info('SETTINGS: onUpdateAccount', value)
      const records = useRecordsStore()
      return new Promise(async (resolve) => {
        const accountIndex = records.getAccountIndexById(value)
        const lName = records.accounts.all[accountIndex].cSwift.substring(0, 4)
        this._active_account_id = value
        this._logo = lName[0].toUpperCase() + lName.toLowerCase().slice(1) + 'Svg'
        await browser.storage.local.set({sLogo: lName[0].toUpperCase() + lName.toLowerCase().slice(1) + 'Svg'})
        await browser.storage.local.set({sActiveAccountId: value})
        resolve()
      })
    }
  }
})

console.log('--- STORE settings.js ---')

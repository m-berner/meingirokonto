/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * you could obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2014-2025, Martin Berner, kontenmanager@gmx.de. All rights reserved.
 */
import {defineStore, type StoreDefinition} from 'pinia'
import {type ThemeInstance} from 'vuetify'
import {useApp} from '@/pages/background'

interface ISettingsStore {
  _skin: string
  _bookings_per_page: number
  _stocks_per_page: number
  _active_account_id: number
  _debug: boolean
  _partner: boolean
  _service: string
  _materials: string[]
  _markets: string[]
  _indexes: string[]
  _exchanges: string[]
}

const {CONS, log} = useApp()

export const useSettingsStore: StoreDefinition<'settings', ISettingsStore> = defineStore('settings', {
  state: (): ISettingsStore => {
    return {
      _skin: CONS.DEFAULTS.STORAGE.SKIN,
      _bookings_per_page: CONS.DEFAULTS.STORAGE.BOOKINGS_PER_PAGE,
      _stocks_per_page: CONS.DEFAULTS.STORAGE.STOCKS_PER_PAGE,
      _active_account_id: -1,
      _debug: false,
      _partner: false,
      _service: CONS.DEFAULTS.STORAGE.SERVICE,
      _materials: CONS.DEFAULTS.STORAGE.MATERIALS,
      _markets: CONS.DEFAULTS.STORAGE.MARKETS,
      _indexes: CONS.DEFAULTS.STORAGE.INDEXES,
      _exchanges: CONS.DEFAULTS.STORAGE.EXCHANGES
    }
  },
  getters: {
    activeAccountId(state: ISettingsStore) {
      return state._active_account_id
    },
    bookingsPerPage(state: ISettingsStore) {
      return state._bookings_per_page
    },
    stocksPerPage(state: ISettingsStore) {
      return state._stocks_per_page
    },
    skin(state: ISettingsStore) {
      return state._skin
    },
    debug(state: ISettingsStore) {
      return state._debug
    },
    partner(state: ISettingsStore) {
      return state._partner
    },
    service(state: ISettingsStore) {
      return state._service
    },
    materials(state: ISettingsStore) {
      return state._materials
    },
    markets(state: ISettingsStore) {
      return state._markets
    },
    indexes(state: ISettingsStore) {
      return state._indexes
    },
    exchanges(state: ISettingsStore) {
      return state._exchanges
    }
  },
  actions: {
    setActiveAccountId(value: number): void {
      this._active_account_id = value
    },
    setBookingsPerPage(value: number): void {
      this._bookings_per_page = value
    },
    setStocksPerPage(value: number): void {
      this._stocks_per_page = value
    },
    setSkin(value: string): void {
      this._skin = value
    },
    setDebug(value: boolean): void {
      this._debug = value
    },
    setPartner(value: boolean): void {
      this._partner = value
    },
    setService(value: string): void {
      this._service = value
    },
    setMaterials(value: string[]): void {
      this._materials = value
    },
    setMarkets(value: string[]): void {
      this._markets = value
    },
    setIndexes(value: string[]): void {
      this._indexes = value
    },
    setExchanges(value: string[]): void {
      this._exchanges = value
    },
    initSettingsStore(theme: ThemeInstance, settings: ISettings): void {
      log('SETTINGS: initSettingsStore')
      theme.global.name.value = settings.skin
      this._skin = settings.skin
      this._bookings_per_page = settings.bookingsPerPage
      this._stocks_per_page = settings.stocksPerPage
      this._active_account_id = settings.activeAccountId
      this._debug = settings.debug
      this._partner = settings.partner
      this._service = settings.service
      this._materials = settings.materials
      this._markets = settings.markets
      this._indexes = settings.indexes
      this._exchanges = settings.exchanges
    }
  }
})

log('--- STORE settings.js ---')

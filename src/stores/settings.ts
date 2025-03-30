/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * you could obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2014-2025, Martin Berner, meingirokonto@gmx.de. All rights reserved.
 */
import {defineStore, type StoreDefinition} from 'pinia'
import {type ThemeInstance} from 'vuetify'
import {useApp} from '@/composables/useApp'

interface ISettingsStore {
  _skin: string
  _accountIndex: number
  _items_per_page_transfers: number
  _items_per_page_stocks: number
}

const {CONS} = useApp()

export const useSettingsStore: StoreDefinition<'settings', ISettingsStore> = defineStore('settings', {
  state: (): ISettingsStore => {
    return {
      _skin: CONS.DEFAULTS.STORAGE.skin,
      _accountIndex: -1,
      _items_per_page_transfers: CONS.DEFAULTS.STORAGE.items_per_page_transfers,
      _items_per_page_stocks: CONS.DEFAULTS.STORAGE.items_per_page_stocks
    }
  },
  getters: {
    skin(state: ISettingsStore) {
      return state._skin
    },
    account(state: ISettingsStore) {
      return state._accountIndex
    },
    itemsPerPageTransfers(state: ISettingsStore) {
      return state._items_per_page_transfers
    },
    itemsPerPageStocks(state: ISettingsStore) {
      return state._items_per_page_stocks
    }
  },
  actions: {
    async setSkin(value: string, theme: ThemeInstance): Promise<void> {
      theme.global.name.value = value // NOTE: change theme options instance
      this._skin = value
      await browser.storage.local.set({skin: value})
    },
    setSkinStoreOnly(value: string | undefined) {
      if (value === undefined) {
        this._skin = CONS.DEFAULTS.STORAGE.skin
      } else {
        this._skin = value
      }
    },
    setAccountIndexStoreOnly(value: number) {
      this._accountIndex = value
    },
    async setItemsPerPageTransfers(value: number): Promise<void> {
      this._items_per_page_transfers = value
      await browser.storage.local.set({itemsPerPageTransfers: value})
    },
    setItemsPerPageTransfersStoreOnly(value: number | undefined) {
      if (value === undefined) {
        this._items_per_page_stocks = CONS.DEFAULTS.STORAGE.items_per_page_transfers
      } else {
        this._items_per_page_stocks = value
      }
    },
    async setItemsPerPageStocks(value: number): Promise<void> {
      this._items_per_page_stocks = value
      await browser.storage.local.set({itemsPerPageStocks: value})
    },
    setItemsPerPageStocksStoreOnly(value: number | undefined) {
      if (value === undefined) {
        this._items_per_page_stocks = CONS.DEFAULTS.STORAGE.items_per_page_stocks
      } else {
        this._items_per_page_stocks = value
      }
    },
    async storageIntoStore(theme: ThemeInstance): Promise<void> {
      console.log('SETTINGS: storageIntoStore')
      const response: IStorageLocal = await browser.storage.local.get()
      theme.global.name.value = response.skin ?? 'ocean'
      this.setSkinStoreOnly(response.skin)
      this.setItemsPerPageStocksStoreOnly(response.items_per_page_stocks)
      this.setItemsPerPageTransfersStoreOnly(response.items_per_page_transfers)
    }
  }
})

console.log('--- settings.js ---')

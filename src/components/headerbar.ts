/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * you could obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2014-2025, Martin Berner, stockmanager@gmx.de. All rights reserved.
 */
import {defineStore, type StoreDefinition} from 'pinia'
import {useApp} from '@/pages/background'

interface IHeaderBarSteady {
  home: string
  addAccount: string
  deleteAccount: string
  addBooking: string
  addBookingType: string
  deleteBookingType: string
  exportDatabase: string
  importDatabase: string
  showAccounting: string
  settings: string
}

interface IHeaderBarStore {
  _steady: IHeaderBarSteady
}

const {log} = useApp()

export const useHeaderBarStore: StoreDefinition<'headerbar', IHeaderBarStore> = defineStore('headerbar', {
  state: (): IHeaderBarStore => {
    return {
      _steady: {
        home: '',
        addAccount: '',
        deleteAccount: '',
        addBooking: '',
        addBookingType: '',
        deleteBookingType: '',
        exportDatabase: '',
        importDatabase: '',
        showAccounting: '',
        settings: ''
      }
    }
  },
  getters: {
    steady(state: IHeaderBarStore) {
      return state._steady
    }
  },
  actions: {
    setSteady(value: IHeaderBarSteady) {
      this._steady.home = value.home
      this._steady.addAccount = value.addAccount
      this._steady.deleteAccount = value.deleteAccount
      this._steady.addBooking = value.addBooking
      this._steady.addBookingType = value.addBookingType
      this._steady.deleteBookingType = value.deleteBookingType
      this._steady.exportDatabase = value.exportDatabase
      this._steady.importDatabase = value.importDatabase
      this._steady.showAccounting = value.showAccounting
      this._steady.settings = value.settings
    }
  }
})

log('--- STORE headerbar.js ---')

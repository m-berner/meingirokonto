/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * you could obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2014-2025, Martin Berner, stockmanager@gmx.de. All rights reserved.
 */
import {defineStore, type StoreDefinition} from 'pinia'

interface IAddAccountSteady {
  swiftLabel: string
  accountNumberLabel: string
  logoLabel: string
}

interface IAddAccountStore {
  _swift: string
  _number: string
  _logoUrl: string
  _brandFetchName: string
  _steady: IAddAccountSteady
}

export const useAddAccountStore: StoreDefinition<'addaccount', IAddAccountStore> = defineStore('addaccount', {
  state: (): IAddAccountStore => {
    return {
      _swift: '',
      _number: '',
      _logoUrl: '',
      _brandFetchName: '',
      _steady: {
        swiftLabel: '',
        accountNumberLabel: '',
        logoLabel: ''
      }
    }
  },
  getters: {
    steady(state: IAddAccountStore) {
      return state._steady
    }
  },
  actions: {
    setSteady(value: IAddAccountSteady) {
      this._steady.swiftLabel = value.swiftLabel
      this._steady.accountNumberLabel = value.accountNumberLabel
      this._steady.logoLabel = value.logoLabel
    }
  }
})

console.log('--- STORE addaccount.js ---')

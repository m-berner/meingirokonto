/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * you could obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2014-2025, Martin Berner, stockmanager@gmx.de. All rights reserved.
 */
import {defineStore, type StoreDefinition} from 'pinia'
import {useApp} from '@/pages/background'

interface IDeleteAccountSteady {
  accountNumberLabel: string
}

interface IDeleteAccountStore {
  _selected: number
  _steady: IDeleteAccountSteady
}

const {log} = useApp()

export const useDeleteAccountStore: StoreDefinition<'deleteaccount', IDeleteAccountStore> = defineStore('deleteaccount', {
  state: (): IDeleteAccountStore => {
    return {
      _selected: -1,
      _steady: {
        accountNumberLabel: ''
      }
    }
  },
  getters: {
    steady(state: IDeleteAccountStore) {
      return state._steady
    }
  },
  actions: {
    setSteady(value: IDeleteAccountSteady) {
      this._steady.accountNumberLabel = value.accountNumberLabel
    }
  }
})

log('--- STORE deleteaccount.js ---')

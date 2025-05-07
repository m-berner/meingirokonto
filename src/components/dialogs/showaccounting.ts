/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * you could obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2014-2025, Martin Berner, stockmanager@gmx.de. All rights reserved.
 */
import {defineStore, type StoreDefinition} from 'pinia'

interface IShowAccountingStore {
  _result: Array<{title: string, subtitle: string}>
}

export const useShowAccountingStore: StoreDefinition<'showaccounting', IShowAccountingStore> = defineStore('showaccounting', {
  state: (): IShowAccountingStore => {
    return {
      _result: []
    }
  },
  getters: {
    getResult(state: IShowAccountingStore) {
      return state._result
    }
  },
  actions: {
    addEntryToResult(value: {title: string, subtitle: string}) {
      this._result.push(value)
    }
  }
})

console.log('--- STORE privacycontent.js ---')

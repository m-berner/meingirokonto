/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * you could obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2014-2025, Martin Berner, stockmanager@gmx.de. All rights reserved.
 */
import {defineStore, type StoreDefinition} from 'pinia'

interface IRuntimeStore {
  _booking_id: number
}

export const useRuntimeStore: StoreDefinition<'runtime', IRuntimeStore> = defineStore('runtime', {
  state: (): IRuntimeStore => {
    return {
      _booking_id: -1
    }
  },
  getters: {
    bookingId(state: IRuntimeStore) {
      return state._booking_id
    }
  },
  actions: {
    setBookingId(value: number) {
      this._booking_id = value
    }
  }
})

console.log('--- STORE runtime.js ---')

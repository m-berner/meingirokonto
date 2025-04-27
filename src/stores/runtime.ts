/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * you could obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2014-2025, Martin Berner, stockmanager@gmx.de. All rights reserved.
 */
import {defineStore, type StoreDefinition} from 'pinia'

interface ITelePort {
  dialogName: string
  showOkButton: boolean
  showHeaderDialog: boolean
  showOptionDialog: boolean
}

interface IRuntimeStore {
  _teleport: ITelePort
  _lazy_load_booking_table: boolean
  _lazy_load_title_bar: boolean
  _booking_id: number
}

export const useRuntimeStore: StoreDefinition<'runtime', IRuntimeStore> = defineStore('runtime', {
  state: (): IRuntimeStore => {
    return {
      _teleport: {
        dialogName: '',
        showOkButton: true,
        showHeaderDialog: false,
        showOptionDialog: false
      },
      _lazy_load_booking_table: false,
      _lazy_load_title_bar: false,
      _booking_id: -1
    }
  },
  getters: {
    bookingId(state: IRuntimeStore) {
      return state._booking_id
    },
    teleport(state: IRuntimeStore) {
      return state._teleport
    },
    lazyLoadBookingTable(state: IRuntimeStore) {
      return state._lazy_load_booking_table
    },
    lazyLoadTitleBar(state: IRuntimeStore) {
      return state._lazy_load_title_bar
    }
  },
  actions: {
    setBookingId(value: number) {
      this._booking_id = value
    },
    setTeleport(entry: ITelePort) {
      this._teleport = entry
    },
    setLazyLoadBookingTable(value: boolean) {
      this._lazy_load_booking_table = value
    },
    setLazyLoadTitleBar(value: boolean) {
      this._lazy_load_title_bar = value
    },
    resetTeleport(): void {
      this._teleport = {
        dialogName: '',
        showOkButton: true,
        showHeaderDialog: false,
        showOptionDialog: false
      }
    }
  }
})

console.log('--- STORE runtime.js ---')

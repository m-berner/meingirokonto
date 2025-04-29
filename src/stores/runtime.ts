/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * you could obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2014-2025, Martin Berner, stockmanager@gmx.de. All rights reserved.
 */
import {defineStore, type StoreDefinition} from 'pinia'

interface ITelePort {
  dialog_name: string
  show_ok_button: boolean
  show_header_dialog: boolean
  show_option_dialog: boolean
}

interface IRuntimeStore {
  _teleport: ITelePort
  _booking_id: number
}

export const useRuntimeStore: StoreDefinition<'runtime', IRuntimeStore> = defineStore('runtime', {
  state: (): IRuntimeStore => {
    return {
      _teleport: {
        dialog_name: '',
        show_ok_button: true,
        show_header_dialog: false,
        show_option_dialog: false
      },
      _booking_id: -1
    }
  },
  getters: {
    bookingId(state: IRuntimeStore) {
      return state._booking_id
    },
    teleport(state: IRuntimeStore) {
      return state._teleport
    }
  },
  actions: {
    setBookingId(value: number) {
      this._booking_id = value
    },
    setTeleport(entry: ITelePort) {
      this._teleport = entry
    },
    resetTeleport(): void {
      this._teleport = {
        dialog_name: '',
        show_ok_button: true,
        show_header_dialog: false,
        show_option_dialog: false
      }
    }
  }
})

console.log('--- STORE runtime.js ---')

/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * you could obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2014-2025, Martin Berner, stockmanager@gmx.de. All rights reserved.
 */
import {defineStore, type StoreDefinition} from 'pinia'
import {useApp} from '@/pages/background'
import {useRecordsStore} from '@/stores/records'
import {useSettingsStore} from '@/stores/settings'

interface ITelePort {
  dialog_name: string
  show_ok_button: boolean
  show_header_dialog: boolean
  show_option_dialog: boolean
}

interface IRuntimeStore {
  _booking_id: number
  _logo: string
  _teleport: {
    dialog_name: string
    show_ok_button: boolean
    show_header_dialog: boolean
    show_option_dialog: boolean
  }
}

const {CONS, log} = useApp()

export const useRuntimeStore: StoreDefinition<'runtime', IRuntimeStore> = defineStore('runtime', {
  state: (): IRuntimeStore => {
    return {
      _booking_id: -1,
      _logo: CONS.LOGOS.NO_LOGO,
      _teleport: {
        dialog_name: '',
        show_ok_button: true,
        show_header_dialog: false,
        show_option_dialog: false
      }
    }
  },
  getters: {
    bookingId(state: IRuntimeStore) {
      return state._booking_id
    },
    logo(state: IRuntimeStore) {
      return state._logo
    },
    teleport(state: IRuntimeStore) {
      return state._teleport
    }
  },
  actions: {
    setLogo() {
      const records = useRecordsStore()
      const settings = useSettingsStore()
      if (settings.activeAccountId > -1) {
        this._logo = records.accounts[records.getAccountIndexById(settings.activeAccountId)].cLogoUrl
      } else {
        this._logo = CONS.LOGOS.NO_LOGO
      }
    },
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

log('--- STORE runtime.js ---')

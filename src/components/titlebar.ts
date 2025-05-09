/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * you could obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2014-2025, Martin Berner, stockmanager@gmx.de. All rights reserved.
 */
import {defineStore, type StoreDefinition} from 'pinia'
import {useRecordsStore} from '@/stores/records'
import {useSettingsStore} from '@/stores/settings'
import {useApp} from '@/pages/background'

interface ITitleBarStore {
  _logo: string
  _bookings_sum: number
  _steady: {
    title: string
    bookings_sum_label: string
    account_label: string
  }
}

interface ITitleBarSteady {
  title: string
  bookings_sum_label: string
  account_label: string
}

const {CONS, log} = useApp()

export const useTitleBarStore: StoreDefinition<'titlebar', ITitleBarStore> = defineStore('titlebar', {
  state: (): ITitleBarStore => {
    return {
      _logo: CONS.LOGOS.NO_LOGO,
      _bookings_sum: 0,
      _steady: {
        title: '',
        bookings_sum_label: '',
        account_label: ''
      }
    }
  },
  getters: {
    logo(state: ITitleBarStore) {
      return state._logo
    },
    steady(state: ITitleBarStore) {
      return state._steady
    }
  },
  actions: {
    setLogo() {
      const records = useRecordsStore()
      const settings = useSettingsStore()
      if (settings.activeAccountId > -1) {
        this._logo = records.accounts.all[records.getAccountIndexById(settings.activeAccountId)].cLogoUrl
      }
    },
    setSteady(value: ITitleBarSteady) {
      this._steady = value
    },
    updateTitlebar() {
      const records = useRecordsStore()
      const settings = useSettingsStore()
      records.sumBookings()
      this.setLogo()
      return new Promise(async (resolve) => {
        await browser.storage.local.set({
          sActiveAccountId: settings.activeAccountId
        })
        resolve(null)
      })
    }
  }
})

log('--- STORE titlebar.js ---')

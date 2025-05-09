/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * you could obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2014-2025, Martin Berner, stockmanager@gmx.de. All rights reserved.
 */
import {defineStore, type StoreDefinition} from 'pinia'
import {useApp} from '@/pages/background'

interface IAddBookingTypeSteady {
  bookingTypeLabel: string,
}

interface IAddBookingTypeStore {
  _name: string
  _steady: IAddBookingTypeSteady
}

const {log} = useApp()

export const useAddBookingTypeStore: StoreDefinition<'addbookingtype', IAddBookingTypeStore> = defineStore('addbookingtype', {
  state: (): IAddBookingTypeStore => {
    return {
      _name: '',
      _steady: {
        bookingTypeLabel: ''
      }
    }
  },
  getters: {
    steady(state: IAddBookingTypeStore) {
      return state._steady
    }
  },
  actions: {
    setSteady(value: IAddBookingTypeSteady) {
      this._steady.bookingTypeLabel = value.bookingTypeLabel
    }
  }
})

log('--- STORE addbookingtype.js ---')

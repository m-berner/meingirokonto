/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * you could obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2014-2025, Martin Berner, stockmanager@gmx.de. All rights reserved.
 */
import {defineStore, type StoreDefinition} from 'pinia'

interface IAddBookingSteady {
  dateLabel: string
  creditLabel: string
  debitLabel: string
  descriptionLabel: string
  typeLabel: string
}

interface IAddBookingStore {
  _date: string
  _debit: number
  _credit: number
  _description: string
  _type: number
  _steady: IAddBookingSteady
}

export const useAddBookingStore: StoreDefinition<'addbooking', IAddBookingStore> = defineStore('addbooking', {
  state: (): IAddBookingStore => {
    return {
      _date: '',
      _debit: 0,
      _credit: 0,
      _description: '',
      _type: 0,
      _steady: {
        dateLabel: '',
        creditLabel: '',
        debitLabel: '',
        descriptionLabel: '',
        typeLabel: ''
      }
    }
  },
  getters: {
    steady(state: IAddBookingStore) {
      return state._steady
    }
  },
  actions: {
    setSteady(value: IAddBookingSteady) {
      this._steady.dateLabel = value.dateLabel
      this._steady.creditLabel = value.creditLabel
      this._steady.debitLabel = value.debitLabel
      this._steady.descriptionLabel = value.descriptionLabel
      this._steady.typeLabel = value.typeLabel
    }
  }
})

console.log('--- STORE addbooking.js ---')

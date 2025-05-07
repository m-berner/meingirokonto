/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * you could obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2014-2025, Martin Berner, stockmanager@gmx.de. All rights reserved.
 */
import {defineStore, type StoreDefinition} from 'pinia'


interface IDeleteBookingTypeSteady {
  label: string
}

interface IDeleteBookingTypeStore {
  _selected: number
  _steady: IDeleteBookingTypeSteady
}

export const useDeleteBookingTypeStore: StoreDefinition<'deletebookingtype', IDeleteBookingTypeStore> = defineStore('deletebookingtype', {
  state: (): IDeleteBookingTypeStore => {
    return {
      _selected: -1,
      _steady: {
        label: ''
      }
    }
  },
  getters: {
    steady(state: IDeleteBookingTypeStore) {
      return state._steady
    }
  },
  actions: {
    setSteady(value: IDeleteBookingTypeSteady) {
      this._steady.label = value.label
    }
  }
})

console.log('--- STORE deletebookingtype.js ---')

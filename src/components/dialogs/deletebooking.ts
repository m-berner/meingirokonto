/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * you could obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2014-2025, Martin Berner, stockmanager@gmx.de. All rights reserved.
 */
import {defineStore, type StoreDefinition} from 'pinia'
import {useApp} from '@/pages/background'

interface IDeleteBookingSteady {
  label: string
}

interface IDeleteBookingStore {
  _steady: IDeleteBookingSteady
}

const {log} = useApp()

export const useDeleteBookingStore: StoreDefinition<'deletebooking', IDeleteBookingStore> = defineStore('deletebooking', {
  state: (): IDeleteBookingStore => {
    return {
      _steady: {
        label: ''
      }
    }
  },
  getters: {
    steady(state: IDeleteBookingStore) {
      return state._steady
    }
  },
  actions: {
    setSteady(value: IDeleteBookingSteady) {
      this._steady.label = value.label
    }
  }
})

log('--- STORE deletebooking.js ---')

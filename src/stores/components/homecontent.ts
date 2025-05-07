/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * you could obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2014-2025, Martin Berner, stockmanager@gmx.de. All rights reserved.
 */
import {defineStore, type StoreDefinition} from 'pinia'

interface IHomeContentSteady {
  bookingsHeaders: {
    readonly key?:
      | (string & {})
      | 'data-table-group'
      | 'data-table-select'
      | 'data-table-expand'
      | undefined
    readonly title?: string | undefined
    readonly align?: 'end' | 'start' | 'center' | undefined
    readonly sortable?: boolean | undefined
  }[]
  searchLabel: string
  noDataText: string
  itemsPerPageText: string
  dotMenuItems: []
}

interface IHomeContentStore {
  _search: string
  _steady: IHomeContentSteady
}

export const useHomeContentStore: StoreDefinition<'homecontent', IHomeContentStore> = defineStore('homecontent', {
  state: (): IHomeContentStore => {
    return {
      _search: '',
      _steady: {
        bookingsHeaders: [],
        searchLabel: '',
        noDataText: '',
        itemsPerPageText: '',
        dotMenuItems: []
      }
    }
  },
  getters: {
    steady(state: IHomeContentStore) {
      return state._steady
    }
  },
  actions: {
    setSteady(value: IHomeContentSteady) {
      this._steady.bookingsHeaders = value.bookingsHeaders
      this._steady.searchLabel = value.searchLabel
      this._steady.noDataText = value.noDataText
      this._steady.itemsPerPageText = value.itemsPerPageText
      this._steady.dotMenuItems = value.dotMenuItems
    }
  }
})

console.log('--- STORE homecontent.js ---')

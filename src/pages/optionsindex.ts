/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * you could obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2014-2025, Martin Berner, kontenmanager@gmx.de. All rights reserved.
 */
import {defineStore, type StoreDefinition} from 'pinia'
import {useApp} from '@/pages/background'

interface IOptionsIndexSteady {
  tabs: string[]
  themeKeys: string[]
  themeNames: []
  serviceKeys: []
  indexes_a: []
  indexes_b: []
  materials_a: []
  materials_b: []
}

interface IOptionsIndexStore {
  _tab: number
  _service: string
  _skin: string
  _steady: IOptionsIndexSteady
}

const {log} = useApp()

export const useOptionsIndexStore: StoreDefinition<'optionsindex', IOptionsIndexStore> = defineStore('optionsindex', {
  state: (): IOptionsIndexStore => {
    return {
      _tab: 0,
      _skin: '',
      _service: '',
      _steady: {
        tabs: [],
        themeKeys: [],
        themeNames: [],
        serviceKeys: [],
        indexes_a: [],
        indexes_b: [],
        materials_a: [],
        materials_b: []
      }
    }
  },
  getters: {
    steady(state: IOptionsIndexStore) {
      return state._steady
    }
  },
  actions: {
    setSteady(value: IOptionsIndexSteady) {
      this._steady.tabs = value.tabs
      this._steady.themeNames = value.themeNames
      this._steady.themeKeys = value.themeKeys
      this._steady.serviceKeys = value.serviceKeys
      this._steady.indexes_a = value.indexes_a
      this._steady.indexes_b = value.indexes_b
      this._steady.materials_a = value.materials_a
      this._steady.materials_b = value.materials_b
    }
  }
})

log('--- STORE optionsindex.js ---')

/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * you could obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2014-2025, Martin Berner, meingirokonto@gmx.de. All rights reserved.
 */
import {defineStore, type StoreDefinition} from 'pinia'
import {useApp} from '@/pages/background'

interface IOptionsIndexSteady {
  tabs: string[]
  themeKeys: string[]
  themeNames: []
}

interface IOptionsIndexStore {
  _tab: number
  _skin: string
  _steady: IOptionsIndexSteady
}

const {log} = useApp()

export const useOptionsIndexStore: StoreDefinition<'optionsindex', IOptionsIndexStore> = defineStore('optionsindex', {
  state: (): IOptionsIndexStore => {
    return {
      _tab: 0,
      _skin: '',
      _steady: {
        tabs: [],
        themeKeys: [],
        themeNames: []
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
    }
  }
})

log('--- STORE optionsindex.js ---')

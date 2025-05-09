/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * you could obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2014-2025, Martin Berner, stockmanager@gmx.de. All rights reserved.
 */
import {defineStore, type StoreDefinition} from 'pinia'
import {useApp} from '@/pages/background'

interface IHelpPageStore {
  _steady: {
    titleBarTitle: string
    titleBar: Record<string, string>[]
    toolBarTitle: string
    toolBar: Record<string, string>[]
    dotMenuTitle: string
    dotMenu: Record<string, string>[]
    footerBarTitle: string
    footerBar: Record<string, string>[]
  }
}

interface IHelpPageSteady {
  titleBarTitle: string
  titleBar: Record<string, string>[]
  toolBarTitle: string
  toolBar: Record<string, string>[]
  dotMenuTitle: string
  dotMenu: Record<string, string>[]
  footerBarTitle: string
  footerBar: Record<string, string>[]
}

const {log} = useApp()

export const useHelpPageStore: StoreDefinition<'helppage', IHelpPageStore> = defineStore('helppage', {
  state: (): IHelpPageStore => {
    return {
      _steady: {
        titleBarTitle: '',
        titleBar: [],
        toolBarTitle: '',
        toolBar: [],
        dotMenuTitle: '',
        dotMenu: [],
        footerBarTitle: '',
        footerBar: []
      }
    }
  },
  getters: {
    steady(state: IHelpPageStore) {
      return state._steady
    }
  },
  actions: {
    setSteady(value: IHelpPageSteady) {
      this._steady.titleBarTitle = value.titleBarTitle
      this._steady.titleBar = value.titleBar
      this._steady.toolBarTitle = value.toolBarTitle
      this._steady.toolBar = value.toolBar
      this._steady.dotMenuTitle = value.dotMenuTitle
      this._steady.dotMenu = value.dotMenu
      this._steady.footerBarTitle = value.footerBarTitle
      this._steady.footerBar = value.footerBar
    }
  }
})

log('--- STORE helpcontent.js ---')

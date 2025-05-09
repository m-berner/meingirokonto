/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * you could obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2014-2025, Martin Berner, stockmanager@gmx.de. All rights reserved.
 */
import {defineStore, type StoreDefinition} from 'pinia'
import {useApp} from '@/pages/background'

interface IFooterBarSteady {
  help: string
  privacy: string
  mail: string
}

interface IFooterBarStore {
  _steady: IFooterBarSteady
}

const {log} = useApp()

export const useFooterBarStore: StoreDefinition<'footerbar', IFooterBarStore> = defineStore('footerbar', {
  state: (): IFooterBarStore => {
    return {
      _steady: {
        help: '',
        privacy: '',
        mail: ''
      }
    }
  },
  getters: {
    steady(state: IFooterBarStore) {
      return state._steady
    }
  },
  actions: {
    setSteady(value: IFooterBarSteady) {
      this._steady.help = value.help
      this._steady.privacy = value.privacy
      this._steady.mail = value.mail
    }
  }
})

log('--- STORE footerbar.js ---')

/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * you could obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2014-2025, Martin Berner, stockmanager@gmx.de. All rights reserved.
 */
import {defineStore, type StoreDefinition} from 'pinia'

interface IOptionMenuStore {
  _steady: {
    local: {
      title: string
      content: string
    }
    public: {
      title: string
      content: string
    }
    connections: {
      title: string
      content: string
    }
  }
}

interface IOptionMenuSteady {
  local: {
    title: string
    content: string
  }
  public: {
    title: string
    content: string
  }
  connections: {
    title: string
    content: string
  }
}

export const useOptionMenuStore: StoreDefinition<'optionmenu', IOptionMenuStore> = defineStore('optionmenu', {
  state: (): IOptionMenuStore => {
    return {
      _steady: {
        local: {
          title: '',
          content: ''
        },
        public: {
          title: '',
          content: ''
        },
        connections: {
          title: '',
          content: ''
        }
      }
    }
  },
  getters: {
    steady(state: IOptionMenuStore) {
      return state._steady
    }
  },
  actions: {
    setSteady(value: IOptionMenuSteady) {
      this._steady.local.title = value.local.title
      this._steady.local.content = value.local.content
      this._steady.public.title = value.public.title
      this._steady.public.content = value.public.content
      this._steady.connections.title = value.connections.title
      this._steady.connections.content = value.connections.content
    }
  }
})

console.log('--- STORE optionmenu.js ---')

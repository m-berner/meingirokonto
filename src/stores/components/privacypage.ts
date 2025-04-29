/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * you could obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2014-2025, Martin Berner, stockmanager@gmx.de. All rights reserved.
 */
import {defineStore, type StoreDefinition} from 'pinia'
import type {VueMessageType} from 'vue-i18n'

interface IPrivacyPageStore {
  _public: {
    title: string
    content: string
  }
  _connections: {
    title: string
    content: string
    data_list: Array<{id: VueMessageType, name:string}>
  }
}

export const usePrivacyPageStore: StoreDefinition<'privacypage', IPrivacyPageStore> = defineStore('privacypage', {
  state: (): IPrivacyPageStore => {
    return {
      _public: {
        title: '',
        content: ''
      },
      _connections: {
        title: '',
        content: '',
        data_list: []
      }
    }
  },
  getters: {
    publicTitle(state: IPrivacyPageStore) {
      return state._public.title
    },
    publicContent(state: IPrivacyPageStore) {
      return state._public.content
    },
    connectionsTitle(state: IPrivacyPageStore) {
      return state._connections.title
    },
    connectionsContent(state: IPrivacyPageStore) {
      return state._connections.content
    },
    connectionsDataList(state: IPrivacyPageStore) {
      return state._connections.data_list
    }
  },
  actions: {
    setStore(value: IPrivacyPageStore) {
      this._public.title = value._public.title
      this._public.content = value._public.content
      this._connections.title = value._connections.title
      this._connections.content = value._connections.content
      this._connections.data_list = value._connections.data_list
    }
  }
})

console.log('--- STORE privacypage.js ---')

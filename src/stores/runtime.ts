/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * you could obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2014-2025, Martin Berner, stockmanager@gmx.de. All rights reserved.
 */
import {defineStore, type StoreDefinition} from 'pinia'

type TTelePort = {
  dialogName: string
  childTitle: string
  childOk: null
  showOkButton: boolean
  showDialog: boolean
}

interface IRuntimeStore {
  _tele_port: TTelePort
}

export const useRuntimeStore: StoreDefinition<'runtime', IRuntimeStore> = defineStore('runtime', {
  state: (): IRuntimeStore => {
    return {
      _tele_port: {
        dialogName: '',
        childTitle: '',
        childOk: null,
        showOkButton: true,
        showDialog: false
      }
    }
  },
  getters: {
    teleport(state: IRuntimeStore) {
      return state._tele_port
    }
  },
  actions: {
    setTeleport(entry: TTelePort) {
      this._tele_port = entry
    },
    resetTeleport(): void {
      this._tele_port = {
        dialogName: '',
        childTitle: '',
        childOk: null,
        showOkButton: true,
        showDialog: false
      }
    }
  }
})

console.log('--- STORE runtime.js ---')

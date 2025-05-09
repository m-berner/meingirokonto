/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * you could obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2014-2025, Martin Berner, stockmanager@gmx.de. All rights reserved.
 */
import {defineStore, type StoreDefinition} from 'pinia'
import {useApp} from '@/pages/background'


interface IExportDatabaseSteady {
  fileName: string
}

interface IExportDatabaseStore {
  _steady: IExportDatabaseSteady
}

const {log} = useApp()

export const useExportDatabaseStore: StoreDefinition<'exportdatabase', IExportDatabaseStore> = defineStore('exportdatabase', {
  state: (): IExportDatabaseStore => {
    return {
      _steady: {
        fileName: ''
      }
    }
  },
  getters: {
    steady(state: IExportDatabaseStore) {
      return state._steady
    }
  },
  actions: {
    setSteady(value: IExportDatabaseSteady) {
      this._steady.fileName = value.fileName
    }
  }
})

log('--- STORE exportdatabase.js ---')

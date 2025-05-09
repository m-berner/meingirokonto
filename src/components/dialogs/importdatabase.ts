/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * you could obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2014-2025, Martin Berner, stockmanager@gmx.de. All rights reserved.
 */
import {defineStore, type StoreDefinition} from 'pinia'
import {useApp} from '@/pages/background'

interface IImportDatabaseSteady {
  label: string
}

interface IImportDatabaseStore {
  _choosen_file: Blob | null
  _steady: IImportDatabaseSteady
}

const {log} = useApp()

export const useImportDatabaseStore: StoreDefinition<'importdatabase', IImportDatabaseStore> = defineStore('importdatabase', {
  state: (): IImportDatabaseStore => {
    return {
      _choosen_file: null,
      _steady: {
        label: ''
      }
    }
  },
  getters: {
    steady(state: IImportDatabaseStore) {
      return state._steady
    }
  },
  actions: {
    setSteady(value: IImportDatabaseSteady) {
      this._steady.label = value.label
    }
  }
})

log('--- STORE importdatabase.js ---')

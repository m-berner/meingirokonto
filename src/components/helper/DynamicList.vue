<!--
  - This Source Code Form is subject to the terms of the Mozilla Public
  - License, v. 2.0. If a copy of the MPL was not distributed with this file,
  - you could obtain one at https://mozilla.org/MPL/2.0/.
  -
  - Copyright (c) 2014-2025, Martin Berner, kontenmanager@gmx.de. All rights reserved.
  -->
<script lang="ts" setup>
import {toRaw} from 'vue'
import {useApp} from '@/pages/background'

interface DynamicListProps {
  _title: string
  _list: Array<string | number | undefined>
  _label: string
  _tab: string
  _hint?: string
  _counter?: number
  _placeholder?: string
  _toUpperCase?: boolean
}

interface DynamicList extends DynamicListProps {
  _newItem: string
}

const {log} = useApp()
const _props = defineProps<DynamicListProps>()
const state: DynamicList = {..._props, _newItem: ''}
// NOTE:
// reading a v-text-field does work without reactivity
// to write to it reactivity is required
const localStorageProperty = `s${state._tab[0].toUpperCase()}${state._tab.slice(1)}`

const mAddItem = async (item: string): Promise<void> => {
  console.log('DYNAMICLIST: mAddItem')
  if (!state._list.includes(item)) {
    if (state._toUpperCase) {
      state._list.push(item.toUpperCase())
    } else {
      state._list.push(item)
    }
  }
  await browser.storage.local.set({[localStorageProperty]: toRaw(state._list)})
  state._newItem = ''
}
const mRemoveItem = async (n: number): Promise<void> => {
  console.log('DYNAMICLIST: mRemoveItem')
  if (n > 0) {
    state._list.splice(n, 1)
    await browser.storage.local.set({[localStorageProperty]: toRaw(state._list)})
  }
}

log('--- DynamicList.vue setup ---')
</script>

<template>
  <v-card v-bind:title="state._title" color="secondary">
    <v-list v-model="state._list" bg-color="secondary">
      <v-list-item
        v-for="(item, i) in state._list"
        v-bind:key="item"
        hide-details
        v-bind:title="item">
        <template v-slot:prepend>
          <v-btn
            class="mr-3"
            icon="$close"
            v-on:click="mRemoveItem(i)"></v-btn>
        </template>
      </v-list-item>
    </v-list>
    <v-card-actions>
      <v-text-field
        v-model="state._newItem"
        type="text"
        v-bind:autofocus="true"
        v-bind:clearable="true"
        v-bind:label="state._label"
        v-bind:placeholder="state._placeholder">
        <template v-slot:append>
          <v-btn
            class="ml-3"
            icon="$add"
            v-on:click="mAddItem(state._newItem)"></v-btn>
        </template>
      </v-text-field>
    </v-card-actions>
  </v-card>
</template>

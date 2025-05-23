<!--
  - This Source Code Form is subject to the terms of the Mozilla Public
  - License, v. 2.0. If a copy of the MPL was not distributed with this file,
  - you could obtain one at https://mozilla.org/MPL/2.0/.
  -
  - Copyright (c) 2014-2025, Martin Berner, kontenmanager@gmx.de. All rights reserved.
  -->
<script lang="ts" setup>
import {toRaw} from 'vue'
import {useAppApi} from '@/pages/background'

interface DynamicListProps {
  _title: string
  _list: Array<string | number | undefined>
  _label: string
  _tab: string
  _hint?: string
  _counter?: number
  _placeholder?: string
  _toUpperCase?: boolean
  _port?: browser.runtime.Port
}

interface IState {
  _newItem: string
  _list: Array<string | number | undefined>
}

const {CONS, log, notice} = useAppApi()
const _props = defineProps<DynamicListProps>()
const state: IState = {
  _newItem: '',
  _list: _props._list
}
let messageType: number
// NOTE:
// reading a v-text-field does work without reactivity
// to write to it only with reactivity
if (_props._tab === CONS.SETTINGS.MARKETS_TAB) {
  messageType = CONS.MESSAGES.OPTIONS__SET_MARKETS
} else {
  messageType = CONS.MESSAGES.OPTIONS__SET_EXCHANGES
}

const mAddItem = async (item: string): Promise<void> => {
  log('DYNAMICLIST: mAddItem')
  if (!state._list.includes(item)) {
    if (_props._toUpperCase) {
      state._list.push(item.toUpperCase())
    } else {
      state._list.push(item)
    }
  }
  if (_props._port !== undefined) {
    _props._port.postMessage({type: messageType, data: toRaw(state._list)})
    state._newItem = ''
  } else {
    await notice(['DynamicList', CONS.SYSTEM.ERRORS.PORT])
    console.error(CONS.SYSTEM.ERRORS.PORT)
  }
}
const mRemoveItem = async (n: number): Promise<void> => {
  log('DYNAMICLIST: mRemoveItem')
  if (n > 0) {
    if (_props._port !== undefined) {
      state._list.splice(n, 1)
      _props._port.postMessage({type: messageType, data: toRaw(state._list)})
    } else {
      await notice(['DynamicList', CONS.SYSTEM.ERRORS.PORT])
      console.error(CONS.SYSTEM.ERRORS.PORT)
    }
  }
}

log('--- DynamicList.vue setup ---')
</script>

<template>
  <v-card color="secondary" v-bind:title="_props._title">
    <v-list bg-color="secondary">
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
        v-bind:label="_props._label"
        v-bind:placeholder="_props._placeholder">
        <template v-slot:append>
          <v-btn class="ml-3"
                 color="primary"
                 icon="$add"
                 v-on:click="mAddItem(state._newItem)"></v-btn>
        </template>
      </v-text-field>
    </v-card-actions>
  </v-card>
</template>

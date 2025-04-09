<!--
  -- This Source Code Form is subject to the terms of the Mozilla Public
  -- License, v. 2.0. If a copy of the MPL was not distributed with this file,
  -- you could obtain one at https://mozilla.org/MPL/2.0/.
  --
  -- Copyright (c) 2014-2025, Martin Berner, meingirokonto@gmx.de. All rights reserved.
  -->
<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn
        icon="$dots"
        v-bind="props"
      ></v-btn>
    </template>
    <v-list>
      <v-hover v-slot:default="{ props, isHovering }">
        <v-list-item
          v-for="(item, i) in _props.menuItems" v-bind:id="setId(i)"
          v-bind:key="item.title"
          class="pointer"
          v-bind="props"
          v-bind:base-color="isHovering ? 'orange' : ''"
          v-bind:prepend-icon="rt(item.icon)"
          v-bind:title="rt(item.title)"
          v-on:click="selectOption(i)"
        ></v-list-item>
      </v-hover>
    </v-list>
  </v-menu>
</template>

<script lang="ts" setup>
//import {useRecordsStore} from '@/stores/records'
import {useI18n} from 'vue-i18n'
import {useRuntimeStore} from '@/stores/runtime'
import {CONS} from '@/pages/background'

const {rt} = useI18n()
//const records = useRecordsStore()
const runtime = useRuntimeStore()

interface PropsOptionMenu {
  recordID: number|undefined
  menuItems: Record<string, string>[]
}

const _props = defineProps<PropsOptionMenu>()

const selectOption = (optionIndex = -1): void => {
  console.info('OPTIONMENU selectOption', optionIndex)
    switch (optionIndex) {
      case 0:
        runtime.toggleVisibility(CONS.DIALOGS.DELETESTOCK)
        break
      case 1:
        runtime.toggleVisibility(CONS.DIALOGS.BUYSTOCK)
        break
      case 2:
        runtime.toggleVisibility(CONS.DIALOGS.SELLSTOCK)
        break
      case 3:
        runtime.toggleVisibility(CONS.DIALOGS.ADDDIVIDEND)
        break
      case 4:
        runtime.toggleVisibility(CONS.DIALOGS.SHOWDIVIDEND)
        break
      default:
        break

  }
}
const setId = (optionIndex = -1): string => {
  let resultId: string = ''
    switch (optionIndex) {
      case 0:
        resultId = CONS.DIALOGS.DELETE_BOOKING
        break
      case 1:
        resultId = CONS.DIALOGS.BUYSTOCK
        break
      default:
  }
  return resultId
}

console.log('--- OptionMenu.vue setup ---')
</script>

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
          v-on:click="onIconClick"
        ></v-list-item>
      </v-hover>
    </v-list>
  </v-menu>
  <DialogPort></DialogPort>
</template>

<script lang="ts" setup>
import {useI18n} from 'vue-i18n'
import DialogPort from '@/components/dialogs/DialogPort.vue'
import {CONS} from '@/pages/background'
import {COMPONENT_NAMES} from '@/pages/app'
import {useRuntimeStore} from '@/stores/runtime'

interface PropsOptionMenu {
  recordID: number | undefined
  menuItems: Record<string, string>[]
}

const _props = defineProps<PropsOptionMenu>()
const {rt} = useI18n()
const runtime = useRuntimeStore()

const setId = (optionIndex = -1): string => {
  let resultId: string = ''
  switch (optionIndex) {
    case 0:
      resultId = CONS.DIALOGS.ADD_ACCOUNT
      break
    case 1:
      resultId = CONS.DIALOGS.DELETE_ACCOUNT
      break
    default:
      break
  }
  return resultId
}

const onIconClick = async (ev: Event): Promise<void> => {
  console.info('OPTIONMENU: onIconClick', ev)
  const parse = async (elem: Element | null, loop = 0): Promise<void> => {
    if (loop > 6 || elem === null) return
    switch (elem!.id) {
      case CONS.DIALOGS.ADD_ACCOUNT:
        runtime.setTeleport({
          dialogName: COMPONENT_NAMES.ADD_ACCOUNT,
          childOk: runtime.teleport.childOk,
          childTitle: runtime.teleport.childTitle,
          showOkButton: true,
          showDialog: true
        })
        break
      case CONS.DIALOGS.DELETE_ACCOUNT:
        runtime.setTeleport({
          dialogName: COMPONENT_NAMES.DELETE_ACCOUNT,
          childOk: runtime.teleport.childOk,
          childTitle: runtime.teleport.childTitle,
          showOkButton: true,
          showDialog: true
        })
        break
      default:
    }
  }
  if (ev.target instanceof Element) {
    await parse(ev.target)
  }
}
// Buchung löschen Buchung korrigieren
console.log('--- OptionMenu.vue setup ---')
</script>

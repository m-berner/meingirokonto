<!--
  -- This Source Code Form is subject to the terms of the Mozilla Public
  -- License, v. 2.0. If a copy of the MPL was not distributed with this file,
  -- you could obtain one at https://mozilla.org/MPL/2.0/.
  --
  -- Copyright (c) 2014-2025, Martin Berner, meingirokonto@gmx.de. All rights reserved.
  -->
<template>
  <Teleport to="body">
    <v-dialog v-model="runtime.teleport.showDialog" v-bind:persistent="true" width="500">
      <v-card>
        <v-card-title class="text-center">
          {{ runtime.teleport.childTitle }}
        </v-card-title>
        <v-card-text class="pa-5">
          <component v-bind:is="runtime.teleport.dialogName" ref="dialog-ref"></component>
        </v-card-text>
        <v-card-actions class="pa-5">
          <v-tooltip location="bottom" v-bind:text="t('dialogs.ok')">
            <template v-slot:activator="{ props }">
              <v-btn
                v-if="runtime.teleport.showOkButton"
                class="ml-auto"
                icon="$check"
                type="submit"
                v-bind="props"
                variant="outlined"
                v-on:click="runtime.teleport.childOk"
              ></v-btn>
            </template>
          </v-tooltip>
          <v-spacer></v-spacer>
          <v-tooltip location="bottom" v-bind:text="t('dialogs.cancel')">
            <template v-slot:activator="{ props }">
              <v-btn
                class="ml-auto"
                icon="$close"
                v-bind="props"
                variant="outlined"
                v-on:click="runtime.resetTeleport"
              ></v-btn>
            </template>
          </v-tooltip>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </Teleport>
</template>

<script lang="ts" setup>
import {useI18n} from 'vue-i18n'
import {useTemplateRef, watchEffect} from 'vue'
import {useRuntimeStore} from '@/stores/runtime'

const {t} = useI18n()
const runtime = useRuntimeStore()
const dialogRef = useTemplateRef<{ ok: null, title: string }>('dialog-ref')

watchEffect(() => {
  console.info('DIALOG_PORT: watchEffect', dialogRef.value)
  if (dialogRef.value !== null && dialogRef.value!.title !== undefined) {
    runtime.setTeleport({
      dialogName: runtime.teleport.dialogName,
      childTitle: dialogRef.value!.title,
      childOk: dialogRef.value!.ok,
      showOkButton: runtime.teleport.showOkButton,
      showDialog: runtime.teleport.showDialog
    })
  }
})

console.log('--- DialogPort.vue setup ---')
</script>

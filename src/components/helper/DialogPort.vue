<!--
  - This Source Code Form is subject to the terms of the Mozilla Public
  - License, v. 2.0. If a copy of the MPL was not distributed with this file,
  - you could obtain one at https://mozilla.org/MPL/2.0/.
  -
  - Copyright (c) 2014-2025, Martin Berner, meingirokonto@gmx.de. All rights reserved.
  -->
<script lang="ts" setup>
import {useI18n} from 'vue-i18n'
import {useTemplateRef} from 'vue'
import {useDialogPortStore} from '@/components/helper/dialogport'

const {t} = useI18n()
const dialogRef = useTemplateRef<{ ok: null, title: string }>('dialog-ref')

const dialogport = useDialogPortStore()
</script>

<template>
  <Teleport to="body">
    <v-dialog v-bind:modelValue="dialogport.teleport.showHeaderDialog || dialogport.teleport.showOptionDialog" v-bind:persistent="true" width="500">
      <v-card>
        <v-card-title class="text-center">
          {{ dialogRef?.title }}
        </v-card-title>
        <v-card-text class="pa-5">
          <component v-bind:is="dialogport.teleport.dialogName" ref="dialog-ref"></component>
        </v-card-text>
        <v-card-actions class="pa-5">
          <v-tooltip location="bottom" v-bind:text="t('dialogs.ok')">
            <template v-slot:activator="{ props }">
              <v-btn
                v-if="dialogport.teleport.showOkButton"
                class="ml-auto"
                icon="$check"
                type="submit"
                v-bind="props"
                variant="outlined"
                v-on:click="dialogRef?.ok"
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
                v-on:click="dialogport.resetTeleport"
              ></v-btn>
            </template>
          </v-tooltip>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </Teleport>
</template>

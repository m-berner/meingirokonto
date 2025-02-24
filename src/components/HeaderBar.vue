<!--
  -- This Source Code Form is subject to the terms of the Mozilla Public
  -- License, v. 2.0. If a copy of the MPL was not distributed with this file,
  -- you could obtain one at https://mozilla.org/MPL/2.0/.
  --
  -- Copyright (c) 2014-2025, Martin Berner, meingirokonto@gmx.de. All rights reserved.
  -->
<template>
  <v-app-bar :flat="true" app v-bind:height="75">
    <v-spacer></v-spacer>
    <router-link class="router-link-active" to="/">
      <v-tooltip location="top" v-bind:text="t('headerBar.home')">
        <template v-slot:activator="{ props }">
          <v-app-bar-nav-icon
            icon="$home"
            size="large"
            v-bind="props"
            variant="tonal"
          ></v-app-bar-nav-icon>
        </template>
      </v-tooltip>
    </router-link>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-tooltip location="top" v-bind:text="t('headerBar.addAccount')">
      <template v-slot:activator="{ props }">
        <v-app-bar-nav-icon
          v-bind:id="CONS.DIALOGS.ADD_ACCOUNT"
          size="large"
          v-bind="props"
          variant="tonal"
          v-on:click="onIconClick">
          <v-icon icon="$addAccount"></v-icon>
        </v-app-bar-nav-icon>
      </template>
    </v-tooltip>
    <v-spacer></v-spacer>
    <v-tooltip location="top" v-bind:text="t('headerBar.addBookingType')">
      <template v-slot:activator="{ props }">
        <v-app-bar-nav-icon
          v-bind:id="CONS.DIALOGS.ADD_BOOKING_TYPE"
          size="large"
          v-bind="props"
          variant="tonal"
          v-on:click="onIconClick">
          <v-icon icon="$addBookingType"></v-icon>
        </v-app-bar-nav-icon>
      </template>
    </v-tooltip>
    <v-spacer></v-spacer>
    <v-tooltip location="top" v-bind:text="t('headerBar.addBooking')">
      <template v-slot:activator="{ props }">
        <v-app-bar-nav-icon
          v-bind:id="CONS.DIALOGS.ADD_BOOKING"
          size="large"
          v-bind="props"
          variant="tonal"
          v-on:click="onIconClick">
          <v-icon icon="$addBooking"></v-icon>
        </v-app-bar-nav-icon>
      </template>
    </v-tooltip>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-tooltip location="top" v-bind:text="t('headerBar.cashPlus')">
      <template v-slot:activator="{ props }">
        <v-app-bar-nav-icon
          v-bind:id="CONS.DIALOGS.ADDDEPOSIT"
          size="large"
          v-bind="props"
          variant="tonal"
          v-on:click="runtime.toggleVisibility"
        >
          <v-icon class="put-into-background" icon="$cashPlus"></v-icon
          >
        </v-app-bar-nav-icon>
      </template>
    </v-tooltip>
    <v-spacer></v-spacer>
    <v-tooltip location="top" v-bind:text="t('headerBar.cashMinus')">
      <template v-slot:activator="{ props }">
        <v-app-bar-nav-icon
          v-bind:id="CONS.DIALOGS.ADDWITHDRAWAL"
          size="large"
          v-bind="props"
          variant="tonal"
          v-on:click="runtime.toggleVisibility"
        >
          <v-icon class="put-into-background" icon="$cashMinus"></v-icon
          >
        </v-app-bar-nav-icon>
      </template>
    </v-tooltip>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-tooltip location="top" v-bind:text="t('headerBar.dailyChanges')">
      <template v-slot:activator="{ props }">
        <v-app-bar-nav-icon
          v-bind:id="CONS.DIALOGS.DAILYCHANGES"
          size="large"
          v-bind="props"
          variant="tonal"
          v-on:click="runtime.toggleVisibility"
        >
          <v-icon class="put-into-background" icon="$dailyChanges"></v-icon
          >
        </v-app-bar-nav-icon>
      </template>
    </v-tooltip>
    <v-spacer></v-spacer>
    <v-tooltip location="top" v-bind:text="t('headerBar.dailyChangesAll')">
      <template v-slot:activator="{ props }">
        <v-app-bar-nav-icon
          v-bind:id="CONS.DIALOGS.DAILYCHANGESALL"
          size="large"
          v-bind="props"
          variant="tonal"
          v-on:click="runtime.toggleVisibility"
        >
          <v-icon class="put-into-background" icon="$dailyChangesAll"></v-icon
          >
        </v-app-bar-nav-icon>
      </template>
    </v-tooltip>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-tooltip location="top" v-bind:text="t('headerBar.exportDatabase')">
      <template v-slot:activator="{ props }">
        <v-app-bar-nav-icon
          v-bind:id="CONS.DIALOGS.EXPORTDB"
          size="large"
          v-bind="props"
          variant="tonal"
          v-on:click="runtime.toggleVisibility"
        >
          <v-icon class="put-into-background" icon="$exportDatabase"></v-icon
          >
        </v-app-bar-nav-icon>
      </template>
    </v-tooltip>
    <v-spacer></v-spacer>
    <v-tooltip location="top" v-bind:text="t('headerBar.importDatabase')">
      <template v-slot:activator="{ props }">
        <v-app-bar-nav-icon
          v-bind:id="CONS.DIALOGS.IMPORTDB"
          size="large"
          v-bind="props"
          variant="tonal"
          v-on:click="runtime.toggleVisibility"
        >
          <v-icon class="put-into-background" icon="$importDatabase"></v-icon
          >
        </v-app-bar-nav-icon>
      </template>
    </v-tooltip>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-tooltip location="top" v-bind:text="t('headerBar.showAccounting')">
      <template v-slot:activator="{ props }">
        <v-app-bar-nav-icon
          v-bind:id="CONS.DIALOGS.SHOWACCOUNTING"
          size="large"
          v-bind="props"
          variant="tonal"
          v-on:click="runtime.toggleVisibility"
        >
          <v-icon class="put-into-background" icon="$showAccounting"></v-icon
          >
        </v-app-bar-nav-icon>
      </template>
    </v-tooltip>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-tooltip location="top" v-bind:text="t('headerBar.settings')">
      <template v-slot:activator="{ props }">
        <v-app-bar-nav-icon
          v-bind:id="CONS.DIALOGS.SETTING"
          icon="$settings"
          size="large"
          v-bind="props"
          variant="tonal"
          v-on:click="onIconClick"
        ></v-app-bar-nav-icon>
      </template>
    </v-tooltip>
    <v-spacer></v-spacer>
  </v-app-bar>
  <Teleport to="body">
    <v-dialog v-model="state.modal" v-bind:persistent="true" width="500">
      <v-card>
        <v-card-title class="text-center">
          {{ state.childTitle }}
        </v-card-title>
        <v-card-text class="pa-5">
          <component v-bind:is="state.childComponentName" ref="dialog-ref"></component>
        </v-card-text>
        <v-card-actions class="pa-5">
          <v-tooltip location="bottom" v-bind:text="t('dialogs.ok')">
            <template v-slot:activator="{ props }">
              <v-btn
                v-if="state.okButton"
                class="ml-auto"
                icon="$check"
                type="submit"
                v-bind="props"
                variant="outlined"
                v-on:click="state.childOk"
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
                v-on:click="resetState"
              ></v-btn>
            </template>
          </v-tooltip>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </Teleport>
</template>

<script lang="ts" setup>
import {COMPONENT_NAMES} from '@/app'
import {useRuntimeStore} from '@/stores/runtime'
// import {useRecordsStore} from '@/stores/records'
import {useI18n} from 'vue-i18n'
import {useApp} from '@/composables/useApp'
import {onUpdated, reactive, useTemplateRef} from 'vue'

const {t} = useI18n()
const {CONS} = useApp()
const runtime = useRuntimeStore()

const dialogRef = useTemplateRef<{ ok: null, title: string }>('dialog-ref')

const state = reactive({
  childComponentName: '',
  childTitle: '',
  childOk: null,
  okButton: true,
  modal: false
})
const resetState = () => {
  state.childComponentName = ''
  state.childTitle = ''
  state.childOk = null
  state.okButton = true
  state.modal = false
}
const onIconClick = async (ev: Event): Promise<void> => {
  console.info('HEADERBAR: onIconClick', ev)
  const parse = async (elem: Element | null, loop = 0): Promise<void> => {
    if (loop > 6 || elem === null) return
    switch (elem!.id) {
      case CONS.DIALOGS.ADD_ACCOUNT:
        state.childComponentName = COMPONENT_NAMES.ADD_ACCOUNT
        state.okButton = true
        state.modal = true
        break
      case CONS.DIALOGS.ADD_BOOKING_TYPE:
        state.childComponentName = COMPONENT_NAMES.ADD_BOOKING_TYPE
        state.okButton = true
        state.modal = true
        break
      case CONS.DIALOGS.ADD_BOOKING:
        state.childComponentName = COMPONENT_NAMES.ADD_BOOKING
        state.okButton = true
        state.modal = true
        break
      case CONS.DIALOGS.SETTING:
        await browser.runtime.openOptionsPage()
        break
      default:
        loop += 1
        await parse(elem!.parentElement, loop)
    }
  }
  if (ev.target instanceof Element) {
    await parse(ev.target)
  }
}

onUpdated(() => {
  if (dialogRef.value!.title !== undefined) {
    state.childTitle = dialogRef.value!.title
    state.childOk = dialogRef.value!.ok
  }
})

console.log('--- HeaderBar.vue setup ---')
</script>

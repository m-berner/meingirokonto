<!--
  - This Source Code Form is subject to the terms of the Mozilla Public
  - License, v. 2.0. If a copy of the MPL was not distributed with this file,
  - you could obtain one at https://mozilla.org/MPL/2.0/.
  -
  - Copyright (c) 2014-2025, Martin Berner, kontenmanager@gmx.de. All rights reserved.
  -->
<script lang="ts" setup>
import {useI18n} from 'vue-i18n'
import {useAppApi} from '@/pages/background'
import DialogPort from '@/components/helper/DialogPort.vue'
import {useRuntimeStore} from '@/stores/runtime'
import {useSettingsStore} from '@/stores/settings'

const {t} = useI18n()
const {CONS, log} = useAppApi()
const runtime = useRuntimeStore()
const settings = useSettingsStore()

const onIconClick = async (ev: Event): Promise<void> => {
  log('HEADERBAR: onIconClick')
  const parse = async (elem: Element | null, loop = 0): Promise<void> => {
    if (loop > 6 || elem === null) return
    switch (elem!.id) {
      case CONS.DIALOGS.ADD_ACCOUNT:
        runtime.setTeleport({
          dialogName: CONS.DIALOGS.ADD_ACCOUNT,
          showOkButton: true,
          showHeaderDialog: true,
          showOptionDialog: false
        })
        break
      case CONS.DIALOGS.DELETE_ACCOUNT:
        runtime.setTeleport({
          dialogName: CONS.DIALOGS.DELETE_ACCOUNT,
          showOkButton: true,
          showHeaderDialog: true,
          showOptionDialog: false
        })
        break
      case CONS.DIALOGS.ADD_BOOKING_TYPE:
        runtime.setTeleport({
          dialogName: CONS.DIALOGS.ADD_BOOKING_TYPE,
          showOkButton: true,
          showHeaderDialog: true,
          showOptionDialog: false
        })
        break
      case CONS.DIALOGS.DELETE_BOOKING_TYPE:
        runtime.setTeleport({
          dialogName: CONS.DIALOGS.DELETE_BOOKING_TYPE,
          showOkButton: true,
          showHeaderDialog: true,
          showOptionDialog: false
        })
        break
      case CONS.DIALOGS.ADD_BOOKING:
        runtime.setTeleport({
          dialogName: CONS.DIALOGS.ADD_BOOKING,
          showOkButton: settings.activeAccountId === 1,
          showHeaderDialog: true,
          showOptionDialog: false
        })
        break
      case CONS.DIALOGS.EXPORT_DATABASE:
        runtime.setTeleport({
          dialogName: CONS.DIALOGS.EXPORT_DATABASE,
          showOkButton: true,
          showHeaderDialog: true,
          showOptionDialog: false
        })
        break
      case CONS.DIALOGS.IMPORT_DATABASE:
        runtime.setTeleport({
          dialogName: CONS.DIALOGS.IMPORT_DATABASE,
          showOkButton: true,
          showHeaderDialog: true,
          showOptionDialog: false
        })
        break
      case CONS.DIALOGS.SHOW_ACCOUNTING:
        runtime.setTeleport({
          dialogName: CONS.DIALOGS.SHOW_ACCOUNTING,
          showOkButton: false,
          showHeaderDialog: true,
          showOptionDialog: false
        })
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

log('--- HeaderBar.vue setup ---')
</script>

<template>
  <v-app-bar app height="75" v-bind:flat="true">
    <v-spacer></v-spacer>
    <router-link class="router-link-active" to="/">
      <v-tooltip location="top" v-bind:text="t('headerBar.home')">
        <template v-slot:activator="{ props }">
          <v-app-bar-nav-icon
            icon="$home"
            size="large"
            v-bind="props"
            variant="tonal"></v-app-bar-nav-icon>
        </template>
      </v-tooltip>
    </router-link>
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
    <v-tooltip location="top" v-bind:text="t('headerBar.deleteAccount')">
      <template v-slot:activator="{ props }">
        <v-app-bar-nav-icon
          v-bind:id="CONS.DIALOGS.DELETE_ACCOUNT"
          size="large"
          v-bind="props"
          variant="tonal"
          v-on:click="onIconClick">
          <v-icon icon="$deleteAccount"></v-icon>
        </v-app-bar-nav-icon>
      </template>
    </v-tooltip>
    <v-spacer></v-spacer>
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
    <v-tooltip location="top" v-bind:text="t('headerBar.deleteBookingType')">
      <template v-slot:activator="{ props }">
        <v-app-bar-nav-icon
          v-bind:id="CONS.DIALOGS.DELETE_BOOKING_TYPE"
          size="large"
          v-bind="props"
          variant="tonal"
          v-on:click="onIconClick">
          <v-icon icon="$deleteBookingType"></v-icon>
        </v-app-bar-nav-icon>
      </template>
    </v-tooltip>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-tooltip location="top" v-bind:text="t('headerBar.exportDatabase')">
      <template v-slot:activator="{ props }">
        <v-app-bar-nav-icon
          v-bind:id="CONS.DIALOGS.EXPORT_DATABASE"
          size="large"
          v-bind="props"
          variant="tonal"
          v-on:click="onIconClick">
          <v-icon class="put-into-background" icon="$exportDatabase"></v-icon>
        </v-app-bar-nav-icon>
      </template>
    </v-tooltip>
    <v-spacer></v-spacer>
    <v-tooltip location="top" v-bind:text="t('headerBar.importDatabase')">
      <template v-slot:activator="{ props }">
        <v-app-bar-nav-icon
          v-bind:id="CONS.DIALOGS.IMPORT_DATABASE"
          size="large"
          v-bind="props"
          variant="tonal"
          v-on:click="onIconClick">
          <v-icon class="put-into-background" icon="$importDatabase"></v-icon>
        </v-app-bar-nav-icon>
      </template>
    </v-tooltip>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-tooltip location="top" v-bind:text="t('headerBar.showAccounting')">
      <template v-slot:activator="{ props }">
        <v-app-bar-nav-icon
          v-bind:id="CONS.DIALOGS.SHOW_ACCOUNTING"
          size="large"
          v-bind="props"
          variant="tonal"
          v-on:click="onIconClick">
          <v-icon class="put-into-background" icon="$showAccounting"></v-icon>
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
          v-on:click="onIconClick"></v-app-bar-nav-icon>
      </template>
    </v-tooltip>
    <v-spacer></v-spacer>
  </v-app-bar>
  <DialogPort v-if="runtime.teleport.showHeaderDialog"></DialogPort>
</template>

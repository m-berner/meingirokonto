<!--
  - This Source Code Form is subject to the terms of the Mozilla Public
  - License, v. 2.0. If a copy of the MPL was not distributed with this file,
  - you could obtain one at https://mozilla.org/MPL/2.0/.
  -
  - Copyright (c) 2014-2025, Martin Berner, meingirokonto@gmx.de. All rights reserved.
  -->
<script lang="ts" setup>
import {useI18n} from 'vue-i18n'
import {useApp} from '@/pages/background'
import DialogPort from '@/components/helper/DialogPort.vue'
import {useHeaderBarStore} from '@/components/headerbar'
import {useDialogPortStore} from '@/components/helper/dialogport'

const {t} = useI18n()
const {CONS} = useApp()
const headerbar = useHeaderBarStore()
const dialogport = useDialogPortStore()

const onIconClick = (ev: Event): Promise<void> => {
  console.info('HEADERBAR: onIconClick', ev)
  const parse = async (elem: Element | null, loop = 0): Promise<void> => {
    if (loop > 6 || elem === null) return
    switch (elem!.id) {
      case CONS.DIALOGS.ADD_ACCOUNT:
        dialogport.setTeleport({
          dialogName: CONS.DIALOGS.ADD_ACCOUNT,
          showOkButton: true,
          showHeaderDialog: true,
          showOptionDialog: false
        })
        break
      case CONS.DIALOGS.DELETE_ACCOUNT:
        dialogport.setTeleport({
          dialogName: CONS.DIALOGS.DELETE_ACCOUNT,
          showOkButton: true,
          showHeaderDialog: true,
          showOptionDialog: false
        })
        break
      case CONS.DIALOGS.ADD_BOOKING_TYPE:
        dialogport.setTeleport({
          dialogName: CONS.DIALOGS.ADD_BOOKING_TYPE,
          showOkButton: true,
          showHeaderDialog: true,
          showOptionDialog: false
        })
        break
      case CONS.DIALOGS.DELETE_BOOKING_TYPE:
        dialogport.setTeleport({
          dialogName: CONS.DIALOGS.DELETE_BOOKING_TYPE,
          showOkButton: true,
          showHeaderDialog: true,
          showOptionDialog: false
        })
        break
      case CONS.DIALOGS.ADD_BOOKING:
        dialogport.setTeleport({
          dialogName: CONS.DIALOGS.ADD_BOOKING,
          showOkButton: true,
          showHeaderDialog: true,
          showOptionDialog: false
        })
        break
      case CONS.DIALOGS.EXPORT_DATABASE:
        dialogport.setTeleport({
          dialogName: CONS.DIALOGS.EXPORT_DATABASE,
          showOkButton: true,
          showHeaderDialog: true,
          showOptionDialog: false
        })
        break
      case CONS.DIALOGS.IMPORT_DATABASE:
        dialogport.setTeleport({
          dialogName: CONS.DIALOGS.IMPORT_DATABASE,
          showOkButton: true,
          showHeaderDialog: true,
          showOptionDialog: false
        })
        break
      case CONS.DIALOGS.SHOW_ACCOUNTING:
        dialogport.setTeleport({
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
  return new Promise(async (resolve) => {
    if (ev.target instanceof Element) {
      await parse(ev.target)
      resolve()
    }
  })
}

headerbar.setSteady({
  home: t('headerBar.home'),
  addAccount: t('headerBar.addAccount'),
  deleteAccount: t('headerBar.deleteAccount'),
  addBooking: t('headerBar.addBooking'),
  addBookingType: t('headerBar.addBookingType'),
  deleteBookingType: t('headerBar.deleteBookingType'),
  exportDatabase: t('headerBar.exportDatabase'),
  importDatabase: t('headerBar.importDatabase'),
  showAccounting: t('headerBar.showAccounting'),
  settings: t('headerBar.settings')
})
console.log('--- HeaderBar.vue setup ---')
</script>

<template>
  <v-app-bar app height="75" v-bind:flat="true">
    <v-spacer></v-spacer>
    <router-link class="router-link-active" to="/">
      <v-tooltip location="top" v-bind:text="headerbar.steady.home">
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
    <v-tooltip location="top" v-bind:text="headerbar.steady.addAccount">
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
    <v-tooltip location="top" v-bind:text="headerbar.steady.deleteAccount">
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
    <v-tooltip location="top" v-bind:text="headerbar.steady.addBooking">
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
    <v-tooltip location="top" v-bind:text="headerbar.steady.addBookingType">
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
    <v-tooltip location="top" v-bind:text="headerbar.steady.deleteBookingType">
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
    <v-tooltip location="top" v-bind:text="headerbar.steady.exportDatabase">
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
    <v-tooltip location="top" v-bind:text="headerbar.steady.importDatabase">
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
    <v-tooltip location="top" v-bind:text="headerbar.steady.showAccounting">
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
    <v-tooltip location="top" v-bind:text="headerbar.steady.settings">
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
  <DialogPort v-if="dialogport.teleport.showHeaderDialog"></DialogPort>
</template>

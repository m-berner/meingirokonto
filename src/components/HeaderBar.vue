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
    <v-tooltip location="top" v-bind:text="t('headerBar.account')">
      <template v-slot:activator="{ props }">
        <v-app-bar-nav-icon
          v-bind:id="CONS.DIALOGS.ACCOUNT"
          size="large"
          v-bind="props"
          variant="tonal"
          v-on:click="onIconClick">
          <v-icon icon="$account"></v-icon>
        </v-app-bar-nav-icon>
      </template>
    </v-tooltip>
    <v-spacer></v-spacer>
    <v-tooltip location="top" v-bind:text="t('headerBar.bookingType')">
      <template v-slot:activator="{ props }">
        <v-app-bar-nav-icon
          v-bind:id="CONS.DIALOGS.BOOKING_TYPE"
          size="large"
          v-bind="props"
          variant="tonal"
          v-on:click="onIconClick">
          <v-icon icon="$bookingType"></v-icon>
        </v-app-bar-nav-icon>
      </template>
    </v-tooltip>
    <v-spacer></v-spacer>
    <v-tooltip location="top" v-bind:text="t('headerBar.booking')">
      <template v-slot:activator="{ props }">
        <v-app-bar-nav-icon
          v-bind:id="CONS.DIALOGS.BOOKING"
          size="large"
          v-bind="props"
          variant="tonal"
          v-on:click="onIconClick">
          <v-icon icon="$booking"></v-icon>
        </v-app-bar-nav-icon>
      </template>
    </v-tooltip>
    <v-spacer></v-spacer>
    <v-tooltip location="top" v-bind:text="t('headerBar.fadeinStock')">
      <template v-slot:activator="{ props }">
        <v-app-bar-nav-icon
          v-bind:id="CONS.DIALOGS.FADEINSTOCK"
          size="large"
          v-bind="props"
          variant="tonal"
          v-on:click="runtime.toggleVisibility"
        >
          <v-icon class="put-into-background" icon="$fadeinStock"></v-icon
          >
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
          {{ t('dialogs.booking.title') }}
        </v-card-title>
        <v-card-text class="pa-5">
          <ComboBooking v-if="state.booking"></ComboBooking>
          <EditBookingType v-if="state.bookingType"></EditBookingType>
          <ComboAccount v-if="state.account"></ComboAccount>
        </v-card-text>
        <v-card-actions class="pa-5">
          <v-tooltip location="bottom" v-bind:text="t('dialogs.ok')">
            <template v-slot:activator="{ props }">
              <v-btn
                v-if="runtime.isOk"
                class="ml-auto"
                icon="$check"
                type="submit"
                v-bind="props"
                variant="outlined"
                v-on:click="() => {}"
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
                v-on:click="state.modal = false; state.account = false; state.bookingType = false; state.booking = false; state.setting = false"
              ></v-btn>
            </template>
          </v-tooltip>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </Teleport>
</template>

<script lang="ts" setup>
import {useRuntimeStore} from '@/stores/runtime'
// import {useRecordsStore} from '@/stores/records'
import {useI18n} from 'vue-i18n'
import {useApp} from '@/composables/useApp'
import {reactive} from 'vue'
//import AddBooking from '@/components/dialogs/ComboBooking.vue'
import ComboBooking from '@/components/dialogs/ComboBooking.vue'
import EditBookingType from '@/components/dialogs/EditBookingType.vue'
import ComboAccount from '@/components/dialogs/ComboAccount.vue'

const {t} = useI18n()
const {CONS} = useApp()
const runtime = useRuntimeStore()
// const records = useRecordsStore()
// const state: IAccount = reactive({
//   cID: 0,
//   cName: '',
//   cNumber: '',
//   cCurrency: '',
//   cLogo: ''
// })
//
const state = reactive({
  modal: false,
  account: false,
  bookingType: false,
  booking: false,
  importDatabase: false,
  exportDatabase: false,
  accountancy: false,
  setting: false,
})
// const state: { booking: IBooking } = reactive({
//   booking: {
//     cID: 0,
//     cDate: 0,
//     cDebit: 0,
//     cCredit: 0,
//     cDescription: '',
//     cAccountID: 0,
//     cAccountTypeID: 0
//   }
// })
//
// const state: IBooking = reactive({
//   cID: 0,
//   cDate: 0,
//   cDebit: 0,
//   cCredit: 0,
//   cDescription: '',
//   cAccountID: 0,
//   cAccountTypeID: 0
// })
// const onToggleSettings = async (): Promise<void> => {
//   await browser.runtime.openOptionsPage()
// }

const onIconClick = async (ev: Event): Promise<void> => {
  console.info('HEADERBAR: onIconClick', ev)
  const parse = async (elem: Element | null, loop = 0): Promise<void> => {
    // console.info('HEADERBAR: onIconClick: parse', loop)
    if (loop > 6 || elem === null) return
    switch (elem!.id) {
      case CONS.DIALOGS.ACCOUNT:
        state.modal = true
        state.account = true
        break
      case CONS.DIALOGS.BOOKING_TYPE:
        state.modal = true
        state.bookingType = true
        break
      case CONS.DIALOGS.BOOKING:
        state.modal = true
        state.booking = true
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

console.log('--- HeaderBar.vue setup ---')
</script>

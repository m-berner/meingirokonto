/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * you could obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2014-2025, Martin Berner, meingirokonto@gmx.de. All rights reserved.
 */
import {createPinia} from 'pinia'
import {createRouter, createWebHashHistory} from 'vue-router'
import {createApp} from 'vue'
import 'vuetify/styles'
import {useApp} from '@/composables/useApp'
import HomePage from '@/components/HomePage.vue'
import AppIndex from '@/pages/AppIndex.vue'
import HelpPage from '@/components/HelpPage.vue'
import PrivacyPage from '@/components/PrivacyPage.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeaderBar from '@/components/HeaderBar.vue'
import FooterBar from '@/components/FooterBar.vue'
import AddAccount from '@/components/dialogs/AddAccount.vue'
import DeleteAccount from '@/components/dialogs/DeleteAccount.vue'
import AddBookingType from '@/components/dialogs/AddBookingType.vue'
import AddBooking from '@/components/dialogs/AddBooking.vue'
import ingd from '@/components/logos/ingd.vue'
import byla from '@/components/logos/byla.vue'
import nologo from '@/components/logos/nologo.vue'
import ImportDatabase from '@/components/dialogs/ImportDatabase.vue'
import ExportDatabase from '@/components/dialogs/ExportDatabase.vue'
import DeleteBookingType from '@/components/dialogs/DeleteBookingType.vue'

const {vuetify, i18n} = useApp()
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        default: HomePage,
        title: TitleBar,
        header: HeaderBar,
        footer: FooterBar
      }
    },
    {
      path: '/help',
      name: 'help',
      components: {
        default: HelpPage,
        title: TitleBar,
        header: HeaderBar,
        footer: FooterBar
      }
    },
    {
      path: '/privacy',
      name: 'privacy',
      components: {
        default: PrivacyPage,
        title: TitleBar,
        header: HeaderBar,
        footer: FooterBar
      }
    }
  ]
})
const pinia = createPinia()
const app = createApp(AppIndex)
app.config.errorHandler = (err: unknown) => {
  console.error(err)
}
app.config.warnHandler = (msg: string) => {
  console.warn(msg)
}
export const COMPONENT_NAMES = Object.freeze({
  ADD_ACCOUNT: 'AddAccount',
  DELETE_ACCOUNT: 'DeleteAccount',
  ADD_BOOKING: 'AddBooking',
  ADD_BOOKING_TYPE: 'AddBookingType',
  DELETE_BOOKING_TYPE: 'DeleteBookingType',
  EXPORT_DB: 'ExportDatabase',
  IMPORT_DB: 'ImportDatabase',
  NO_LOGO: 'Nologo',
  INGD: 'ingd',
  BYLA: 'byla'
})
// NOTE: register dynamic components globally
app.component(COMPONENT_NAMES.ADD_ACCOUNT, AddAccount)
app.component(COMPONENT_NAMES.DELETE_ACCOUNT, DeleteAccount)
app.component(COMPONENT_NAMES.ADD_BOOKING_TYPE, AddBookingType)
app.component(COMPONENT_NAMES.DELETE_BOOKING_TYPE, DeleteBookingType)
app.component(COMPONENT_NAMES.ADD_BOOKING, AddBooking)
app.component(COMPONENT_NAMES.EXPORT_DB, ExportDatabase)
app.component(COMPONENT_NAMES.IMPORT_DB, ImportDatabase)
app.component(COMPONENT_NAMES.NO_LOGO, nologo)
app.component(COMPONENT_NAMES.INGD, ingd)
app.component(COMPONENT_NAMES.BYLA, byla)
app.use(router)
app.use(vuetify)
app.use(i18n)
app.use(pinia)
app.mount('#app')

console.log('--- app.js ---')

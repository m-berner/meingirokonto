/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * you could obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2014-2025, Martin Berner, meingirokonto@gmx.de. All rights reserved.
 */
import {type ObjectPlugin} from 'vue'
import {CONS} from '@/pages/background'
import AddAccount from '@/components/dialogs/AddAccount.vue'
import DeleteAccount from '@/components/dialogs/DeleteAccount.vue'
import AddBookingType from '@/components/dialogs/AddBookingType.vue'
import DeleteBookingType from '@/components/dialogs/DeleteBookingType.vue'
import AddBooking from '@/components/dialogs/AddBooking.vue'
import ExportDatabase from '@/components/dialogs/ExportDatabase.vue'
import ImportDatabase from '@/components/dialogs/ImportDatabase.vue'
import nologo from '@/components/logos/nologo.vue'
import ingd from '@/components/logos/ingd.vue'
import byla from '@/components/logos/byla.vue'

export default <ObjectPlugin<[]>>{
  install: (app) => {
    app.component(CONS.DIALOGS.ADD_ACCOUNT, AddAccount)
    app.component(CONS.DIALOGS.DELETE_ACCOUNT, DeleteAccount)
    app.component(CONS.DIALOGS.ADD_BOOKING_TYPE, AddBookingType)
    app.component(CONS.DIALOGS.DELETE_BOOKING_TYPE, DeleteBookingType)
    app.component(CONS.DIALOGS.ADD_BOOKING, AddBooking)
    app.component(CONS.DIALOGS.EXPORT_DB, ExportDatabase)
    app.component(CONS.DIALOGS.IMPORT_DB, ImportDatabase)
    app.component(CONS.DIALOGS.NO_LOGO, nologo)
    app.component(CONS.DIALOGS.INGD, ingd)
    app.component(CONS.DIALOGS.BYLA, byla)
  }
}

console.log('--- PLUGINS components.js ---')

/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * you could obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2014-2025, Martin Berner, meingirokonto@gmx.de. All rights reserved.
 */
import {type ObjectPlugin} from 'vue'
import {useApp} from '@/pages/background'
import AddAccount from '@/components/dialogs/AddAccount.vue'
import DeleteAccount from '@/components/dialogs/DeleteAccount.vue'
import AddBookingType from '@/components/dialogs/AddBookingType.vue'
import DeleteBookingType from '@/components/dialogs/DeleteBookingType.vue'
import AddBooking from '@/components/dialogs/AddBooking.vue'
import ExportDatabase from '@/components/dialogs/ExportDatabase.vue'
import ImportDatabase from '@/components/dialogs/ImportDatabase.vue'
import ShowAccounting from '@/components/dialogs/ShowAccounting.vue'
import DefaultSvg from '@/components/logos/DefaultSvg.vue'
import IngdSvg from '@/components/logos/IngdSvg.vue'
import BylaSvg from '@/components/logos/BylaSvg.vue'

const {CONS} = useApp()

export default <ObjectPlugin<[]>>{
  install: (app) => {
    app.component(CONS.DIALOGS.ADD_ACCOUNT, AddAccount)
    app.component(CONS.DIALOGS.DELETE_ACCOUNT, DeleteAccount)
    app.component(CONS.DIALOGS.ADD_BOOKING_TYPE, AddBookingType)
    app.component(CONS.DIALOGS.DELETE_BOOKING_TYPE, DeleteBookingType)
    app.component(CONS.DIALOGS.ADD_BOOKING, AddBooking)
    app.component(CONS.DIALOGS.EXPORT_DATABASE, ExportDatabase)
    app.component(CONS.DIALOGS.IMPORT_DATABASE, ImportDatabase)
    app.component(CONS.DIALOGS.SHOW_ACCOUNTING, ShowAccounting)
    app.component(CONS.LOGOS.NO_LOGO, DefaultSvg)
    app.component(CONS.LOGOS.INGD, IngdSvg)
    app.component(CONS.LOGOS.BYLA, BylaSvg)
  }
}

console.log('--- PLUGINS components.js ---')

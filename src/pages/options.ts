/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * you could obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2014-2025, Martin Berner, meingirokonto@gmx.de. All rights reserved.
 */
import OptionsIndex from '@/pages/OptionsIndex.vue'
import {createApp} from 'vue'
import 'vuetify/styles'
import {useApp} from '@/composables/useApp'

const {vuetify, i18n} = useApp()
const op = createApp(OptionsIndex)
op.config.errorHandler = (err: unknown) => {
  console.error(err)
}
op.config.warnHandler = (msg: string) => {
  console.warn(msg)
}
op.use(vuetify)
op.use(i18n)
op.mount('#options')

console.log('--- options.js ---')

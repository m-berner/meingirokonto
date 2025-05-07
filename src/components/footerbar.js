/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * you could obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2014-2025, Martin Berner, meingirokonto@gmx.de. All rights reserved.
 */

import { defineStore } from 'pinia';
export const useFooterBarStore = defineStore('footerbar', {
    state: () => {
        return {
            _steady: {
                help: '',
                privacy: '',
                mail: ''
            }
        };
    },
    getters: {
        steady(state) {
            return state._steady;
        }
    },
    actions: {
        setSteady(value) {
            this._steady.help = value.help;
            this._steady.privacy = value.privacy;
            this._steady.mail = value.mail;
        }
    }
});
console.log('--- STORE footerbar.js ---');

/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * you could obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2014-2025, Martin Berner, meingirokonto@gmx.de. All rights reserved.
 */

import { defineStore } from 'pinia';
export const useHeaderBarStore = defineStore('headerbar', {
    state: () => {
        return {
            _steady: {
                home: '',
                addAccount: '',
                deleteAccount: '',
                addBooking: '',
                addBookingType: '',
                deleteBookingType: '',
                exportDatabase: '',
                importDatabase: '',
                showAccounting: '',
                settings: ''
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
            this._steady.home = value.home;
            this._steady.addAccount = value.addAccount;
            this._steady.deleteAccount = value.deleteAccount;
            this._steady.addBooking = value.addBooking;
            this._steady.addBookingType = value.addBookingType;
            this._steady.deleteBookingType = value.deleteBookingType;
            this._steady.exportDatabase = value.exportDatabase;
            this._steady.importDatabase = value.importDatabase;
            this._steady.showAccounting = value.showAccounting;
            this._steady.settings = value.settings;
        }
    }
});
console.log('--- STORE headerbar.js ---');

/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * you could obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2014-2025, Martin Berner, meingirokonto@gmx.de. All rights reserved.
 */

import { defineStore } from 'pinia';
export const useAddAccountStore = defineStore('addaccount', {
    state: () => {
        return {
            _swift: '',
            _number: '',
            _logoUrl: '',
            _brandFetchName: '',
            _steady: {
                swiftLabel: '',
                accountNumberLabel: '',
                logoLabel: ''
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
            this._steady.swiftLabel = value.swiftLabel;
            this._steady.accountNumberLabel = value.accountNumberLabel;
            this._steady.logoLabel = value.logoLabel;
        }
    }
});
console.log('--- STORE addaccount.js ---');

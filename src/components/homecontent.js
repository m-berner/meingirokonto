/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * you could obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2014-2025, Martin Berner, meingirokonto@gmx.de. All rights reserved.
 */

import { defineStore } from 'pinia';
export const useHomeContentStore = defineStore('homecontent', {
    state: () => {
        return {
            _search: '',
            _steady: {
                bookingsHeaders: [],
                searchLabel: '',
                noDataText: '',
                itemsPerPageText: '',
                dotMenuItems: []
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
            this._steady.bookingsHeaders = value.bookingsHeaders;
            this._steady.searchLabel = value.searchLabel;
            this._steady.noDataText = value.noDataText;
            this._steady.itemsPerPageText = value.itemsPerPageText;
            this._steady.dotMenuItems = value.dotMenuItems;
        }
    }
});
console.log('--- STORE homecontent.js ---');

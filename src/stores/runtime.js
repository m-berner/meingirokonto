import { defineStore } from 'pinia';
export const useRuntimeStore = defineStore('runtime', {
    state: () => {
        return {
            _teleport: {
                dialogName: '',
                childTitle: '',
                childOk: null,
                showOkButton: true,
                showHeaderDialog: false,
                showOptionDialog: false
            },
            _lazy_load_booking_table: false
        };
    },
    getters: {
        teleport(state) {
            return state._teleport;
        },
        lazyLoadBookingTable(state) {
            return state._lazy_load_booking_table;
        }
    },
    actions: {
        setTeleport(entry) {
            this._teleport = entry;
        },
        setLazyLoadBookingTable(value) {
            this._lazy_load_booking_table = value;
        },
        resetTeleport() {
            this._teleport = {
                dialogName: '',
                childTitle: '',
                childOk: null,
                showOkButton: true,
                showHeaderDialog: false,
                showOptionDialog: false
            };
        }
    }
});
console.log('--- STORE runtime.js ---');

import { defineStore } from 'pinia';
export const useRuntimeStore = defineStore('runtime', {
    state: () => {
        return {
            _teleport: {
                dialogName: '',
                showOkButton: true,
                showHeaderDialog: false,
                showOptionDialog: false
            },
            _lazy_load_booking_table: false,
            _booking_id: -1
        };
    },
    getters: {
        bookingId(state) {
            return state._booking_id;
        },
        teleport(state) {
            return state._teleport;
        },
        lazyLoadBookingTable(state) {
            return state._lazy_load_booking_table;
        }
    },
    actions: {
        setBookingId(value) {
            this._booking_id = value;
        },
        setTeleport(entry) {
            this._teleport = entry;
        },
        setLazyLoadBookingTable(value) {
            this._lazy_load_booking_table = value;
        },
        resetTeleport() {
            this._teleport = {
                dialogName: '',
                showOkButton: true,
                showHeaderDialog: false,
                showOptionDialog: false
            };
        }
    }
});
console.log('--- STORE runtime.js ---');

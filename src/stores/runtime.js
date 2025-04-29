import { defineStore } from 'pinia';
export const useRuntimeStore = defineStore('runtime', {
    state: () => {
        return {
            _teleport: {
                dialog_name: '',
                show_ok_button: true,
                show_header_dialog: false,
                show_option_dialog: false
            },
            _booking_id: -1
        };
    },
    getters: {
        bookingId(state) {
            return state._booking_id;
        },
        teleport(state) {
            return state._teleport;
        }
    },
    actions: {
        setBookingId(value) {
            this._booking_id = value;
        },
        setTeleport(entry) {
            this._teleport = entry;
        },
        resetTeleport() {
            this._teleport = {
                dialog_name: '',
                show_ok_button: true,
                show_header_dialog: false,
                show_option_dialog: false
            };
        }
    }
});
console.log('--- STORE runtime.js ---');

import { defineStore } from 'pinia';
export const useRuntimeStore = defineStore('runtime', {
    state: () => {
        return {
            _booking_id: -1
        };
    },
    getters: {
        bookingId(state) {
            return state._booking_id;
        }
    },
    actions: {
        setBookingId(value) {
            this._booking_id = value;
        }
    }
});
console.log('--- STORE runtime.js ---');

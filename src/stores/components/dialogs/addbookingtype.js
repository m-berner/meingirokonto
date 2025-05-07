import { defineStore } from 'pinia';
export const useAddBookingTypeStore = defineStore('addbookingtype', {
    state: () => {
        return {
            _name: '',
            _steady: {
                bookingTypeLabel: ''
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
            this._steady.bookingTypeLabel = value.bookingTypeLabel;
        }
    }
});
console.log('--- STORE addbookingtype.js ---');

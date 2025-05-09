import { defineStore } from 'pinia';
import { useApp } from '@/pages/background';
const { log } = useApp();
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
log('--- STORE addbookingtype.js ---');

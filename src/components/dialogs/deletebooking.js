import { defineStore } from 'pinia';
import { useApp } from '@/pages/background';
const { log } = useApp();
export const useDeleteBookingStore = defineStore('deletebooking', {
    state: () => {
        return {
            _steady: {
                label: ''
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
            this._steady.label = value.label;
        }
    }
});
log('--- STORE deletebooking.js ---');

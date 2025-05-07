import { defineStore } from 'pinia';
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
console.log('--- STORE deletebooking.js ---');

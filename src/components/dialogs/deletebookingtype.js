import { defineStore } from 'pinia';
export const useDeleteBookingTypeStore = defineStore('deletebookingtype', {
    state: () => {
        return {
            _selected: -1,
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
console.log('--- STORE deletebookingtype.js ---');

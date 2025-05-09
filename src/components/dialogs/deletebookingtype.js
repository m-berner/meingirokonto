import { defineStore } from 'pinia';
import { useApp } from '@/pages/background';
const { log } = useApp();
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
log('--- STORE deletebookingtype.js ---');

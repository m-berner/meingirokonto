import { defineStore } from 'pinia';
export const useDeleteAccountStore = defineStore('deleteaccount', {
    state: () => {
        return {
            _selected: -1,
            _steady: {
                accountNumberLabel: ''
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
            this._steady.accountNumberLabel = value.accountNumberLabel;
        }
    }
});
console.log('--- STORE deleteaccount.js ---');

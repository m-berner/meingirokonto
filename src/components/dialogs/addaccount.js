import { defineStore } from 'pinia';
export const useAddAccountStore = defineStore('addaccount', {
    state: () => {
        return {
            _swift: '',
            _number: '',
            _logoUrl: '',
            _brandFetchName: '',
            _steady: {
                swiftLabel: '',
                accountNumberLabel: '',
                logoLabel: ''
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
            this._steady.swiftLabel = value.swiftLabel;
            this._steady.accountNumberLabel = value.accountNumberLabel;
            this._steady.logoLabel = value.logoLabel;
        }
    }
});
console.log('--- STORE addaccount.js ---');

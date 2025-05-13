import { defineStore } from 'pinia';
import { useApp } from '@/pages/background';
const { log } = useApp();
export const useAddAccountStore = defineStore('addaccount', {
    state: () => {
        return {
            _swift: '',
            _number: '',
            _logoUrl: '',
            _brandFetchName: '',
            _stockAccount: 0,
            _steady: {
                swiftLabel: '',
                accountNumberLabel: '',
                logoLabel: '',
                stockAccountLabel: ''
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
            this._steady.stockAccountLabel = value.stockAccountLabel;
        }
    }
});
log('--- STORE addaccount.js ---');

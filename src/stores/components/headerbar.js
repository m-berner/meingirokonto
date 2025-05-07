import { defineStore } from 'pinia';
export const useHeaderBarStore = defineStore('headerbar', {
    state: () => {
        return {
            _steady: {
                home: '',
                addAccount: '',
                deleteAccount: '',
                addBooking: '',
                addBookingType: '',
                deleteBookingType: '',
                exportDatabase: '',
                importDatabase: '',
                showAccounting: '',
                settings: ''
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
            this._steady.home = value.home;
            this._steady.addAccount = value.addAccount;
            this._steady.deleteAccount = value.deleteAccount;
            this._steady.addBooking = value.addBooking;
            this._steady.addBookingType = value.addBookingType;
            this._steady.deleteBookingType = value.deleteBookingType;
            this._steady.exportDatabase = value.exportDatabase;
            this._steady.importDatabase = value.importDatabase;
            this._steady.showAccounting = value.showAccounting;
            this._steady.settings = value.settings;
        }
    }
});
console.log('--- STORE headerbar.js ---');

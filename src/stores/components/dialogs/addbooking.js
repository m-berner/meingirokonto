import { defineStore } from 'pinia';
export const useAddBookingStore = defineStore('addbooking', {
    state: () => {
        return {
            _date: '',
            _debit: 0,
            _credit: 0,
            _description: '',
            _type: 0,
            _steady: {
                dateLabel: '',
                creditLabel: '',
                debitLabel: '',
                descriptionLabel: '',
                typeLabel: ''
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
            this._steady.dateLabel = value.dateLabel;
            this._steady.creditLabel = value.creditLabel;
            this._steady.debitLabel = value.debitLabel;
            this._steady.descriptionLabel = value.descriptionLabel;
            this._steady.typeLabel = value.typeLabel;
        }
    }
});
console.log('--- STORE addbooking.js ---');

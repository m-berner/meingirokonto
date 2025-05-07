import { defineStore } from 'pinia';
export const useImportDatabaseStore = defineStore('importdatabase', {
    state: () => {
        return {
            _choosen_file: null,
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
console.log('--- STORE importdatabase.js ---');

import { defineStore } from 'pinia';
import { useApp } from '@/pages/background';
const { log } = useApp();
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
log('--- STORE importdatabase.js ---');

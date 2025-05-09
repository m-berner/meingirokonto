import { defineStore } from 'pinia';
import { useApp } from '@/pages/background';
const { log } = useApp();
export const useExportDatabaseStore = defineStore('exportdatabase', {
    state: () => {
        return {
            _steady: {
                fileName: ''
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
            this._steady.fileName = value.fileName;
        }
    }
});
log('--- STORE exportdatabase.js ---');

import { defineStore } from 'pinia';
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
console.log('--- STORE exportdatabase.js ---');

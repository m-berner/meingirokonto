import { defineStore } from 'pinia';
export const useShowAccountingStore = defineStore('showaccounting', {
    state: () => {
        return {
            _result: []
        };
    },
    getters: {
        getResult(state) {
            return state._result;
        }
    },
    actions: {
        addEntryToResult(value) {
            this._result.push(value);
        }
    }
});
console.log('--- STORE privacycontent.js ---');

import { defineStore } from 'pinia';
import { useApp } from '@/pages/background';
const { log } = useApp();
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
log('--- STORE privacycontent.js ---');

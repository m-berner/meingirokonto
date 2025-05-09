import { defineStore } from 'pinia';
import { useApp } from '@/pages/background';
const { log } = useApp();
export const useOptionsIndexStore = defineStore('optionsindex', {
    state: () => {
        return {
            _tab: 0,
            _skin: '',
            _steady: {
                tabs: [],
                themeKeys: [],
                themeNames: []
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
            this._steady.tabs = value.tabs;
            this._steady.themeNames = value.themeNames;
            this._steady.themeKeys = value.themeKeys;
        }
    }
});
log('--- STORE optionsindex.js ---');

import { defineStore } from 'pinia';
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
console.log('--- STORE optionsindex.js ---');

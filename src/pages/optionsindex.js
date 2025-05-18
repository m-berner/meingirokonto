import { defineStore } from 'pinia';
import { useApp } from '@/pages/background';
const { log } = useApp();
export const useOptionsIndexStore = defineStore('optionsindex', {
    state: () => {
        return {
            _tab: 0,
            _skin: '',
            _service: '',
            _steady: {
                tabs: [],
                themeKeys: [],
                themeNames: [],
                serviceKeys: [],
                indexes_a: [],
                indexes_b: [],
                materials_a: [],
                materials_b: []
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
            this._steady.serviceKeys = value.serviceKeys;
            this._steady.indexes_a = value.indexes_a;
            this._steady.indexes_b = value.indexes_b;
            this._steady.materials_a = value.materials_a;
            this._steady.materials_b = value.materials_b;
        }
    }
});
log('--- STORE optionsindex.js ---');

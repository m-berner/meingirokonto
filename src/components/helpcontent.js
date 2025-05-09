import { defineStore } from 'pinia';
import { useApp } from '@/pages/background';
const { log } = useApp();
export const useHelpPageStore = defineStore('helppage', {
    state: () => {
        return {
            _steady: {
                titleBarTitle: '',
                titleBar: [],
                toolBarTitle: '',
                toolBar: [],
                dotMenuTitle: '',
                dotMenu: [],
                footerBarTitle: '',
                footerBar: []
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
            this._steady.titleBarTitle = value.titleBarTitle;
            this._steady.titleBar = value.titleBar;
            this._steady.toolBarTitle = value.toolBarTitle;
            this._steady.toolBar = value.toolBar;
            this._steady.dotMenuTitle = value.dotMenuTitle;
            this._steady.dotMenu = value.dotMenu;
            this._steady.footerBarTitle = value.footerBarTitle;
            this._steady.footerBar = value.footerBar;
        }
    }
});
log('--- STORE helpcontent.js ---');

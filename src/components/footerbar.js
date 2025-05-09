import { defineStore } from 'pinia';
import { useApp } from '@/pages/background';
const { log } = useApp();
export const useFooterBarStore = defineStore('footerbar', {
    state: () => {
        return {
            _steady: {
                help: '',
                privacy: '',
                mail: ''
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
            this._steady.help = value.help;
            this._steady.privacy = value.privacy;
            this._steady.mail = value.mail;
        }
    }
});
log('--- STORE footerbar.js ---');

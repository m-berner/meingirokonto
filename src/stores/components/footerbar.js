import { defineStore } from 'pinia';
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
console.log('--- STORE footerbar.js ---');

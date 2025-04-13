import { defineStore } from 'pinia';
export const useRuntimeStore = defineStore('runtime', {
    state: () => {
        return {
            _tele_port: {
                dialogName: '',
                childTitle: '',
                childOk: null,
                showOkButton: true,
                showDialog: false
            }
        };
    },
    getters: {
        teleport(state) {
            return state._tele_port;
        }
    },
    actions: {
        setTeleport(entry) {
            this._tele_port = entry;
        },
        resetTeleport() {
            this._tele_port = {
                dialogName: '',
                childTitle: '',
                childOk: null,
                showOkButton: true,
                showDialog: false
            };
        }
    }
});
console.log('--- STORE runtime.js ---');

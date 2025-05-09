import { defineStore } from 'pinia';
export const useDialogPortStore = defineStore('dialogport', {
    state: () => {
        return {
            _teleport: {
                dialog_name: '',
                show_ok_button: true,
                show_header_dialog: false,
                show_option_dialog: false
            }
        };
    },
    getters: {
        teleport(state) {
            return state._teleport;
        }
    },
    actions: {
        setTeleport(entry) {
            this._teleport = entry;
        },
        resetTeleport() {
            this._teleport = {
                dialog_name: '',
                show_ok_button: true,
                show_header_dialog: false,
                show_option_dialog: false
            };
        }
    }
});

import { defineStore } from 'pinia';
import { useAppApi } from '@/pages/background';
import { useRecordsStore } from '@/stores/records';
import { useSettingsStore } from '@/stores/settings';
const { CONS, log } = useAppApi();
export const useRuntimeStore = defineStore('runtime', {
    state: () => {
        return {
            _booking_id: -1,
            _logo: CONS.LOGOS.NO_LOGO,
            _teleport: {
                dialog_name: '',
                show_ok_button: true,
                show_header_dialog: false,
                show_option_dialog: false
            }
        };
    },
    getters: {
        bookingId(state) {
            return state._booking_id;
        },
        logo(state) {
            return state._logo;
        },
        teleport(state) {
            return state._teleport;
        }
    },
    actions: {
        setLogo() {
            const records = useRecordsStore();
            const settings = useSettingsStore();
            if (settings.activeAccountId > -1) {
                this._logo = records.accounts[records.getAccountIndexById(settings.activeAccountId)].cLogoUrl;
            }
            else {
                this._logo = CONS.LOGOS.NO_LOGO;
            }
        },
        setBookingId(value) {
            this._booking_id = value;
        },
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
log('--- STORE runtime.js ---');

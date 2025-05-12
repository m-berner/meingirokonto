import { defineStore } from 'pinia';
import {} from 'vuetify';
import { useApp } from '@/pages/background';
const { CONS, log } = useApp();
export const useSettingsStore = defineStore('settings', {
    state: () => {
        return {
            _skin: CONS.DEFAULTS.STORAGE.SKIN,
            _bookings_per_page: CONS.DEFAULTS.STORAGE.BOOKINGS_PER_PAGE,
            _active_account_id: -1,
            _debug: false
        };
    },
    getters: {
        activeAccountId(state) {
            return state._active_account_id;
        },
        bookingsPerPage(state) {
            return state._bookings_per_page;
        },
        skin(state) {
            return state._skin;
        }
    },
    actions: {
        setActiveAccountId(value) {
            this._active_account_id = value;
        },
        setBookingsPerPage(value) {
            this._bookings_per_page = value;
        },
        initSettingsStore(theme, settings) {
            log('SETTINGS: initSettingsStore');
            theme.global.name.value = settings.skin;
            this._skin = settings.skin;
            this._bookings_per_page = settings.bookingsPerPage;
            this._active_account_id = settings.activeAccountId;
            this._debug = settings.debug;
        }
    }
});
log('--- STORE settings.js ---');

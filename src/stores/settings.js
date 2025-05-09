import { defineStore } from 'pinia';
import {} from 'vuetify';
import { useApp } from '@/pages/background';
import { useRecordsStore } from '@/stores/records';
const { CONS, log } = useApp();
export const useSettingsStore = defineStore('settings', {
    state: () => {
        return {
            _skin: CONS.DEFAULTS.STORAGE.SKIN,
            _bookings_per_page: CONS.DEFAULTS.STORAGE.BOOKINGS_PER_PAGE,
            _active_account_id: -1,
            _logo: '',
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
        setLogo(value) {
            this._logo = value;
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
        },
        onUpdateAccount(value) {
            log('SETTINGS: onUpdateAccount', { info: value });
            const records = useRecordsStore();
            return new Promise(async (resolve) => {
                const accountIndex = records.getAccountIndexById(value);
                const lName = records.accounts.all[accountIndex].cSwift.substring(0, 4);
                this._active_account_id = value;
                this._logo = lName[0].toUpperCase() + lName.toLowerCase().slice(1) + 'Svg';
                await browser.storage.local.set({ sLogo: lName[0].toUpperCase() + lName.toLowerCase().slice(1) + 'Svg' });
                await browser.storage.local.set({ sActiveAccountId: value });
                resolve();
            });
        }
    }
});
log('--- STORE settings.js ---');

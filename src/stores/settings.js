import { defineStore } from 'pinia';
import {} from 'vuetify';
import { useApp } from '@/composables/useApp';
import { CONS } from '@/background';
const { debug } = useApp();
export const useSettingsStore = defineStore('settings', {
    state: () => {
        return {
            _skin: CONS.DEFAULTS.STORAGE.SKIN,
            _bookings_per_page: CONS.DEFAULTS.STORAGE.BOOKINGS_PER_PAGE
        };
    },
    getters: {
        skin(state) {
            return state._skin;
        },
        bookingsPerPage(state) {
            return state._bookings_per_page;
        }
    },
    actions: {
        async setSkin(value, theme) {
            this._skin = value;
            theme.global.name.value = value;
            await browser.storage.local.set({ sSkin: value });
        },
        async storageIntoStore(theme) {
            debug('SETTINGS: storageIntoStore');
            const response = await browser.storage.local.get();
            theme.global.name.value = response.sSkin ?? CONS.DEFAULTS.STORAGE.SKIN;
            this._skin = response.sSkin ?? CONS.DEFAULTS.STORAGE.SKIN;
            this._bookings_per_page = response.sBookingsPerPage ?? CONS.DEFAULTS.STORAGE.BOOKINGS_PER_PAGE;
        }
    }
});
console.log('--- settings.js ---');

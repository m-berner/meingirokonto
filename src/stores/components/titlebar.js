import { defineStore } from 'pinia';
import { useRecordsStore } from '@/stores/records';
import { useSettingsStore } from '@/stores/settings';
export const useTitleBarStore = defineStore('titlebar', {
    state: () => {
        return {
            _logo: 'https://cdn.brandfetch.io/brandfetch.com/w/48/h/48?c=1idV74s2UaSDMRIQg-7',
            _bookings_sum: 0,
            _bookings_sum_label: ''
        };
    },
    getters: {
        logo(state) {
            return state._logo;
        },
        bookingsSumLabel(state) {
            return state._bookings_sum_label;
        }
    },
    actions: {
        setLogo() {
            const records = useRecordsStore();
            const settings = useSettingsStore();
            if (settings.activeAccountId > -1) {
                this._logo = records.accounts.all[records.getAccountIndexById(settings.activeAccountId)].cLogoUrl;
            }
        },
        setBookingsSumLabel(value) {
            this._bookings_sum_label = value;
        },
        updateTitlebar() {
            const records = useRecordsStore();
            const settings = useSettingsStore();
            records.sumBookings();
            this.setLogo();
            return new Promise(async (resolve) => {
                await browser.storage.local.set({
                    sActiveAccountId: settings.activeAccountId
                });
                resolve(null);
            });
        }
    }
});
console.log('--- STORE privacypage.js ---');

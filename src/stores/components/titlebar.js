import { defineStore } from 'pinia';
import { useRecordsStore } from '@/stores/records';
import { useSettingsStore } from '@/stores/settings';
export const useTitleBarStore = defineStore('titlebar', {
    state: () => {
        return {
            _title: '',
            _logo: 'https://cdn.brandfetch.io/brandfetch.com/w/48/h/48?c=1idV74s2UaSDMRIQg-7',
            _bookings_sum: 0,
            _bookings_sum_formatted: '',
            _bookings_sum_label: '',
        };
    },
    getters: {
        logo(state) {
            return state._logo;
        },
        title(state) {
            return state._title;
        },
        bookingsSumLabel(state) {
            return state._bookings_sum_label;
        },
        bookingsSumFormatted(state) {
            return state._bookings_sum_formatted;
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
        setTitle(value) {
            this._title = value;
        },
        setBookingsSumLabel(value) {
            this._bookings_sum_label = value;
        },
        setBookingsSumFormatted(value) {
            this._bookings_sum_formatted = value;
        },
    }
});
console.log('--- STORE privacypage.js ---');

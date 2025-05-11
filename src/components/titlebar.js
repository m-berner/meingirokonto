import { defineStore } from 'pinia';
import { useRecordsStore } from '@/stores/records';
import { useSettingsStore } from '@/stores/settings';
import { useApp } from '@/pages/background';
const { CONS, log } = useApp();
export const useTitleBarStore = defineStore('titlebar', {
    state: () => {
        return {
            _logo: CONS.LOGOS.NO_LOGO,
            _bookings_sum: 0,
            _steady: {
                title: '',
                bookings_sum_label: '',
                account_label: ''
            }
        };
    },
    getters: {
        logo(state) {
            return state._logo;
        },
        steady(state) {
            return state._steady;
        }
    },
    actions: {
        setLogo() {
            const records = useRecordsStore();
            const settings = useSettingsStore();
            if (settings.activeAccountId > -1) {
                this._logo = records.accounts.all[records.getAccountIndexById(settings.activeAccountId)].cLogoUrl;
            }
            else {
                this._logo = CONS.LOGOS.NO_LOGO;
            }
        },
        setSteady(value) {
            this._steady = value;
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
log('--- STORE titlebar.js ---');

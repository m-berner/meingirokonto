import { defineStore } from 'pinia';
import {} from 'vuetify';
import { useApp } from '@/composables/useApp';
const { CONS } = useApp();
export const useSettingsStore = defineStore('settings', {
    state: () => {
        return {
            _skin: CONS.DEFAULTS.STORAGE.skin,
            _items_per_page_transfers: CONS.DEFAULTS.STORAGE.items_per_page_transfers,
            _items_per_page_stocks: CONS.DEFAULTS.STORAGE.items_per_page_stocks
        };
    },
    getters: {
        skin(state) {
            return state._skin;
        },
        itemsPerPageTransfers(state) {
            return state._items_per_page_transfers;
        },
        itemsPerPageStocks(state) {
            return state._items_per_page_stocks;
        }
    },
    actions: {
        async setSkin(value, theme) {
            theme.global.name.value = value;
            this._skin = value;
            await browser.storage.local.set({ skin: value });
        },
        setSkinStoreOnly(value) {
            if (value === undefined) {
                this._skin = CONS.DEFAULTS.STORAGE.skin;
            }
            else {
                this._skin = value;
            }
        },
        async setItemsPerPageTransfers(value) {
            this._items_per_page_transfers = value;
            await browser.storage.local.set({ itemsPerPageTransfers: value });
        },
        setItemsPerPageTransfersStoreOnly(value) {
            if (value === undefined) {
                this._items_per_page_stocks = CONS.DEFAULTS.STORAGE.items_per_page_transfers;
            }
            else {
                this._items_per_page_stocks = value;
            }
        },
        async setItemsPerPageStocks(value) {
            this._items_per_page_stocks = value;
            await browser.storage.local.set({ itemsPerPageStocks: value });
        },
        setItemsPerPageStocksStoreOnly(value) {
            if (value === undefined) {
                this._items_per_page_stocks = CONS.DEFAULTS.STORAGE.items_per_page_stocks;
            }
            else {
                this._items_per_page_stocks = value;
            }
        },
        async storageIntoStore(theme) {
            console.log('SETTINGS: storageIntoStore');
            const response = await browser.storage.local.get();
            theme.global.name.value = response.skin ?? 'ocean';
            this.setSkinStoreOnly(response.skin);
            this.setItemsPerPageStocksStoreOnly(response.items_per_page_stocks);
            this.setItemsPerPageTransfersStoreOnly(response.items_per_page_transfers);
        }
    }
});
console.log('--- settings.js ---');

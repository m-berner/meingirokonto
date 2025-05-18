import { defineStore } from 'pinia';
import {} from 'vuetify';
import { useApp } from '@/pages/background';
const { CONS, log } = useApp();
export const useSettingsStore = defineStore('settings', {
    state: () => {
        return {
            _skin: CONS.DEFAULTS.STORAGE.SKIN,
            _bookings_per_page: CONS.DEFAULTS.STORAGE.BOOKINGS_PER_PAGE,
            _stocks_per_page: CONS.DEFAULTS.STORAGE.STOCKS_PER_PAGE,
            _active_account_id: -1,
            _debug: false,
            _partner: false,
            _service: CONS.DEFAULTS.STORAGE.SERVICE,
            _materials: CONS.DEFAULTS.STORAGE.MATERIALS,
            _markets: CONS.DEFAULTS.STORAGE.MARKETS,
            _indexes: CONS.DEFAULTS.STORAGE.INDEXES,
            _exchanges: CONS.DEFAULTS.STORAGE.EXCHANGES
        };
    },
    getters: {
        activeAccountId(state) {
            return state._active_account_id;
        },
        bookingsPerPage(state) {
            return state._bookings_per_page;
        },
        stocksPerPage(state) {
            return state._stocks_per_page;
        },
        skin(state) {
            return state._skin;
        },
        debug(state) {
            return state._debug;
        },
        partner(state) {
            return state._partner;
        },
        service(state) {
            return state._service;
        },
        materials(state) {
            return state._materials;
        },
        markets(state) {
            return state._markets;
        },
        indexes(state) {
            return state._indexes;
        },
        exchanges(state) {
            return state._exchanges;
        }
    },
    actions: {
        setActiveAccountId(value) {
            this._active_account_id = value;
        },
        setBookingsPerPage(value) {
            this._bookings_per_page = value;
        },
        setStocksPerPage(value) {
            this._stocks_per_page = value;
        },
        setSkin(value) {
            this._skin = value;
        },
        setDebug(value) {
            this._debug = value;
        },
        setPartner(value) {
            this._partner = value;
        },
        setService(value) {
            this._service = value;
        },
        setMaterials(value) {
            this._materials = value;
        },
        setMarkets(value) {
            this._markets = value;
        },
        setIndexes(value) {
            this._indexes = value;
        },
        setExchanges(value) {
            this._exchanges = value;
        },
        initSettingsStore(theme, settings) {
            log('SETTINGS: initSettingsStore');
            theme.global.name.value = settings.skin;
            this._skin = settings.skin;
            this._bookings_per_page = settings.bookingsPerPage;
            this._stocks_per_page = settings.stocksPerPage;
            this._active_account_id = settings.activeAccountId;
            this._debug = settings.debug;
            this._partner = settings.partner;
            this._service = settings.service;
            this._materials = settings.materials;
            this._markets = settings.markets;
            this._indexes = settings.indexes;
            this._exchanges = settings.exchanges;
        }
    }
});
log('--- STORE settings.js ---');

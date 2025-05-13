export const useApp = () => {
    return {
        CONS: Object.freeze({
            DATE: {
                DEFAULT: 0,
                DEFAULT_ISO: '1970-01-01',
                DEFAULT_YEAR: 1970,
                MILLI_PER_DAY: 86400000,
                MILLI_PER_MIN: 60000
            },
            DB: {
                NAME: 'kontenmanager.db',
                STORES: {
                    ACCOUNTS: {
                        NAME: 'accounts',
                        FIELDS: {
                            ID: 'cID',
                            SWIFT: 'cSwift',
                            LOGO_URL: 'cLogoUrl',
                            NUMBER: 'cNumber',
                            STOCK_ACCOUNT: 'cStockAccount'
                        }
                    },
                    BOOKINGS: {
                        NAME: 'bookings',
                        FIELDS: {
                            ID: 'cID',
                            DATE: 'cDate',
                            CREDIT: 'cCredit',
                            DEBIT: 'cDebit',
                            DESC: 'cDescription',
                            TYPE: 'cType',
                            ACCOUNT_NUMBER_ID: 'cAccountNumberID',
                            STOCK_ID: 'cStockID',
                            TAX: 'cTax',
                            FEE: 'cFee',
                            SOURCE_TAX: 'cSourceTax',
                            TRANSACTION_TAX: 'cTransactionTax'
                        }
                    },
                    BOOKING_TYPES: {
                        NAME: 'booking_types',
                        FIELDS: {
                            ID: 'cID',
                            NAME: 'cName',
                            ACCOUNT_NUMBER: 'cAccountNumberID'
                        }
                    },
                    STOCKS: {
                        NAME: 'stocks',
                        FIELDS: {
                            ID: 'cID',
                            ISIN: 'cISIN',
                            SYMBOL: 'cSymbol',
                            FADE_OUT: 'cFadeOut',
                            FIRST_PAGE: 'cFirstPage',
                            URL: 'cURL',
                            MEETING_DAY: 'cMeetingDay',
                            QUARTER_DAY: 'cQuarterDay',
                            WKN: 'cWKN',
                            COMPANY: 'cCompany'
                        }
                    }
                },
                MIN_VERSION: 1,
                START_VERSION: 1
            },
            DEFAULTS: {
                BACKGROUND: '_generated_background_page.html',
                CURRENCY: 'EUR',
                LANG: 'de',
                LOCALE: 'de-DE',
                YEAR: 9999,
                STORAGE: {
                    ACTIVE_ACCOUNT_ID: -1,
                    BOOKINGS_PER_PAGE: 9,
                    DEBUG: false,
                    SKIN: 'ocean'
                }
            },
            DIALOGS: {
                ADD_ACCOUNT: 'AddAccount',
                DELETE_ACCOUNT: 'DeleteAccount',
                ADD_BOOKING_TYPE: 'AddBookingType',
                DELETE_BOOKING_TYPE: 'DeleteBookingType',
                ADD_BOOKING: 'AddBooking',
                DELETE_BOOKING: 'DeleteBooking',
                EXPORT_DATABASE: 'ExportDatabase',
                IMPORT_DATABASE: 'ImportDatabase',
                SHOW_ACCOUNTING: 'ShowAccounting',
                SETTING: 'setting'
            },
            LOGOS: {
                NO_LOGO: 'https://cdn.brandfetch.io/brandfetch.com/w/48/h/48?c=1idV74s2UaSDMRIQg-7'
            },
            EVENTS: {
                ABORT: 'abort',
                BEFOREUNLOAD: 'beforeunload',
                CHANGE: 'change',
                CLICK: 'click',
                COMP: 'complete',
                DOM: 'DOMContentLoaded',
                ERR: 'error',
                INP: 'input',
                KEYDOWN: 'keydown',
                LOAD: 'load',
                FOCUS: 'focus',
                BLUR: 'blur',
                SUC: 'success',
                UPG: 'upgradeneeded'
            },
            MESSAGES: {
                GS: 'GET_SETTINGS'
            },
            SETTINGS: {
                ITEMS_PER_PAGE_OPTIONS: [
                    {
                        value: 5,
                        title: '5'
                    },
                    {
                        value: 7,
                        title: '7'
                    },
                    {
                        value: 9,
                        title: '9'
                    },
                    {
                        value: 11,
                        title: '11'
                    }
                ]
            },
            RESOURCES: {
                SRC: 'assets',
                OK: 'ok.png',
                OKD: 'ok-dark.png',
                CANCEL: 'cancel.png',
                CANCELD: 'cancel-dark.png',
                ICON32: 'icon32.png',
                LOGO16: 'logo16.png',
                LOGO256: 'logo256.png',
                MAG: 'magnifier.png',
                CALENDAR: 'calendar.png',
                RENEW: 'renew.png',
                FIRST: 'first.png',
                NEXT: 'next.png',
                PREV: 'previous.png',
                LAST: 'last.png',
                CB: 'home.png',
                UP: 'update.png',
                NS: 'addAccount.png',
                DS: 'deletestock.png',
                FI: 'fadein.png',
                IT: 'intransfer.png',
                OT: 'outtransfer.png',
                CHS: 'changes.png',
                CHB: 'allchanges.png',
                BK: 'backup.png',
                RE: 'restore.png',
                OB: 'orderbook.png',
                TB: 'transferbook.png',
                PY: 'peryear.png',
                CO: 'clean.png',
                SE: 'settings.png',
                RESET: 'reset.png',
                ADD: 'add.png',
                CHANGE: 'change.png',
                DEL: 'delete.png',
                NO: 'neworder.png',
                BUY: 'buy.png',
                SELL: 'sell.png',
                ND: 'newdividend.png',
                SD: 'showdividends.png',
                CONF: 'config.png',
                HTTP: 'http.png',
                HELP: 'help.json',
                PRIVACY: 'privacy.json',
                LICENSE: 'license.html',
                INDEX: 'pages/app.html',
                ROOT: '/'
            },
            RESULTS: {
                ERROR: 'ERR',
                SUCCESS: 'SUCCESS'
            },
            SYSTEM: {
                COPYRIGHT: '2013-2025 Martin Berner',
                MAILTO: 'mailto:kontenmanager@gmx.de',
                GET: 'GET',
                HTML_ENTITY: '(&auml|&Auml;|&ouml;|&Ouml;|&uuml;|&Uuml;|&amp;|&eacute;|&Eacute;|&ecirc;|&Ecirc;|&oacute;|&Oacute;|&aelig;|&Aelig;)',
                KEYS: {
                    ENTER: 'Enter',
                    TAB: 'Tab',
                    T: 'T',
                    V: 'V',
                    Z: 'Z'
                },
                ERRORS: {
                    CURR: 'Missing current record!',
                    ERR: 'System error!',
                    INVALID: 'Invalid Range!',
                    NOCASE: 'Missing case!',
                    NODEL: 'Deletion off memory failed!',
                    REQ: 'Request failed!',
                    SRV: 'Remote Server error!',
                    WRONGPARAM: 'Wrong parameter!',
                    SEND: 'Send message failed!'
                },
                ONCE: { once: true }
            }
        }),
        VALIDATORS: Object.freeze({
            ibanRules: msgs => {
                return [
                    v => v !== null || msgs[0],
                    v => (v !== null && v.length < 37) || msgs[1],
                    v => v.match(/^(^[A-Z]{2}[0-9|\s]{20,36})/g) !== null || msgs[2]
                ];
            },
            nameRules: msgs => {
                return [
                    v => v !== null || msgs[0],
                    v => (v !== null && v.length < 32) || msgs[1],
                    v => v.match(/[^a-zA-Z\-äöüÄÖÜ]/g) === null || msgs[2]
                ];
            },
            swiftRules: msgs => {
                return [
                    v => v !== null || msgs[0],
                    v => (v !== null && v.length < 13) || msgs[1],
                    v => v.match(/[^a-zA-Z0-9]/g) === null || msgs[2]
                ];
            },
            dateRules: msgs => {
                return [
                    v => (v !== null && v.match(/^([1-2])?[0-9]{3}-(1[0-2]|0?[1-9])-(3[01]|[12][0-9]|0?[1-9])$/g) !== null) || msgs[0]
                ];
            },
            currencyCodeRules: msgs => {
                return [
                    v => v !== null || msgs[0],
                    v => (v !== null && v.length === 3) || msgs[1],
                    v => v.match(/[^a-zA-Z]/g) === null || msgs[2]
                ];
            },
            requiredRule: msgs => {
                return [
                    v => v !== null || msgs[0]
                ];
            },
            brandNameRules: msgs => {
                return [
                    v => v !== null || msgs[0]
                ];
            }
        }),
        notice: (messages) => {
            return new Promise(async (resolve) => {
                const msg = messages.join('\n');
                const notificationOption = {
                    type: 'basic',
                    iconUrl: 'assets/icon16.png',
                    title: 'KontenManager',
                    message: msg
                };
                await browser.notifications.create(notificationOption);
                resolve();
            });
        },
        utcDate: (iso) => {
            return new Date(`${iso}T00:00:00.000`);
        },
        log: async (msg, mode = { info: null }) => {
            const storageLocal = await browser.storage.local.get(['sDebug']);
            if (storageLocal.sDebug) {
                if (mode.info !== null) {
                    console.info(msg, mode.info);
                }
                else {
                    console.log(msg);
                }
            }
        }
    };
};
const { CONS, log } = useApp();
if (window.location.href.includes(CONS.DEFAULTS.BACKGROUND)) {
    const onInstall = () => {
        log('BACKGROUND: onInstall');
        return new Promise(async (resolve) => {
            const storageLocal = await browser.storage.local.get();
            const onSuccess = (ev) => {
                if (ev.target instanceof IDBRequest) {
                    ev.target.result.close();
                }
                log('BACKGROUND: onInstall: onSuccess', { info: ev });
            };
            const onError = (ev) => {
                console.error('BACKGROUND: onError: ', ev);
            };
            const onUpgradeNeeded = async (ev) => {
                if (ev instanceof IDBVersionChangeEvent) {
                    log('BACKGROUND: onInstall: onUpgradeNeeded', { info: ev.newVersion });
                    const createDB = () => {
                        log('BACKGROUND: onInstall: onUpgradeNeeded: createDB');
                        const requestCreateAccountStore = dbOpenRequest.result.createObjectStore(CONS.DB.STORES.ACCOUNTS.NAME, {
                            keyPath: CONS.DB.STORES.ACCOUNTS.FIELDS.ID,
                            autoIncrement: true
                        });
                        const requestCreateBookingStore = dbOpenRequest.result.createObjectStore(CONS.DB.STORES.BOOKINGS.NAME, {
                            keyPath: CONS.DB.STORES.BOOKINGS.FIELDS.ID,
                            autoIncrement: true
                        });
                        const requestCreateBookingTypeStore = dbOpenRequest.result.createObjectStore(CONS.DB.STORES.BOOKING_TYPES.NAME, {
                            keyPath: CONS.DB.STORES.BOOKING_TYPES.FIELDS.ID,
                            autoIncrement: true
                        });
                        const requestCreateStockStore = dbOpenRequest.result.createObjectStore(CONS.DB.STORES.STOCKS.NAME, {
                            keyPath: CONS.DB.STORES.STOCKS.FIELDS.ID,
                            autoIncrement: true
                        });
                        requestCreateAccountStore.createIndex(`${CONS.DB.STORES.ACCOUNTS.NAME}_uk1`, CONS.DB.STORES.ACCOUNTS.FIELDS.ID, { unique: true });
                        requestCreateAccountStore.createIndex(`${CONS.DB.STORES.ACCOUNTS.NAME}_uk2`, CONS.DB.STORES.ACCOUNTS.FIELDS.NUMBER, { unique: true });
                        requestCreateBookingTypeStore.createIndex(`${CONS.DB.STORES.BOOKING_TYPES.NAME}_uk1`, CONS.DB.STORES.BOOKING_TYPES.FIELDS.ID, { unique: true });
                        requestCreateBookingTypeStore.createIndex(`${CONS.DB.STORES.BOOKING_TYPES.NAME}_k1`, CONS.DB.STORES.BOOKING_TYPES.FIELDS.NAME, { unique: false });
                        requestCreateBookingTypeStore.createIndex(`${CONS.DB.STORES.BOOKING_TYPES.NAME}_k2`, CONS.DB.STORES.BOOKING_TYPES.FIELDS.ACCOUNT_NUMBER, { unique: false });
                        requestCreateBookingStore.createIndex(`${CONS.DB.STORES.BOOKINGS.NAME}_uk1`, CONS.DB.STORES.BOOKINGS.FIELDS.ID, { unique: true });
                        requestCreateBookingStore.createIndex(`${CONS.DB.STORES.BOOKINGS.NAME}_k1`, CONS.DB.STORES.BOOKINGS.FIELDS.DATE, { unique: false });
                        requestCreateBookingStore.createIndex(`${CONS.DB.STORES.BOOKINGS.NAME}_k2`, CONS.DB.STORES.BOOKINGS.FIELDS.TYPE, { unique: false });
                        requestCreateStockStore.createIndex(`${CONS.DB.STORES.STOCKS.NAME}_uk1`, CONS.DB.STORES.STOCKS.FIELDS.ID, { unique: true });
                        requestCreateStockStore.createIndex(`${CONS.DB.STORES.STOCKS.NAME}_uk2`, CONS.DB.STORES.STOCKS.FIELDS.ISIN, { unique: true });
                        requestCreateStockStore.createIndex(`${CONS.DB.STORES.STOCKS.NAME}_uk3`, CONS.DB.STORES.STOCKS.FIELDS.SYMBOL, { unique: true });
                        requestCreateStockStore.createIndex(`${CONS.DB.STORES.STOCKS.NAME}_k1`, CONS.DB.STORES.STOCKS.FIELDS.FADE_OUT, { unique: false });
                        requestCreateStockStore.createIndex(`${CONS.DB.STORES.STOCKS.NAME}_k2`, CONS.DB.STORES.STOCKS.FIELDS.FIRST_PAGE, { unique: false });
                    };
                    if (ev.oldVersion === 0) {
                        createDB();
                    }
                    else {
                    }
                    if (storageLocal.sSkin === undefined) {
                        await browser.storage.local.set({ sSkin: CONS.DEFAULTS.STORAGE.SKIN });
                    }
                    if (storageLocal.sActiveAccountId === undefined) {
                        await browser.storage.local.set({ sActiveAccountId: CONS.DEFAULTS.STORAGE.ACTIVE_ACCOUNT_ID });
                    }
                    if (storageLocal.sBookingsPerPage === undefined) {
                        await browser.storage.local.set({ sBookingsPerPage: CONS.DEFAULTS.STORAGE.BOOKINGS_PER_PAGE });
                    }
                    if (storageLocal.sDebug === undefined) {
                        await browser.storage.local.set({ sDebug: CONS.DEFAULTS.STORAGE.DEBUG });
                    }
                }
            };
            const dbOpenRequest = indexedDB.open(CONS.DB.NAME, CONS.DB.START_VERSION);
            dbOpenRequest.addEventListener(CONS.EVENTS.ERR, onError, CONS.SYSTEM.ONCE);
            dbOpenRequest.addEventListener(CONS.EVENTS.SUC, onSuccess, CONS.SYSTEM.ONCE);
            dbOpenRequest.addEventListener(CONS.EVENTS.UPG, onUpgradeNeeded, CONS.SYSTEM.ONCE);
            resolve();
        });
    };
    const onClick = () => {
        log('BACKGROUND: onClick');
        return new Promise(async (resolve) => {
            const foundTabs = await browser.tabs.query({ url: `${browser.runtime.getURL(CONS.RESOURCES.INDEX)}` });
            if (foundTabs.length === 0) {
                await browser.tabs.create({
                    url: browser.runtime.getURL(CONS.RESOURCES.INDEX),
                    active: true
                });
            }
            else {
                await browser.windows.update(foundTabs[0].windowId ?? 0, {
                    focused: true
                });
                await browser.tabs.update(foundTabs[0].id ?? 0, { active: true });
            }
            resolve();
        });
    };
    const onSettings = (data) => {
        log('BACKGROUND: onSettings', { info: data.type });
        const startSettings = () => {
            return new Promise(async (resolve) => {
                const storageLocal = await browser.storage.local.get();
                const skin = storageLocal.sSkin !== undefined ? storageLocal.sSkin : CONS.DEFAULTS.STORAGE.SKIN;
                const activeAccountId = storageLocal.sActiveAccountId !== undefined ? storageLocal.sActiveAccountId : CONS.DEFAULTS.STORAGE.ACTIVE_ACCOUNT_ID;
                const bookingsPerPage = storageLocal.sBookingsPerPage !== undefined ? storageLocal.sBookingsPerPage : CONS.DEFAULTS.STORAGE.BOOKINGS_PER_PAGE;
                const debug = storageLocal.sDebug !== undefined ? storageLocal.sDebug : CONS.DEFAULTS.STORAGE.DEBUG;
                log('BACKGROUND: onSettings: startSettings');
                resolve({
                    skin,
                    activeAccountId,
                    bookingsPerPage,
                    debug
                });
            });
        };
        return new Promise(async (resolve) => {
            if (data.type === CONS.MESSAGES.GS) {
                resolve(await startSettings());
            }
            else {
                resolve();
            }
        });
    };
    browser.runtime.onInstalled.addListener(onInstall);
    browser.action.onClicked.addListener(onClick);
    browser.runtime.onMessage.addListener(onSettings);
    log('BACKGROUND: attached listener', { info: window.location.href });
}
log('--- PAGE_SCRIPT background.js --- CONS + useApp ---');

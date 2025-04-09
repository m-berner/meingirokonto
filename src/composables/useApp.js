import { CONS } from '@/pages/background';
import { createI18n } from 'vue-i18n';
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
import { mdiBankPlus, mdiBankRemove, mdiBasketFill, mdiBasketMinus, mdiBasketPlus, mdiCalculator, mdiCashMinus, mdiCashPlus, mdiChartTimelineVariant, mdiChartTimelineVariantShimmer, mdiCheck, mdiClose, mdiCog, mdiCopyright, mdiCurrencyEur, mdiDatabaseExport, mdiDatabaseImport, mdiDelete, mdiDomain, mdiDomainPlus, mdiDomainRemove, mdiDotsVertical, mdiEmail, mdiFileCog, mdiFileDocumentEdit, mdiFileDocumentMinus, mdiFilterCog, mdiFilterPlus, mdiFilterRemove, mdiGiftOutline, mdiHandshake, mdiHelpCircle, mdiHome, mdiImage, mdiInfinity, mdiMagnify, mdiPlus, mdiReload, mdiShieldAccount, mdiTableLargeRemove, mdiTransfer } from '@mdi/js';
import messages from '@intlify/unplugin-vue-i18n/messages';
import {} from 'vue';
export const useApp = () => {
    const getUI = () => {
        const result = {
            lang: '',
            region: '',
            locale: ''
        };
        const uiLang = browser.i18n.getUILanguage().toLowerCase() ?? CONS.DEFAULTS.LOCALE;
        if (uiLang.includes('-')) {
            result.lang = uiLang.split('-')[0];
            result.region = uiLang.split('-')[1].toUpperCase();
            result.locale = uiLang;
        }
        else {
            result.lang = uiLang;
            result.region = uiLang.toUpperCase();
            result.locale = uiLang + '-' + uiLang.toUpperCase();
        }
        return result;
    };
    return {
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
                    v => (v !== null && v.length < 16) || msgs[1],
                    v => v.match(/[^a-zA-Z]/g) === null || msgs[2]
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
            }
        }),
        vuetify: createVuetify({
            theme: {
                defaultTheme: 'ocean',
                themes: {
                    light: {
                        dark: false,
                        colors: {
                            background: '#e0e0e0',
                            primary: '#eeeeee',
                            surface: '#eeeeee',
                            secondary: '#e0e0e0',
                            warning: 'orange',
                            error: 'orange',
                            info: 'yellow',
                            success: 'green'
                        }
                    },
                    dark: {
                        dark: true,
                        colors: {
                            background: '#e0e0e0',
                            primary: '#23222B',
                            surface: '#23222B',
                            secondary: '#e0e0e0',
                            warning: 'orange',
                            error: 'orange',
                            info: 'yellow',
                            success: 'green'
                        }
                    },
                    sky: {
                        dark: false,
                        colors: {
                            background: '#e0e0e0',
                            primary: '#3282f6',
                            surface: '#3282f6',
                            secondary: '#e0e0e0',
                            warning: 'orange',
                            error: 'orange',
                            info: 'yellow',
                            success: 'green'
                        }
                    },
                    ocean: {
                        dark: false,
                        colors: {
                            background: '#e0e0e0',
                            primary: '#194f7d',
                            surface: '#194f7d',
                            secondary: '#e0e0e0',
                            warning: 'orange',
                            error: 'orange',
                            info: 'yellow',
                            success: 'green'
                        }
                    },
                    earth: {
                        dark: false,
                        colors: {
                            background: '#e0e0e0',
                            primary: '#780e12',
                            surface: '#780e12',
                            secondary: '#e0e0e0',
                            warning: 'orange',
                            error: 'orange',
                            info: 'yellow',
                            success: 'green'
                        }
                    },
                    meadow: {
                        dark: false,
                        colors: {
                            background: '#e0e0e0',
                            primary: '#378222',
                            surface: '#378D22',
                            secondary: '#e0e0e0',
                            topbar: '#37bb22',
                            warning: 'orange',
                            error: 'orange',
                            info: 'yellow',
                            success: 'green'
                        }
                    }
                }
            },
            icons: {
                sets: {
                    mdi
                },
                defaultSet: 'mdi',
                aliases: {
                    ...aliases,
                    sm: mdiImage,
                    home: mdiHome,
                    euro: mdiCurrencyEur,
                    reload: mdiReload,
                    addBooking: mdiDomainPlus,
                    addBookingType: mdiFilterPlus,
                    editBookingType: mdiFilterCog,
                    deleteBookingType: mdiFilterRemove,
                    account: mdiDomainPlus,
                    deleteStock: mdiDomainRemove,
                    fadeinStock: mdiDomain,
                    cashPlus: mdiCashPlus,
                    cashMinus: mdiCashMinus,
                    dailyChanges: mdiChartTimelineVariant,
                    dailyChangesAll: mdiChartTimelineVariantShimmer,
                    exportDatabase: mdiDatabaseExport,
                    importDatabase: mdiDatabaseImport,
                    transfersTable: mdiTransfer,
                    showAccounting: mdiCalculator,
                    settings: mdiCog,
                    copyright: mdiCopyright,
                    buyStock: mdiBasketPlus,
                    sellStock: mdiBasketMinus,
                    addDividend: mdiBasketFill,
                    showDividend: mdiGiftOutline,
                    configs: mdiFileCog,
                    link: mdiInfinity,
                    close: mdiClose,
                    add: mdiPlus,
                    remove: mdiDelete,
                    check: mdiCheck,
                    dots: mdiDotsVertical,
                    tableRemove: mdiTableLargeRemove,
                    removeDocument: mdiFileDocumentMinus,
                    editDocument: mdiFileDocumentEdit,
                    help: mdiHelpCircle,
                    privacy: mdiShieldAccount,
                    partner: mdiHandshake,
                    mail: mdiEmail,
                    magnify: mdiMagnify,
                    addAccount: mdiBankPlus,
                    deleteAccount: mdiBankRemove
                }
            }
        }),
        i18n: createI18n({
            locale: getUI().locale,
            fallbackLocale: 'en-US',
            mode: 'composition',
            globalInjection: true,
            messages,
            datetimeFormats: {
                'de-DE': {
                    numeric: {
                        day: 'numeric',
                        month: 'numeric',
                        year: 'numeric'
                    },
                    short: {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                    },
                    long: {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        weekday: 'short',
                        hour: 'numeric',
                        minute: 'numeric'
                    }
                },
                'en-US': {
                    numeric: {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric'
                    },
                    short: {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    },
                    long: {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        weekday: 'short',
                        hour: 'numeric',
                        minute: 'numeric'
                    }
                }
            },
            numberFormats: {
                'de-DE': {
                    currency5: {
                        style: 'currency',
                        currency: 'EUR',
                        minimumFractionDigits: 5,
                        maximumFractionDigits: 5,
                        notation: 'standard'
                    },
                    currency3: {
                        style: 'currency',
                        currency: 'EUR',
                        minimumFractionDigits: 3,
                        maximumFractionDigits: 3,
                        notation: 'standard'
                    },
                    currency: {
                        style: 'currency',
                        currency: 'EUR',
                        notation: 'standard'
                    },
                    currencyUSD: {
                        style: 'currency',
                        currency: 'USD',
                        notation: 'standard'
                    },
                    decimal: {
                        style: 'decimal',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    },
                    decimal3: {
                        style: 'decimal',
                        minimumFractionDigits: 3,
                        maximumFractionDigits: 3
                    },
                    integer: {
                        style: 'decimal',
                        maximumFractionDigits: 0
                    },
                    year: {
                        style: 'decimal',
                        maximumFractionDigits: 0,
                        useGrouping: false
                    },
                    percent: {
                        style: 'percent',
                        minimumFractionDigits: 1,
                        maximumFractionDigits: 2,
                        useGrouping: false
                    }
                },
                'en-US': {
                    currency: {
                        style: 'currency',
                        currency: 'USD',
                        notation: 'standard'
                    },
                    decimal: {
                        style: 'decimal',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    },
                    percent: {
                        style: 'percent',
                        useGrouping: false
                    }
                }
            }
        }),
        utcDate: (iso) => {
            const tzo = new Date().getTimezoneOffset() / 60;
            let result = '';
            if (tzo < 0 && tzo > -10) {
                result = `+0${-tzo}`;
            }
            else if (tzo < 0) {
                result = `+${-tzo}`;
            }
            else if (tzo >= 0 && tzo < 10) {
                result = `-0${tzo}`;
            }
            else if (tzo > 9) {
                result = `-${tzo}`;
            }
            return new Date(`${iso}T00:00:00.000${result}:00`);
        },
        notice: async (messages) => {
            const msg = messages.join('\n');
            const notificationOption = {
                type: 'basic',
                iconUrl: '_assets/icon16.png',
                title: 'MeinGiroKonto',
                message: msg
            };
            await browser.notifications.create(notificationOption);
        },
        getUI: getUI,
        group: (count, size = 2) => {
            const ar = [];
            const isOdd = count % 2 === 1;
            const part = Math.ceil(count / size);
            for (let i = 0; i < size; i++) {
                if (isOdd && i === size - 1) {
                    ar.push(part - 1);
                }
                else {
                    ar.push(part);
                }
            }
            return ar;
        },
        offset: () => {
            return new Date().getTimezoneOffset() * 60000;
        },
        isoDatePlusSeconds: (iso) => {
            return new Date(iso).getTime() + (Date.now() % 86400);
        },
        toNumber: (str) => {
            let result = 0;
            if (str !== null && str !== undefined) {
                const a = str.toString().replace(/,$/g, '');
                const b = a.split(',');
                if (b.length === 2) {
                    const tmp2 = a
                        .trim()
                        .replace(/\s|\.|\t|%/g, '')
                        .replace(',', '.');
                    result = Number.isNaN(Number.parseFloat(tmp2))
                        ? 0
                        : Number.parseFloat(tmp2);
                }
                else if (b.length > 2) {
                    let tmp = '';
                    for (let i = b.length - 1; i > 0; i--) {
                        tmp += b[i];
                    }
                    const tmp2 = tmp + '.' + b[0];
                    result = Number.isNaN(Number.parseFloat(tmp2))
                        ? 0
                        : Number.parseFloat(tmp2);
                }
                else {
                    result = Number.isNaN(parseFloat(b[0])) ? 0 : Number.parseFloat(b[0]);
                }
            }
            return result;
        },
        mean: (nar) => {
            let sum = 0;
            let len = nar.length;
            let n;
            for (n of nar) {
                if (n !== 0 && !Number.isNaN(n)) {
                    sum += n;
                }
                else {
                    len--;
                }
            }
            return len > 0 ? sum / len : 0;
        },
        dateToISO: (value) => {
            return new Date(value).toISOString().substring(0, 10);
        },
        emptyFunction: () => {
        },
        log: (text, logLevel = 0, debug = false, obj) => {
            if (debug && obj === undefined) {
                switch (logLevel) {
                    case 0:
                        console.log(text);
                        break;
                    case 1:
                        console.info(text);
                        break;
                    case 2:
                        console.warn(text);
                        break;
                    case 3:
                        console.error(text);
                        break;
                    default:
                }
            }
            else if (debug && obj !== undefined) {
                switch (logLevel) {
                    case 0:
                        console.log(text, obj);
                        break;
                    case 1:
                        console.info(text, obj);
                        break;
                    case 2:
                        console.warn(text, obj);
                        break;
                    case 3:
                        console.error(text, obj);
                        break;
                    default:
                }
            }
        }
    };
};
console.log('--- useApp.js ---');

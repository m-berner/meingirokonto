const DEFAULT_LOCALE = 'de-DE';
const DEBUG = await browser.storage.local.get(['sDebug']);
export const useApp = () => {
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
        getUI: () => {
            const result = {
                lang: '',
                region: '',
                locale: ''
            };
            const uiLang = browser.i18n.getUILanguage().toLowerCase() ?? DEFAULT_LOCALE;
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
        },
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
        debug: (text, obj, logLevel = 0) => {
            if (DEBUG.sDebug && obj === undefined) {
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
            else if (DEBUG.sDebug && obj !== undefined) {
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

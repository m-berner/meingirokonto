/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * you could obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2014-2025, Martin Berner, meingirokonto@gmx.de. All rights reserved.
 */
declare global {
  interface IAddTransfer {
    cStockID: number
    cDate: number
    cUnitQuotation: number
    cAmount: number
    cDeposit?: number
    cCount: number
    cNumber?: number
    cFees: number
    cTaxes?: number
    cTax: number
    cSTax: number
    cFTax: number
    cSoli: number
    cExDay: number
    cDescription: string
    cMarketPlace: string
    cType: number
  }

  interface ITransfer extends IAddTransfer {
    cID: number
    mCompany?: string
    mSortDate?: number
  }

  interface IYearController {
    buy: number
    sell: number
    dividends: number
    deposits: number
    withdrawals: number
    taxes: number
    fees: number
    earnings: number
  }

  interface ITotalController extends IYearController {
    account: number
    depot: number
    winloss: number
    winlossPercent: number
    depotBuyValue: number
  }

  interface IAccount {
    // NOTE: correlates with CONS.DB.STORES.ACCOUNTS.FIELDS
    cID: number
    cSwift: string
    cCurrency: string
    cNumber: string
  }

  interface IBookingType {
    // NOTE: correlates with CONS.DB.STORES.BOOKING_TYPES.FIELDS
    cID: number
    cName: string
  }

  interface IBooking {
    // NOTE: correlates with CONS.DB.STORES.BOOKINGS.FIELDS
    cID: number
    cDate: string
    cDebit: number
    cCredit: number
    cDescription?: string
    cType: number
    cAccountNumber: string
  }

  interface IBackupSm {
    cVersion: number
    cDBVersion: number
    cEngine: string
  }

  interface IBackup {
    sm: IBackupSm
    account: IAccount[]
    booking: IBooking[]
    booking_type: IBookingType[]
  }

  interface IStorageLocal {
    skin?: string
    sAccountActiveId?: number
    items_per_page_stocks?: number
    items_per_page_transfers?: number
  }

  interface IUseApp{
    CONS: Readonly<{
      CURRENCIES: {
        EUR: string
        USD: string
        CODE: Map<string, string>
      }
      DATE: {
        DEFAULT: number
        DEFAULTSTR: string
        FYEAR: number
        MILLIPERDAY: number
        MILLIPERMIN: number
      }
      DB: {
        BKFN: string
        NAME: string
        STORES: {
          ACCOUNTS: {
            NAME: string
            FIELDS: {
              ID: string
              S: string
              C: string
              N: string
            }
          }
          BOOKINGS: {
            NAME: string
            FIELDS: {
              ID: string
              DAT: string
              C: string
              D: string
              DESC: string
              T: string
              AN: string
            }
          }
          BOOKING_TYPES: {
            NAME: string
            FIELDS: {
              ID: string
              N: string
            }
          }
        }
        VERSION: number
        MINVERSION: number
      }
      DEFAULTS: {
        CURRENCY: string
        LANG: string
        YEAR: number
        STORAGE: {
          skin: string
          items_per_page_stocks: number
          items_per_page_transfers: number
        }
        DRAWER_KEYS: string[]
        DRAWER_CONTROLS: {
          id: number
          title: string
          value: string
          class: string
        }[]
      }
      DIALOGS: {
        ADD_ACCOUNT: string
        ADD_BOOKING_TYPE: string
        ADD_BOOKING: string
        DELETE_BOOKING: string
        EXPORTDB: string
        IMPORTDB: string
        DELETETRANSFER: string
        UPDATETRANSFER: string
        DELETESTOCK: string
        BUYSTOCK: string
        SELLSTOCK: string
        ADDDIVIDEND: string
        SHOWDIVIDEND: string
        CONFIGSTOCK: string
        SETTING: string
      }
      EVENTS: {
        ABORT: string
        BEFOREUNLOAD: string
        CHANGE: string
        CLICK: string
        COMP: string
        DOM: string
        ERR: string
        INP: string
        KEYDOWN: string
        LOAD: string
        FOCUS: string
        BLUR: string
        SUC: string
        UPG: string
        VERSIONCHANGE: string
      }
      SETTINGS: {
        ITEMS_PER_PAGE_OPTIONS: {
          value: number
          title: string
        }[]
      }
      PERMISSIONS: {
        origins: string[]
      }
      RESOURCES: {
        SRC: string
        OK: string
        OKD: string
        CANCEL: string
        CANCELD: string
        ICON32: string
        LOGO16: string
        LOGO256: string
        MAG: string
        CALENDAR: string
        RENEW: string
        FIRST: string
        NEXT: string
        PREV: string
        LAST: string
        CB: string
        UP: string
        NS: string
        DS: string
        FI: string
        IT: string
        OT: string
        CHS: string
        CHB: string
        BK: string
        RE: string
        OB: string
        TB: string
        PY: string
        CO: string
        SE: string
        RESET: string
        ADD: string
        CHANGE: string
        DEL: string
        NO: string
        BUY: string
        SELL: string
        ND: string
        SD: string
        CONF: string
        HTTP: string
        HELP: string
        PRIVACY: string
        LICENSE: string
        INDEX: string
        ROOT: string
      }
      RESULTS: {
        ERROR: string
        SUCCESS: string
      }
      STATES: {
        DONE: string
        SRV: number
        SUCCESS: number
        PAUSE: string
        MUTATE: string
        NORENDER: string
      }
      SYSTEM: {
        COPYRIGHT: string
        FETCHTO: number
        DELAY: number
        EMAIL: string
        GET: string
        HTMLENTITY: string
        ISINLENGTH: number
        KEYS: {
          ENTER: string
          TAB: string
          T: string
          V: string
          Z: string
        }
        ERRORS: {
          CURR: string
          ERR: string
          INVALID: string
          NOCASE: string
          NODEL: string
          REQ: string
          SRV: string
          WRONGPARAM: string
          SEND: string
        }
        NULL: number
        PERCENT: number
        PROGRESSBAR: {
          MAX: number
        }
        ROWS: number
        STARTUP: number
        STORAGE_OLD: string[]
        TYPE: number
        ONCE: {
          once: boolean
        }
      }
      RECORDS: {
        CONTROLLER: {
          TOTAL: {
            efficiency: number
            returnRate: number
            buy: number
            sell: number
            dividends: number
            deposits: number
            withdrawals: number
            taxes: number
            fees: number
            earnings: number
            account: number
            depot: number
            winloss: number
            winlossPercent: number
            depotBuyValue: number
          }
        }
      }
    }>
    utcDate: (iso: string) => Date
    validators: {
      ibanRules: (msgs: string[]) => ((v: string) => string | boolean)[]
      nameRules: (msgs: string[]) => ((v: string) => string | boolean)[]
      swiftRules: (msgs: string[]) => ((v: string) => string | boolean)[]
      dateRules: (msgs: string[]) => ((v: string) => string | boolean)[]
      currencyCodeRules: (msgs: string[]) => ((v: string) => string | boolean)[]
      requiredRule: (msgs: string[]) => ((v: string) => string | boolean)[]
    };
    notice: (messages: string[]) => Promise<void>
    getUI: () => Record<string, string>
    group: (count: number, size?: number) => number[]
    offset: () => number
    isoDatePlusSeconds: (iso: string | number | Date) => number
    toNumber: (str: string | boolean | number | undefined | null) => number
    mean: (nar: number[]) => number
    dateToISO: (value: number) => string
    emptyFunction: () => void
  }
}

export const useApp = (): IUseApp => {
  const CONS = Object.freeze({
    CURRENCIES: {
      EUR: 'EUR',
      USD: 'USD',
      CODE: new Map([
        ['ar', 'ARS'],
        ['at', 'EUR'],
        ['au', 'AUD'],
        ['be', 'EUR'],
        ['bg', 'BGN'],
        ['bo', 'BOB'],
        ['br', 'BRL'],
        ['bz', 'BZD'],
        ['ca', 'CAD'],
        ['ch', 'CHF'],
        ['cl', 'CLP'],
        ['chs', 'CNY'],
        ['cht', 'CNY'],
        ['co', 'COU'],
        ['cr', 'CRC'],
        ['cs', 'CZK'],
        ['cy', 'EUR'],
        ['da', 'DKK'],
        ['de', 'EUR'],
        ['do', 'DOP'],
        ['ec', 'USD'],
        ['ee', 'EUR'],
        ['el', 'EUR'],
        ['es', 'EUR'],
        ['et', 'EUR'],
        ['fi', 'EUR'],
        ['fr', 'EUR'],
        ['gb', 'GBP'],
        ['gr', 'EUR'],
        ['gt', 'GTQ'],
        ['hk', 'HKD'],
        ['hn', 'HNL'],
        ['hu', 'HUF'],
        ['ie', 'EUR'],
        ['in', 'INR'],
        ['is', 'ISK'],
        ['it', 'EUR'],
        ['ja', 'JPY'],
        ['jm', 'JMD'],
        ['ko', 'KRW'],
        ['li', 'EUR'],
        ['lt', 'EUR'],
        ['lu', 'EUR'],
        ['mc', 'EUR'],
        ['mo', 'MOP'],
        ['mt', 'EUR'],
        ['mx', 'MXN'],
        ['ni', 'NIO'],
        ['nl', 'EUR'],
        ['no', 'NOK'],
        ['nz', 'NZD'],
        ['pa', 'PAB'],
        ['pe', 'PEN'],
        ['ph', 'PHP'],
        ['pl', 'PLN'],
        ['pr', 'USD'],
        ['pt', 'EUR'],
        ['py', 'PYG'],
        ['ro', 'RON'],
        ['ru', 'RUB'],
        ['se', 'SEK'],
        ['sg', 'SGD'],
        ['sk', 'EUR'],
        ['sl', 'EUR'],
        ['sp', 'RSD'],
        ['sv', 'USD'],
        ['tr', 'TRY'],
        ['tt', 'TTD'],
        ['tw', 'TWD'],
        ['uy', 'UYU'],
        ['ve', 'VES'],
        ['za', 'ZAR'],
        ['zw', 'ZWD']
      ])
    },
    DATE: {
      DEFAULT: 0,
      DEFAULTSTR: '1.1.1970',
      FYEAR: 1970,
      MILLIPERDAY: 86400000,
      MILLIPERMIN: 60000
    },
    DB: {
      BKFN: 'meingirokonto.json',
      NAME: 'meingirokonto.db',
      STORES: {
        // <do not change! (part of database)
        ACCOUNTS: {
          NAME: 'accounts',
          FIELDS: {
            ID: 'cID',
            S: 'cSwift',
            C: 'cCurrency',
            N: 'cNumber'
          }
        },
        BOOKINGS: {
          NAME: 'bookings',
          FIELDS: {
            ID: 'cID',
            DAT: 'cDate',
            C: 'cCredit',
            D: 'cDebit',
            DESC: 'cDescription',
            T: 'cType',
            AN: 'cAccountNumber'
          }
        },
        BOOKING_TYPES: {
          NAME: 'booking_types',
          FIELDS: {
            ID: 'cID',
            N: 'cName',
          }
        }
        // do not change! (part of database)>
      },
      VERSION: 1,
      MINVERSION: 1
    },
    DEFAULTS: {
      CURRENCY: 'EUR',
      LANG: 'de',
      YEAR: 9999,
      STORAGE: {
        skin: 'ocean',
        items_per_page_stocks: 9,
        items_per_page_transfers: 9
      },
      DRAWER_KEYS: [
        'winloss',
        'earnings',
        'deposits',
        'dividends',
        'withdrawals',
        'fees',
        'taxes',
        'account',
        'depot'
      ],
      DRAWER_CONTROLS: [
        {
          id: 0,
          title: '',
          value: '0',
          class: ''
        },
        {
          id: 1,
          title: '',
          value: '0',
          class: ''
        },
        {
          id: 2,
          title: '',
          value: '0',
          class: ''
        },
        {
          id: 3,
          title: '',
          value: '0',
          class: ''
        },
        {
          id: 4,
          title: '',
          value: '0',
          class: ''
        },
        {
          id: 5,
          title: '',
          value: '0',
          class: ''
        },
        {
          id: 6,
          title: '',
          value: '0',
          class: ''
        },
        {
          id: 7,
          title: '',
          value: '0',
          class: ''
        },
        {
          id: 8,
          title: '',
          value: '0',
          class: ''
        }
      ]
    },
    DIALOGS: {
      ADD_ACCOUNT: 'AddAccount',
      ADD_BOOKING_TYPE: 'AddBookingType',
      ADD_BOOKING: 'AddBooking',
      DELETE_BOOKING: 'DeleteBooking',
      EXPORTDB: 'exportdb',
      IMPORTDB: 'importdb',
      DELETETRANSFER: 'deletetransfer',
      UPDATETRANSFER: 'updatetransfer',
      DELETESTOCK: 'deletestock',
      BUYSTOCK: 'buystock',
      SELLSTOCK: 'sellstock',
      ADDDIVIDEND: 'adddividend',
      SHOWDIVIDEND: 'showdividend',
      CONFIGSTOCK: 'configstock',
      SETTING: 'setting'
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
      UPG: 'upgradeneeded',
      VERSIONCHANGE: 'versionchange'
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
        // {
        //   value: -1,
        //   title: 'Alle'
        // }
      ]
    },
    PERMISSIONS: {
      origins: [
        'https://www.tradegate.de/*',
        'https://www.goyax.de/*',
        'https://*.finanzen.net/*',
        'https://www.wallstreet-online.de/*',
        'https://*.aktiencheck.de/*',
        'https://www.tagesschau.de/*',
        'https://fx-rate.net/*'
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
      INDEX: 'app.html',
      ROOT: '/'
    },
    RESULTS: {
      ERROR: 'ERR',
      SUCCESS: 'SUCCESS'
    },
    STATES: {
      DONE: 'complete',
      SRV: 500,
      SUCCESS: 200,
      PAUSE: 'resting',
      MUTATE: 'mutation',
      NORENDER: 'norender'
    },
    SYSTEM: {
      COPYRIGHT: '2013-2025 Martin Berner',
      FETCHTO: 20,
      DELAY: 600,
      EMAIL: 'mailto:meingirokonto@gmx.de',
      GET: 'GET',
      HTMLENTITY:
        '(&auml;|&Auml;|&ouml;|&Ouml;|&uuml;|&Uuml;|&amp;|&eacute;|&Eacute;|&ecirc;|&Ecirc;|&oacute;|&Oacute;|&aelig;|&Aelig;)',
      ISINLENGTH: 12,
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
      NULL: 0.00001,
      PERCENT: 100,
      PROGRESSBAR: {MAX: 400},
      ROWS: 10,
      STARTUP: 2,
      STORAGE_OLD: [
        'resetconfig',
        'config',
        'reset',
        'itemsPerPage',
        'cb',
        'tb'
      ],
      TYPE: 599,
      ONCE: {once: true}
    },
    RECORDS: {
      TEMPLATES: {
      },
      CONTROLLER: {
        TOTAL: {
          efficiency: 0,
          returnRate: 0,
          buy: 0,
          sell: 0,
          dividends: 0,
          deposits: 0,
          withdrawals: 0,
          taxes: 0,
          fees: 0,
          earnings: 0,
          account: 0,
          depot: 0,
          winloss: 0,
          winlossPercent: 0,
          depotBuyValue: 0
        }
      }
    }
  })
  const offset = (): number => {
    return new Date().getTimezoneOffset() * 60000
    // - 7.200.000 we are UTC/GMT + 2
    // DB to store -offset
    // Store to DB +offset
  }
  return {
    CONS,
    utcDate: (iso: string): Date => {
      const tzo = new Date().getTimezoneOffset() / 60
      let result = ''
      if (tzo < 0 && tzo > -10) {
        result = `+0${-tzo}`
      } else if (tzo < 0) {
        result = `+${-tzo}`
      } else if (tzo >= 0 && tzo < 10) {
        result = `-0${tzo}`
      } else if (tzo > 9) {
        result = `-${tzo}`
      } 
      return new Date(`${iso}T00:00:00.000${result}:00`)
    },
    validators: {
      ibanRules: msgs => {
        return [
          v => v !== null || msgs[0],
          v => (v !== null && v.length < 37) || msgs[1],
          v => v.match(/^(^[A-Z]{2}[0-9|\s]{20,36})/g) !== null || msgs[2]
        ]
      },
      nameRules: msgs => {
        return [
          v => v !== null || msgs[0],
          v => (v !== null && v.length < 16) || msgs[1],
          v => v.match(/[^a-zA-Z]/g) === null || msgs[2]
        ]
      },
      swiftRules: msgs => {
        return [
          v => v !== null || msgs[0],
          v => (v !== null && v.length < 13) || msgs[1],
          v => v.match(/[^a-zA-Z0-9]/g) === null || msgs[2]
        ]
      },
      dateRules: msgs => {
        return [
          v => (v !== null && v.match(/^([1-2])?[0-9]{3}-(1[0-2]|0?[1-9])-(3[01]|[12][0-9]|0?[1-9])$/g) !== null) || msgs[0]
        ]
      },
      currencyCodeRules: msgs => {
        return [
          v => v !== null || msgs[0],
          v => (v !== null && v.length === 3) || msgs[1],
          v => v.match(/[^a-zA-Z]/g) === null || msgs[2]
        ]
      },
      requiredRule: msgs => {
        return [
          v => v !== null || msgs[0]
        ]
      }
    },
    notice: async (messages: string[]): Promise<void> => {
      const msg = messages.join('\n')
      const notificationOption: browser.notifications.CreateNotificationOptions =
        {
          type: 'basic',
          iconUrl: '_assets/icon16.png',
          title: 'MeinGiroKonto',
          message: msg
        }
      await browser.notifications.create(notificationOption)
    },
    getUI: (): Record<string, string> => {
      let code: string
      const result: Record<string, string> = {
        lang: '',
        region: '',
        locale: '',
        cur: '',
        curusd: '',
        cureur: '',
        fontSize: '0'
      }
      const uiLang: string =
        browser.i18n.getUILanguage().toLowerCase() ?? CONS.DEFAULTS.LANG
      if (uiLang.includes('-')) {
        result.lang = uiLang.split('-')[0]
        result.region = uiLang.split('-')[1].toUpperCase()
        result.locale = uiLang
        code =
          CONS.CURRENCIES.CODE.get(uiLang.split('-')[1]) ?? CONS.DEFAULTS.CURRENCY
        result.cur = code ?? CONS.DEFAULTS.CURRENCY
      } else {
        result.lang = uiLang
        result.region = uiLang.toUpperCase()
        result.locale = uiLang + '-' + uiLang.toUpperCase()
        code = CONS.CURRENCIES.CODE.get(uiLang) ?? CONS.DEFAULTS.CURRENCY
        result.cur = code ?? CONS.DEFAULTS.CURRENCY
      }
      result.cureur = result.cur + CONS.CURRENCIES.EUR
      result.curusd = result.cur + CONS.CURRENCIES.USD
      result.fontSize = window
        .getComputedStyle(document.body, null)
        .getPropertyValue('font-size')
      return result
    },
    group: (count: number, size = 2): number[] => {
      const ar: number[] = []
      const isOdd = count % 2 === 1
      const part = Math.ceil(count / size)
      for (let i = 0; i < size; i++) {
        if (isOdd && i === size - 1) {
          ar.push(part - 1)
        } else {
          ar.push(part)
        }
      }
      return ar
    },
    offset,
    isoDatePlusSeconds: (iso: string | number | Date): number => {
      return new Date(iso).getTime() + (Date.now() % 86400)
    },
    toNumber: (str: string | boolean | number | undefined | null): number => {
      let result = 0
      if (str !== null && str !== undefined) {
        const a = str.toString().replace(/,$/g, '')
        const b = a.split(',')
        if (b.length === 2) {
          const tmp2 = a
            .trim()
            .replace(/\s|\.|\t|%/g, '')
            .replace(',', '.')
          result = Number.isNaN(Number.parseFloat(tmp2))
            ? 0
            : Number.parseFloat(tmp2)
        } else if (b.length > 2) {
          let tmp: string = ''
          for (let i = b.length - 1; i > 0; i--) {
            tmp += b[i]
          }
          const tmp2 = tmp + '.' + b[0]
          result = Number.isNaN(Number.parseFloat(tmp2))
            ? 0
            : Number.parseFloat(tmp2)
        } else {
          result = Number.isNaN(parseFloat(b[0])) ? 0 : Number.parseFloat(b[0])
        }
      }
      return result
    },
    mean: (nar: number[]): number => {
      let sum = 0
      let len: number = nar.length
      let n: number
      for (n of nar) {
        if (n !== 0 && !Number.isNaN(n)) {
          sum += n
        } else {
          len--
        }
      }
      return len > 0 ? sum / len : 0
    },
    dateToISO: (value: number): string => {
      return new Date(value).toISOString().substring(0, 10)
    },
    emptyFunction: (): void => {
    }
  }
}

console.log('--- useApp.js ---')

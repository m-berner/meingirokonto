/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * you could obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2014-2025, Martin Berner, meingirokonto@gmx.de. All rights reserved.
 */
declare global {
  type TIDBRequestEvent = Event & { target: IDBRequest }

  interface IUrlWithName {
    name: string
    url: string
  }

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
    cID: number
    cSwift: string
    cCurrency: string
    cAccountNumber: string
  }

  interface IBookingType {
    cID: number
    cName: string
  }

  interface IBooking {
    cID: number
    cDate: string
    cDebit: number
    cCredit: number
    cDescription?: string
    cType: number
    cAccountNumber: number
  }

  interface IDrawerControls {
    id: number
    title: string
    value: string
    class: string
  }

  interface IBackupSm {
    cVersion: number
    cDBVersion: number
    cDBCurrency: string
    cEngine: string
  }

  interface IBackup {
    sm: IBackupSm
    account: IAccount[]
    booking: IBooking[]
    booking_type: IBookingType[]
  }

  interface IStorageLocal {
    service?: IUrlWithName
    skin?: string
    indexes?: string[]
    materials?: string[]
    markets?: string[]
    exchanges?: string[]
    sAccountActiveId?: number
    items_per_page_stocks?: number
    items_per_page_transfers?: number
  }

  interface IConstants {
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
      RECORD_TYPES: {
        // do not change! (part of database records)
        BUY: number
        CUR: number
        DIV: number
        DEPOSIT: number
        WITHDRAWAL: number
        SELL: number
        PER: number
        UNDEFINED: number
        // do not change! (part of database records)
      }
      STORES: {
        ACCOUNT: string
        BOOKING_TYPE: string
        BOOKING: string
      }
      VERSION: number
      MINVERSION: number
    }
    DEFAULTS: {
      CURRENCY: string
      LANG: string
      YEAR: number
      STORAGE: {
        service: { name: string, url: string }
        skin: string
        indexes: string[]
        materials: string[]
        markets: string[]
        exchanges: string[]
        partner: boolean
        items_per_page_stocks: number
        items_per_page_transfers: number
      },
      DRAWER_KEYS: string[]
      DRAWER_CONTROLS: IDrawerControls[]
    }
    DIALOGS: Record<string, string>
    EVENTS: Record<string, string>
    SETTINGS: {
      MP: string
      EX: string
      INDEXES: Record<string, string>
      MATERIALS: Map<string, string>
      ITEMS_PER_PAGE_OPTIONS: Array<{
        value: number
        title: string
      }>
    }
    PERMISSIONS: {
      origins: string[]
    }
    RESOURCES: Record<string, string>
    RESULTS: Record<string, string>
    SERVICES: {
      goyax: {
        NAME: string
        HOME: string
        QUOTE: string
        DELAY: number
      }
      fnet: {
        NAME: string
        HOME: string
        INDEXES: string
        QUOTE: string
        DATES: string
        MATERIALS: string
        GM: string
        QF: string
        DELAY: number
      }
      wstreet: {
        NAME: string
        HOME: string
        QUOTE: string
        DELAY: number
      }
      acheck: {
        NAME: string
        HOME: string
        QUOTE: string
        DELAY: number
      }
      ard: {
        NAME: string
        HOME: string
        QUOTE: string
        DELAY: number
      }
      fx: {
        NAME: string
        HOME: string
        EXCHANGE: string
        DELAY: number
      }
      tgate: {
        NAME: string
        HOME: string
        QUOTE: string
        CHSURL: string
        CHBURL: string
        CHS: string[]
        CHB: string[]
        CHANGES: Record<string, number>
        DELAY: number
      }
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
      KEYS: Record<string, string>
      ERRORS: Record<string, string>
      NULL: number
      PERCENT: number
      PROGRESSBAR: { MAX: number }
      ROWS: number
      STORAGE_OLD: string[],
      STARTUP: number
      TYPE: number
      ONCE: { once: boolean }
    }
    RECORDS: {
      TEMPLATES: {
        //STOCK: IStock
        MSTOCK: Record<string, number | boolean>
        TRANSFER: ITransfer
      }
      TYPES: Record<string, number>
      CONTROLLER: {
        TOTAL: ITotalController
      }
    }
  }

  interface IUseApp {
    CONS: IConstants,
    validators: {
      ibanRules: (messages: string[]) => Array<(v: string) => boolean | string>
      nameRules: (messages: string[]) => Array<(v: string) => boolean | string>
      swiftRules: (messages: string[]) => Array<(v: string) => boolean | string>
      dateRules: (messages: string[]) => Array<(v: string) => boolean | string>
      currencyCodeRules: (messages: string[]) => Array<(v: string) => boolean | string>
      requiredRule: (messages: string[]) => Array<(v: string) => boolean | string>
    },
    //validators: Record<string, Array<(v: string | number) => boolean | string>>,
    //migrateStock: (stock: IStock) => IStock
    //migrateTransfer: (transfer: ITransfer) => ITransfer
    notice: (messages: string[]) => void
    getUI: () => Record<string, string>
    group: (count: number, size?: number) => number[]
    offset: () => number
    utcDate: (iso: string) => Date
    isoDatePlusSeconds: (iso: string | number | Date) => number
    toNumber: (
      str: string | boolean | number | undefined | null
    ) => number
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
      RECORD_TYPES: {
        // do not change! (part of database records)
        BUY: 1,
        CUR: 8,
        DIV: 3,
        DEPOSIT: 4,
        WITHDRAWAL: 5,
        SELL: 2,
        PER: 7,
        UNDEFINED: -1
        // do not change! (part of database records)
      },
      STORES: {
        // <do not change! (part of database)
        ACCOUNT: 'account',
        BOOKING: 'booking',
        BOOKING_TYPE: 'booking_type',
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
        service: {name: 'fnet', url: 'https://www.finanzen.net/aktienkurse/'},
        skin: 'ocean',
        indexes: ['dax', 'dow'],
        materials: ['au', 'brent'],
        markets: ['Frankfurt', 'XETRA'],
        exchanges: ['EURUSD'],
        partner: false,
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
      FADEINSTOCK: 'fadeinstock',
      ADDDEPOSIT: 'adddeposit',
      ADDWITHDRAWAL: 'addwithdrawal',
      DAILYCHANGES: 'dailychanges',
      DAILYCHANGESALL: 'dailychangesall',
      EXPORTDB: 'exportdb',
      IMPORTDB: 'importdb',
      SHOWACCOUNTING: 'showaccoutning',
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
      MP: '__MP__',
      EX: '__EX__',
      INDEXES: {
        dax: 'DAX',
        dow: 'Dow Jones',
        nasdaq: 'NASDAQ Comp.',
        nikkei: 'NIKKEI 225',
        hang: 'Hang Seng',
        ibex: 'IBEX 35',
        straits: 'Straits Times',
        asx: 'Australia All Ordinaries',
        rts: 'RTS',
        bovespa: 'BOVESPA',
        sensex: 'SENSEX',
        sci: 'Shanghai Composite',
        ftse: 'FTSE 100',
        smi: 'SMI',
        cac: 'CAC 40',
        stoxx: 'Euro Stoxx 50',
        tsx: 'S&P/TSX',
        sp: 'S&P 500'
      },
      MATERIALS: new Map([
        ['Goldpreis', 'au'],
        ['Silberpreis', 'ag'],
        ['Ölpreis (Brent)', 'brent'],
        ['Ölpreis (WTI)', 'wti'],
        ['Kupferpreis', 'cu'],
        ['Platinpreis', 'pt'],
        ['Aluminiumpreis', 'al'],
        ['Nickelpreis', 'ni'],
        ['Zinnpreis', 'sn'],
        ['Bleipreis', 'pb'],
        ['Palladiumpreis', 'pd']
      ]),
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
      SRC: '_assets',
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
    SERVICES: {
      goyax: {
        NAME: 'Goyax',
        HOME: 'https://www.goyax.de/',
        QUOTE: 'https://www.goyax.de/aktien/',
        DELAY: 50
      },
      fnet: {
        NAME: 'Finanzen.Net',
        HOME: 'https://www.finanzen.net/aktienkurse/',
        INDEXES: 'https://www.finanzen.net/indizes/',
        QUOTE: 'https://www.finanzen.net/suchergebnis.asp?_search=',
        DATES: 'https://www.finanzen.net/termine/',
        MATERIALS: 'https://www.finanzen.net/rohstoffe/',
        GM: 'Hauptversammlung',
        QF: 'Quartalszahlen',
        DELAY: 750
      },
      wstreet: {
        NAME: 'Wallstreet-Online',
        HOME: 'https://www.wallstreet-online.de',
        QUOTE:
          'https://www.wallstreet-online.de/_rpc/json/search/auto/searchInst/',
        DELAY: 50
      },
      acheck: {
        NAME: 'Aktien Check',
        HOME: 'https://m.aktiencheck.de/',
        QUOTE: 'https://m.aktiencheck.de/quotes/suche/?search=',
        DELAY: 50
      },
      ard: {
        NAME: 'ARD',
        HOME: 'https://www.tagesschau.de/wirtschaft/boersenkurse/',
        QUOTE:
          'https://www.tagesschau.de/wirtschaft/boersenkurse/suche/?suchbegriff=',
        DELAY: 50
      },
      fx: {
        NAME: 'fx-rate',
        HOME: 'https://fx-rate.net/qwsaq',
        EXCHANGE: 'https://fx-rate.net/calculator/?c_input=',
        DELAY: 50
      },
      tgate: {
        NAME: 'Tradegate', // changes list, new stock
        HOME: 'https://www.tradegate.de/',
        QUOTE: 'https://www.tradegate.de/orderbuch.php?isin=',
        CHSURL: 'https://www.tradegate.de/indizes.php?index=',
        CHBURL: 'https://www.tradegate.de/indizes.php?buchstabe=',
        CHS: [
          'DE000A1EXRV0',
          'DE000A1EXRY4',
          'DE000A1EXRW8',
          'DE000A1EXRX6',
          'EU0009658145',
          'DE000A0SNK21',
          'US0000000002'
        ],
        CHB: [
          '1',
          '2',
          '3',
          '4',
          '5',
          '7',
          '8',
          '9',
          'A',
          'B',
          'C',
          'D',
          'E',
          'F',
          'G',
          'H',
          'I',
          'J',
          'K',
          'L',
          'M',
          'N',
          'O',
          'P',
          'Q',
          'R',
          'S',
          'T',
          'U',
          'V',
          'W',
          'X',
          'Y',
          'Z',
          'Ö'
        ],
        CHANGES: {
          SMALL: 1,
          BIG: 2,
          STEP: 8,
          NAME: 2,
          VALUE: 7
        },
        DELAY: 50
      }
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
        STOCK: {
          cID: 0,
          cCompany: '',
          cISIN: '',
          cWKN: '',
          cSym: '',
          cFirstPage: 0,
          cFadeOut: 0,
          cQuarterDay: 0,
          cMeetingDay: 0,
          cURL: '',
          mPortfolio: 0,
          mBuyValue: 0,
          mValue: 0,
          mMin: 0,
          mMax: 0,
          mChange: 0,
          mEuroChange: 0,
          mDividendYielda: 0,
          mDividendYeara: 0,
          mDividendYieldb: 0,
          mDividendYearb: 0,
          mRealDividend: 0,
          mRealBuyValue: 0,
          mDeleteable: true
        },
        MSTOCK: {
          mPortfolio: 0,
          mBuyValue: 0,
          mValue: 0,
          mMin: 0,
          mMax: 0,
          mChange: 0,
          mEuroChange: 0,
          mDividendYielda: 0,
          mDividendYeara: 0,
          mDividendYieldb: 0,
          mDividendYearb: 0,
          mRealDividend: 0,
          mRealBuyValue: 0,
          mDeleteable: true,
          mAskDates: true
        },
        TRANSFER: {
          cID: 0,
          cDate: 0,
          cExDay: 0,
          cCount: 0,
          cUnitQuotation: 0,
          cStockID: 0,
          cAmount: 0,
          cFees: 0,
          cSTax: 0,
          cFTax: 0,
          cTax: 0,
          cSoli: 0,
          cType: 0,
          cMarketPlace: '',
          cDescription: '',
          mCompany: '',
          mSortDate: 0
        }
      },
      TYPES: {
        TRANSFER: 11,
        FEE: 12,
        STAX: 13,
        FTAX: 14,
        TAX: 15,
        SOLI: 16
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

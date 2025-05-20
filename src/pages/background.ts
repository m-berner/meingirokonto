/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * you could obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2014-2025, Martin Berner, kontenmanager@gmx.de. All rights reserved.
 */
declare global {
  interface IAccount {
    // NOTE: correlates with CONS.DB.STORES.ACCOUNTS.FIELDS
    cID: number
    cSwift: string
    cNumber: string
    cLogoUrl: string
    cStockAccount: boolean
  }

  interface IBookingType {
    // NOTE: correlates with CONS.DB.STORES.BOOKING_TYPES.FIELDS
    cID: number
    cName: string
    cAccountNumberID: number
  }

  interface IBooking {
    cID: number
    cDate: string
    cExDate: string
    cDebit: number
    cCredit: number
    cDescription?: string
    cCount: number
    cBookingTypeID: number
    cAccountNumberID: number
    cStockID: number
    cSoli: number
    cTax: number
    cFee: number
    cSourceTax: number
    cTransactionTax: number
    cMarketPlace: string
  }

  interface IStock {
    cID: number
    cCompany: string
    cISIN: string
    cWKN: string
    cSymbol: string
    cFirstPage: number
    cFadeOut: number
    cMeetingDay: number
    cQuarterDay: number
    cURL: string
  }

  interface IBackup {
    sm: {
      cVersion: number
      cDBVersion: number
      cEngine: string
    }
    accounts: IAccount[]
    bookings: IBooking[]
    transfers: IBooking[]
    booking_types: IBookingType[]
    stocks: IStock[]
  }

  interface IStorageLocal {
    sActiveAccountId: number
    sBookingsPerPage: number
    sStocksPerPage: number
    sPartner: boolean
    sDebug: boolean
    sSkin: string
    sService: string
    sExchanges: string[]
    sMaterials: string[]
    sIndexes: string[]
    sMarkets: string[]
  }

  interface ISettings {
    activeAccountId: number
    bookingsPerPage: number
    stocksPerPage: number
    partner: boolean
    debug: boolean
    skin: string
    service: string
    exchanges: string[]
    materials: string[]
    indexes: string[]
    markets: string[]
  }
}

interface IUseApp {
  CONS: Readonly<{
    DATE: {
      DEFAULT: number
      DEFAULT_ISO: string
      DEFAULT_YEAR: number
      MILLI_PER_DAY: number
      MILLI_PER_MIN: number
    }
    DB: {
      NAME: string
      STORES: {
        ACCOUNTS: {
          NAME: string
          FIELDS: {
            ID: keyof IAccount
            SWIFT: keyof IAccount
            LOGO_URL: keyof IAccount
            NUMBER: keyof IAccount
            STOCK_ACCOUNT: keyof IAccount
          }
        }
        BOOKINGS: {
          NAME: string
          FIELDS: {
            ID: keyof IBooking
            DATE: keyof IBooking
            EX_DATE: keyof IBooking
            COUNT: keyof IBooking
            CREDIT: keyof IBooking
            DEBIT: keyof IBooking
            DESCRIPTION: keyof IBooking
            BOOKING_TYPE_ID: keyof IBooking
            ACCOUNT_NUMBER_ID: keyof IBooking
            STOCK_ID: keyof IBooking
            SOLI: keyof IBooking
            MARKET_PLACE: keyof IBooking
            TAX: keyof IBooking
            FEE: keyof IBooking
            SOURCE_TAX: keyof IBooking
            TRANSACTION_TAX: keyof IBooking
          }
        }
        BOOKING_TYPES: {
          NAME: string
          FIELDS: {
            ID: keyof IBookingType
            NAME: keyof IBookingType
            ACCOUNT_NUMBER: keyof IBookingType
          }
        }
        STOCKS: {
          NAME: string
          FIELDS: {
            ID: keyof IStock
            ISIN: keyof IStock
            SYMBOL: keyof IStock
            FADE_OUT: keyof IStock
            FIRST_PAGE: keyof IStock
            URL: keyof IStock
            MEETING_DAY: keyof IStock
            QUARTER_DAY: keyof IStock
            WKN: keyof IStock
            COMPANY: keyof IStock
          }
        }
      }
      MIN_VERSION: number
      START_VERSION: number
    }
    DEFAULTS: {
      BACKGROUND: string
      CURRENCY: string
      LANG: string
      LOCALE: string
      YEAR: number
      STORAGE: {
        ACTIVE_ACCOUNT_ID: number
        BOOKINGS_PER_PAGE: number
        STOCKS_PER_PAGE: number
        PARTNER: boolean
        DEBUG: boolean
        SKIN: string
        SERVICE: string
        EXCHANGES: string[]
        MATERIALS: string[]
        INDEXES: string[]
        MARKETS: string[]
      }
    }
    DIALOGS: {
      ADD_ACCOUNT: string
      DELETE_ACCOUNT: string
      ADD_BOOKING_TYPE: string
      ADD_BOOKING: string
      DELETE_BOOKING: string
      DELETE_BOOKING_TYPE: string
      EXPORT_DATABASE: string
      IMPORT_DATABASE: string
      SHOW_ACCOUNTING: string
      SETTING: string
    }
    LOGOS: {
      NO_LOGO: string
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
    }
    MESSAGES: {
      GS: string
    }
    SERVICES: {
      [p: string]: Partial<{
        NAME: string
        HOME: string
        QUOTE: string
        INDEXES: string
        DATES: string
        MATERIALS: string
        GM: string
        QF: string
        CHSURL: string
        CHBURL: string
        CHS: string[]
        CHB: string[]
        EXCHANGE: string
        DELAY: number
      }>
    }
    SETTINGS: {
      ITEMS_PER_PAGE_OPTIONS: {
        value: number
        title: string
      }[]
      MARKETS_TAB: string
      EXCHANGES_TAB: string
      INDEXES: Record<string, string>
      MATERIALS: Record<string, string>
      MATERIALS_ORG: Map<string, string>
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
    SYSTEM: {
      COPYRIGHT: string
      MAILTO: string
      GET: string
      HTML_ENTITY: string
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
      ONCE: {
        once: boolean
      }
    }
  }>
  VALIDATORS: Readonly<{
    ibanRules: (msgs: string[]) => ((v: string) => string | boolean)[]
    nameRules: (msgs: string[]) => ((v: string) => string | boolean)[]
    swiftRules: (msgs: string[]) => ((v: string) => string | boolean)[]
    dateRules: (msgs: string[]) => ((v: string) => string | boolean)[]
    currencyCodeRules: (msgs: string[]) => ((v: string) => string | boolean)[]
    requiredRule: (msgs: string[]) => ((v: string) => string | boolean)[]
    brandNameRules: (msgs: string[]) => ((v: string) => string | boolean)[]
  }>
  notice: (msgs: string[]) => Promise<void>
  utcDate: (iso: string) => Date
  initStorageLocal: () => Promise<void>
  log: (msg: string, mode?: { info: unknown }) => void
}

export const useApp = (): IUseApp => {
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
              EX_DATE: 'cExDate',
              COUNT: 'cCount',
              CREDIT: 'cCredit',
              DEBIT: 'cDebit',
              DESCRIPTION: 'cDescription',
              BOOKING_TYPE_ID: 'cBookingTypeID',
              ACCOUNT_NUMBER_ID: 'cAccountNumberID',
              STOCK_ID: 'cStockID',
              SOLI: 'cSoli',
              MARKET_PLACE: 'cMarketPlace',
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
          STOCKS_PER_PAGE: 9,
          DEBUG: false,
          SKIN: 'ocean',
          MATERIALS: ['au', 'brent'],
          INDEXES: ['dax', 'dow'],
          EXCHANGES: ['EURUSD'],
          MARKETS: ['Frankfurt', 'XETRA'],
          SERVICE: 'wstreet',
          PARTNER: false
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
          ]
        },
        fx: {
          NAME: 'fx-rate',
          HOME: 'https://fx-rate.net/qwsaq',
          EXCHANGE: 'https://fx-rate.net/calculator/?c_input=',
          DELAY: 50
        }
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
        ],
        MARKETS_TAB: 'markets',
        EXCHANGES_TAB: 'exchanges',
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
        MATERIALS: {
          au: 'Goldpreis',
          ag: 'Silberpreis',
          brent: 'Ölpreis (Brent)',
          wti: 'Ölpreis (WTI)',
          cu: 'Kupferpreis',
          pt: 'Platinpreis',
          al: 'Aluminiumpreis',
          ni: 'Nickelpreis',
          sn: 'Zinnpreis',
          pb: 'Bleipreis',
          pd: 'Palladiumpreis'
        },
        MATERIALS_ORG: new Map([
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
        HTML_ENTITY:
          '(&auml|&Auml;|&ouml;|&Ouml;|&uuml;|&Uuml;|&amp;|&eacute;|&Eacute;|&ecirc;|&Ecirc;|&oacute;|&Oacute;|&aelig;|&Aelig;)',
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
        ONCE: {once: true}
      }
    }),
    VALIDATORS: Object.freeze({
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
          v => (v !== null && v.length < 32) || msgs[1],
          v => v.match(/[^a-zA-Z\-äöüÄÖÜ]/g) === null || msgs[2]
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
      },
      brandNameRules: msgs => {
        return [
          v => v !== null || msgs[0]
        ]
      }
    }),
    notice: async (messages) => {
      const msg = messages.join('\n')
      const notificationOption: browser.notifications.CreateNotificationOptions =
        {
          type: 'basic',
          iconUrl: 'assets/icon16.png',
          title: 'KontenManager',
          message: msg
        }
      await browser.notifications.create(notificationOption)
    },
    utcDate: (iso) => {
      return new Date(`${iso}T00:00:00.000`)
    },
    initStorageLocal: async () => {
      const storageLocal: Partial<IStorageLocal> = await browser.storage.local.get()
      if (storageLocal.sSkin === undefined) {
        await browser.storage.local.set({sSkin: CONS.DEFAULTS.STORAGE.SKIN})
      }
      if (storageLocal.sActiveAccountId === undefined) {
        await browser.storage.local.set({sActiveAccountId: CONS.DEFAULTS.STORAGE.ACTIVE_ACCOUNT_ID})
      }
      if (storageLocal.sBookingsPerPage === undefined) {
        await browser.storage.local.set({sBookingsPerPage: CONS.DEFAULTS.STORAGE.BOOKINGS_PER_PAGE})
      }
      if (storageLocal.sStocksPerPage === undefined) {
        await browser.storage.local.set({sStocksPerPage: CONS.DEFAULTS.STORAGE.STOCKS_PER_PAGE})
      }
      if (storageLocal.sPartner === undefined) {
        await browser.storage.local.set({sPartner: CONS.DEFAULTS.STORAGE.PARTNER})
      }
      if (storageLocal.sService === undefined) {
        await browser.storage.local.set({sService: CONS.DEFAULTS.STORAGE.SERVICE})
      }
      if (storageLocal.sDebug === undefined) {
        await browser.storage.local.set({sDebug: CONS.DEFAULTS.STORAGE.DEBUG})
      }
      if (storageLocal.sExchanges === undefined) {
        await browser.storage.local.set({sExchanges: CONS.DEFAULTS.STORAGE.EXCHANGES})
      }
      if (storageLocal.sIndexes === undefined) {
        await browser.storage.local.set({sIndexes: CONS.DEFAULTS.STORAGE.INDEXES})
      }
      if (storageLocal.sMarkets === undefined) {
        await browser.storage.local.set({sMarkets: CONS.DEFAULTS.STORAGE.MARKETS})
      }
      if (storageLocal.sMaterials === undefined) {
        await browser.storage.local.set({sMaterials: CONS.DEFAULTS.STORAGE.MATERIALS})
      }
    },
    log: async (msg, mode = {info: null}) => {
      const storageLocal: Partial<IStorageLocal> = await browser.storage.local.get(['sDebug'])
      if (storageLocal.sDebug) {
        if (mode.info !== null) {
          console.info(msg, mode.info)
        } else {
          console.log(msg)
        }
      }
    }
  }
}

const {CONS, initStorageLocal, log} = useApp()

if (window.location.href.includes(CONS.DEFAULTS.BACKGROUND)) {
  // NOTE: onInstall runs at addon install, addon update and firefox update
  const onInstall = async (): Promise<void> => {
    log('BACKGROUND: onInstall')
    const onSuccess = (ev: Event): void => {
      if (ev.target instanceof IDBRequest) {
        ev.target.result.close()
      }
      log('BACKGROUND: onInstall: onSuccess', {info: ev})
    }
    const onError = (ev: Event): void => {
      console.error('BACKGROUND: onError: ', ev)
    }
    const onUpgradeNeeded = async (ev: Event): Promise<void> => {
      if (ev instanceof IDBVersionChangeEvent) {
        log('BACKGROUND: onInstall: onUpgradeNeeded', {info: ev.newVersion})
        const createDB = (): void => {
          log('BACKGROUND: onInstall: onUpgradeNeeded: createDB')
          const requestCreateAccountStore = dbOpenRequest.result.createObjectStore(
            CONS.DB.STORES.ACCOUNTS.NAME,
            {
              keyPath: CONS.DB.STORES.ACCOUNTS.FIELDS.ID,
              autoIncrement: true
            })
          const requestCreateBookingStore = dbOpenRequest.result.createObjectStore(
            CONS.DB.STORES.BOOKINGS.NAME,
            {
              keyPath: CONS.DB.STORES.BOOKINGS.FIELDS.ID,
              autoIncrement: true
            }
          )
          const requestCreateBookingTypeStore = dbOpenRequest.result.createObjectStore(
            CONS.DB.STORES.BOOKING_TYPES.NAME,
            {
              keyPath: CONS.DB.STORES.BOOKING_TYPES.FIELDS.ID,
              autoIncrement: true
            }
          )
          const requestCreateStockStore = dbOpenRequest.result.createObjectStore(
            CONS.DB.STORES.STOCKS.NAME,
            {
              keyPath: CONS.DB.STORES.STOCKS.FIELDS.ID,
              autoIncrement: true
            }
          )
          requestCreateAccountStore.createIndex(`${CONS.DB.STORES.ACCOUNTS.NAME}_uk1`, CONS.DB.STORES.ACCOUNTS.FIELDS.ID, {unique: true})
          requestCreateAccountStore.createIndex(`${CONS.DB.STORES.ACCOUNTS.NAME}_uk2`, CONS.DB.STORES.ACCOUNTS.FIELDS.NUMBER, {unique: true})
          requestCreateBookingTypeStore.createIndex(`${CONS.DB.STORES.BOOKING_TYPES.NAME}_uk1`, CONS.DB.STORES.BOOKING_TYPES.FIELDS.ID, {unique: true})
          requestCreateBookingTypeStore.createIndex(`${CONS.DB.STORES.BOOKING_TYPES.NAME}_k1`, CONS.DB.STORES.BOOKING_TYPES.FIELDS.NAME, {unique: false})
          requestCreateBookingTypeStore.createIndex(`${CONS.DB.STORES.BOOKING_TYPES.NAME}_k2`, CONS.DB.STORES.BOOKING_TYPES.FIELDS.ACCOUNT_NUMBER, {unique: false})
          requestCreateBookingStore.createIndex(`${CONS.DB.STORES.BOOKINGS.NAME}_uk1`, CONS.DB.STORES.BOOKINGS.FIELDS.ID, {unique: true})
          requestCreateBookingStore.createIndex(`${CONS.DB.STORES.BOOKINGS.NAME}_k1`, CONS.DB.STORES.BOOKINGS.FIELDS.DATE, {unique: false})
          requestCreateBookingStore.createIndex(`${CONS.DB.STORES.BOOKINGS.NAME}_k2`, CONS.DB.STORES.BOOKINGS.FIELDS.BOOKING_TYPE_ID, {unique: false})
          requestCreateBookingStore.createIndex(`${CONS.DB.STORES.BOOKINGS.NAME}_k3`, CONS.DB.STORES.BOOKINGS.FIELDS.ACCOUNT_NUMBER_ID, {unique: false})
          requestCreateBookingStore.createIndex(`${CONS.DB.STORES.BOOKINGS.NAME}_k4`, CONS.DB.STORES.BOOKINGS.FIELDS.STOCK_ID, {unique: false})
          requestCreateStockStore.createIndex(`${CONS.DB.STORES.STOCKS.NAME}_uk1`, CONS.DB.STORES.STOCKS.FIELDS.ID, {unique: true})
          requestCreateStockStore.createIndex(`${CONS.DB.STORES.STOCKS.NAME}_uk2`, CONS.DB.STORES.STOCKS.FIELDS.ISIN, {unique: true})
          requestCreateStockStore.createIndex(`${CONS.DB.STORES.STOCKS.NAME}_uk3`, CONS.DB.STORES.STOCKS.FIELDS.SYMBOL, {unique: true})
          requestCreateStockStore.createIndex(`${CONS.DB.STORES.STOCKS.NAME}_k1`, CONS.DB.STORES.STOCKS.FIELDS.FADE_OUT, {unique: false})
          requestCreateStockStore.createIndex(`${CONS.DB.STORES.STOCKS.NAME}_k2`, CONS.DB.STORES.STOCKS.FIELDS.FIRST_PAGE, {unique: false})
        }
        // const updateDB = (): void => {
        //   log('BACKGROUND: onInstall: onUpgradeNeeded: updateDB')
        //   // const optFalse: IDBIndexParameters = {unique: false}
        //   // const onSuccessStocks = (ev: TIDBRequestEvent): void => {
        //   //   log(
        //   //     'BACKGROUND: onInstall: onUpgradeNeeded: createDB: onSuccessStocks'
        //   //   )
        //   //   const cursor: IDBCursorWithValue | null = ev.target.result
        //   //   if (cursor !== null) {
        //   //     const stock: IStock = cursor.value
        //   //     cursor.update(migrateStock({...stock}))
        //   //     cursor.continue()
        //   //   } else {
        //   //     stocksOpenCursorRequest?.removeEventListener(
        //   //       CONS.EVENTS.SUC,
        //   //       onSuccessStocks,
        //   //       false
        //   //     )
        //   //     const onSuccessTransfers = (ev: TIDBRequestEvent): void => {
        //   //       log(
        //   //         'BACKGROUND: onUpgradeNeeded: fCreateDB: onSuccessTransfers'
        //   //       )
        //   //       const cursor: IDBCursorWithValue | null = ev.target.result
        //   //       if (cursor !== null) {
        //   //         const transfer: ITransfer = cursor.value
        //   //         cursor.update(migrateTransfer({...transfer}))
        //   //         cursor.continue()
        //   //       } else {
        //   //         stocksOpenCursorRequest?.removeEventListener(
        //   //           CONS.EVENTS.SUC,
        //   //           onSuccessTransfers,
        //   //           false
        //   //         )
        //   //       }
        //   //     }
        //   //     if (dbOpenRequest?.transaction === null) {
        //   //       console.error('BACKGROUND: open database error')
        //   //     } else if (
        //   //       !dbOpenRequest.transaction
        //   //         ?.objectStore(CONS.DB.STORES.S)
        //   //         .indexNames.contains('stocks_k2')
        //   //     ) {
        //   //       dbOpenRequest.transaction
        //   //         ?.objectStore(CONS.DB.STORES.S)
        //   //         .createIndex('stocks_k2', 'cFadeOut', optFalse)
        //   //     }
        //   //     const requestTransfersOpenCursor:
        //   //       | IDBRequest<IDBCursorWithValue | null>
        //   //       | undefined = dbOpenRequest.transaction?.objectStore(CONS.DB.STORES.T).openCursor()
        //   //     requestTransfersOpenCursor?.addEventListener(
        //   //       CONS.EVENTS.SUC,
        //   //       onSuccessTransfers,
        //   //       false
        //   //     )
        //   //   }
        //   // }
        //   // const onErrorStocks = (err: ErrorEvent): void => {
        //   //   stocksOpenCursorRequest?.removeEventListener(
        //   //     CONS.EVENTS.ERR,
        //   //     onError,
        //   //     false
        //   //   )
        //   //   console.error(err.message)
        //   // }
        //   // const stocksOpenCursorRequest:
        //   //   | IDBRequest<IDBCursorWithValue | null>
        //   //   | undefined = dbOpenRequest?.transaction?.objectStore(CONS.DB.STORES.S).openCursor()
        //   // stocksOpenCursorRequest?.addEventListener(
        //   //   CONS.EVENTS.ERR,
        //   //   onErrorStocks,
        //   //   false
        //   // )
        //   // stocksOpenCursorRequest?.addEventListener(
        //   //   CONS.EVENTS.SUC,
        //   //   onSuccessStocks,
        //   //   false
        //   // )
        //   // for (
        //   //   let i = 0;
        //   //   i < dbOpenRequest.result.objectStoreNames.length;
        //   //   i++
        //   // ) {
        //   //   if (
        //   //     dbOpenRequest.result.objectStoreNames[i] !== CONS.DB.STORES.S &&
        //   //     dbOpenRequest.result.objectStoreNames[i] !== CONS.DB.STORES.T
        //   //   ) {
        //   //     dbOpenRequest.result.deleteObjectStore(
        //   //       dbOpenRequest.result.objectStoreNames[i]
        //   //     )
        //   //   }
        //   // }
        // }
        // const updateStorageLocal = async () => {
        //   const storageKeys = Object.keys(CONS.DEFAULTS.STORAGE)
        //   const storageValues = Object.values(CONS.DEFAULTS.STORAGE)
        //   const storage: IStorageLocal = await browser.storage.local.get(storageKeys)
        //   for (let i = 0; i < storageKeys.length; i++) {
        //     if (storage[storageKeys[i]] === undefined) {
        //       await browser.storage.local.set({
        //         [storageKeys[i]]: storageValues[i]
        //       })
        //     }
        //   }
        // }
        //
        if (ev.oldVersion === 0) {
          createDB()
        } else {
          // updateDB()
        }
        await initStorageLocal()
      }
    }
    const dbOpenRequest: IDBOpenDBRequest = indexedDB.open(CONS.DB.NAME, CONS.DB.START_VERSION)
    dbOpenRequest.addEventListener(CONS.EVENTS.ERR, onError, CONS.SYSTEM.ONCE)
    dbOpenRequest.addEventListener(CONS.EVENTS.SUC, onSuccess, CONS.SYSTEM.ONCE)
    dbOpenRequest.addEventListener(CONS.EVENTS.UPG, onUpgradeNeeded, CONS.SYSTEM.ONCE)
  }
  const onClick = async (): Promise<void> => {
    log('BACKGROUND: onClick')
    const foundTabs = await browser.tabs.query({url: `${browser.runtime.getURL(CONS.RESOURCES.INDEX)}`})
    // NOTE: any async webextension API call which triggers a corresponding event listener will reload background.js.
    if (foundTabs.length === 0) {
      await browser.tabs.create({
        url: browser.runtime.getURL(CONS.RESOURCES.INDEX),
        active: true
      })
    } else {
      await browser.windows.update(foundTabs[0].windowId ?? 0, {
        focused: true
      })
      await browser.tabs.update(foundTabs[0].id ?? 0, {active: true})
    }
  }
  browser.runtime.onInstalled.addListener(onInstall)
  browser.action.onClicked.addListener(onClick)
  log('BACKGROUND: attached listener', {info: window.location.href})
}

log('--- PAGE_SCRIPT background.js --- CONS + useApp ---')

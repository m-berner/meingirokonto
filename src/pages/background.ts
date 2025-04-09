/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * you could obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2014-2025, Martin Berner, meingirokonto@gmx.de. All rights reserve
 */
declare global {
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
    sAccountActiveId?: number
    sBookingsPerPage?: number
    sDebug?: boolean
    sSkin?: string
  }
}

type TCons = Readonly<{
  CURRENCIES: {
    EUR: string;
    USD: string;
    CODE: Map<string, string>;
  }
  DATE: {
    DEFAULT: number;
    DEFAULTSTR: string;
    FYEAR: number;
    MILLIPERDAY: number;
    MILLIPERMIN: number;
  }
  DB: {
    BKFN: string;
    NAME: string;
    STORES: {
      ACCOUNTS: {
        NAME: string;
        FIELDS: {
          ID: string;
          S: string;
          C: string;
          N: string;
        };
      };
      BOOKINGS: {
        NAME: string;
        FIELDS: {
          ID: string;
          DAT: string;
          C: string;
          D: string;
          DESC: string;
          T: string;
          AN: string;
        };
      };
      BOOKING_TYPES: {
        NAME: string;
        FIELDS: {
          ID: string;
          N: string;
        };
      };
    };
    VERSION: number;
    MINVERSION: number;
  }
  DEFAULTS: {
    CURRENCY: string
    LANG: string
    LOCALE: string
    YEAR: number
    STORAGE: {
      ACCOUNT_ACTIVE_ID: number
      BOOKINGS_PER_PAGE: number
      DEBUG: boolean
      SKIN: string
    };
  }
  DIALOGS: {
    ADD_ACCOUNT: string;
    ADD_BOOKING_TYPE: string;
    ADD_BOOKING: string;
    DELETE_BOOKING: string;
    EXPORTDB: string;
    IMPORTDB: string;
    DELETETRANSFER: string;
    UPDATETRANSFER: string;
    DELETESTOCK: string;
    BUYSTOCK: string;
    SELLSTOCK: string;
    ADDDIVIDEND: string;
    SHOWDIVIDEND: string;
    CONFIGSTOCK: string;
    SETTING: string;
  }
  EVENTS: {
    ABORT: string;
    BEFOREUNLOAD: string;
    CHANGE: string;
    CLICK: string;
    COMP: string;
    DOM: string;
    ERR: string;
    INP: string;
    KEYDOWN: string;
    LOAD: string;
    FOCUS: string;
    BLUR: string;
    SUC: string;
    UPG: string;
  }
  SETTINGS: {
    ITEMS_PER_PAGE_OPTIONS: {
      value: number;
      title: string;
    }[];
  }
  RESOURCES: {
    SRC: string;
    OK: string;
    OKD: string;
    CANCEL: string;
    CANCELD: string;
    ICON32: string;
    LOGO16: string;
    LOGO256: string;
    MAG: string;
    CALENDAR: string;
    RENEW: string;
    FIRST: string;
    NEXT: string;
    PREV: string;
    LAST: string;
    CB: string;
    UP: string;
    NS: string;
    DS: string;
    FI: string;
    IT: string;
    OT: string;
    CHS: string;
    CHB: string;
    BK: string;
    RE: string;
    OB: string;
    TB: string;
    PY: string;
    CO: string;
    SE: string;
    RESET: string;
    ADD: string;
    CHANGE: string;
    DEL: string;
    NO: string;
    BUY: string;
    SELL: string;
    ND: string;
    SD: string;
    CONF: string;
    HTTP: string;
    HELP: string;
    PRIVACY: string;
    LICENSE: string;
    INDEX: string;
    ROOT: string;
  }
  RESULTS: {
    ERROR: string;
    SUCCESS: string;
  }
  STATES: {
    DONE: string;
    SRV: number;
    SUCCESS: number;
    PAUSE: string;
    MUTATE: string;
    NORENDER: string;
  }
  SYSTEM: {
    COPYRIGHT: string;
    FETCHTO: number;
    DELAY: number;
    EMAIL: string;
    GET: string;
    HTMLENTITY: string;
    ISINLENGTH: number;
    KEYS: {
      ENTER: string;
      TAB: string;
      T: string;
      V: string;
      Z: string;
    };
    ERRORS: {
      CURR: string;
      ERR: string;
      INVALID: string;
      NOCASE: string;
      NODEL: string;
      REQ: string;
      SRV: string;
      WRONGPARAM: string;
      SEND: string;
    };
    NULL: number;
    PERCENT: number;
    PROGRESSBAR: {
      MAX: number;
    };
    ROWS: number;
    STARTUP: number;
    STORAGE_OLD: string[];
    TYPE: number;
    ONCE: {
      once: boolean;
    };
  }
  RECORDS: {
    CONTROLLER: {
      TOTAL: {
        efficiency: number;
        returnRate: number;
        buy: number;
        sell: number;
        dividends: number;
        deposits: number;
        withdrawals: number;
        taxes: number;
        fees: number;
        earnings: number;
        account: number;
        depot: number;
        winloss: number;
        winlossPercent: number;
        depotBuyValue: number;
      };
    };
  }
}>

interface IUseBackground {
  onClick: () => Promise<void>
  onInstall: () => void
}

export const CONS: TCons = Object.freeze({
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
    LOCALE: 'de-DE',
    YEAR: 9999,
    STORAGE: {
      ACCOUNT_ACTIVE_ID: -1,
      BOOKINGS_PER_PAGE: 9,
      DEBUG: false,
      SKIN: 'ocean'
    }
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
    UPG: 'upgradeneeded'
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

const useBackground = (): IUseBackground => {
  const appUrls = {url: `${browser.runtime.getURL(CONS.RESOURCES.INDEX)}*`}
  const onClick = async () => {
    console.log('BACKGROUND: onClick')
    const start = async (): Promise<void> => {
      console.log('BACKGROUND: onClick: start')
      const foundTabs = await browser.tabs.query(appUrls)
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
    await start()
  }
  // NOTE: onInstall runs at addon install, addon update and firefox update
  const onInstall = (): void => {
    console.log('BACKGROUND: onInstall')
    const onSuccess = (ev: Event): void => {
      console.log('BACKGROUND: onInstall: onSuccess')
      if (ev.target instanceof IDBRequest) {
        ev.target.result.close()
      }
    }
    const onError = (ev: Event): void => {
      console.error('BACKGROUND: onError: ', ev)
    }
    const onUpgradeNeeded = async (ev: Event): Promise<void> => {
      if (ev instanceof IDBVersionChangeEvent) {
        console.info('BACKGROUND: onInstall: onUpgradeNeeded', ev.oldVersion)
        const createDB = (): void => {
          console.log('BACKGROUND: onInstall: onUpgradeNeeded: createDB')
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
          requestCreateAccountStore.createIndex(`${CONS.DB.STORES.ACCOUNTS.NAME}_uk1`, CONS.DB.STORES.ACCOUNTS.FIELDS.ID, {unique: true})
          requestCreateAccountStore.createIndex(`${CONS.DB.STORES.ACCOUNTS.NAME}_uk2`, CONS.DB.STORES.ACCOUNTS.FIELDS.N, {unique: true})
          requestCreateBookingTypeStore.createIndex(`${CONS.DB.STORES.BOOKING_TYPES.NAME}_uk1`, CONS.DB.STORES.BOOKING_TYPES.FIELDS.ID, {unique: true})
          requestCreateBookingTypeStore.createIndex(`${CONS.DB.STORES.BOOKING_TYPES.NAME}_uk2`, CONS.DB.STORES.BOOKING_TYPES.FIELDS.N, {unique: true})
          requestCreateBookingStore.createIndex(`${CONS.DB.STORES.BOOKINGS.NAME}_uk1`, CONS.DB.STORES.BOOKINGS.FIELDS.ID, {unique: true})
          requestCreateBookingStore.createIndex(`${CONS.DB.STORES.BOOKINGS.NAME}_k1`, CONS.DB.STORES.BOOKINGS.FIELDS.DAT, {unique: false})
          requestCreateBookingStore.createIndex(`${CONS.DB.STORES.BOOKINGS.NAME}_k2`, CONS.DB.STORES.BOOKINGS.FIELDS.T, {unique: false})
          requestCreateBookingStore.createIndex(`${CONS.DB.STORES.BOOKINGS.NAME}_k3`, CONS.DB.STORES.BOOKINGS.FIELDS.AN, {unique: false})
        }
        // const updateDB = (): void => {
        //   console.log('BACKGROUND: onInstall: onUpgradeNeeded: updateDB')
        //   // const optFalse: IDBIndexParameters = {unique: false}
        //   // const onSuccessStocks = (ev: TIDBRequestEvent): void => {
        //   //   console.log(
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
        //   //       console.log(
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
          // remove historical values TODO move into updateDB...
          //await browser.storage.local
          //  .remove(CONS.SYSTEM.STORAGE_OLD)
        }
        //await updateStorageLocal()
      }
    }

    const dbOpenRequest: IDBOpenDBRequest = indexedDB.open(CONS.DB.NAME, CONS.DB.VERSION)
    dbOpenRequest.addEventListener(CONS.EVENTS.ERR, onError, CONS.SYSTEM.ONCE)
    dbOpenRequest.addEventListener(CONS.EVENTS.SUC, onSuccess, CONS.SYSTEM.ONCE)
    dbOpenRequest.addEventListener(CONS.EVENTS.UPG, onUpgradeNeeded, CONS.SYSTEM.ONCE)
  }
  return {onClick, onInstall}
}

const {onClick, onInstall} = useBackground()
if (!browser.runtime.onInstalled.hasListener(onInstall)) {
  browser.runtime.onInstalled.addListener(onInstall)
}
if (!browser.action.onClicked.hasListener(onClick)) {
  browser.action.onClicked.addListener(onClick)
}

console.info('--- background.js ---', window.location.href)

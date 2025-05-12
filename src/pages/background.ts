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
  }

  interface IBookingType {
    // NOTE: correlates with CONS.DB.STORES.BOOKING_TYPES.FIELDS
    cID: number
    cName: string
    cAccountNumberID: number
  }

  interface IBooking {
    // NOTE: correlates with CONS.DB.STORES.BOOKINGS.FIELDS
    cID: number
    cDate: string
    cDebit: number
    cCredit: number
    cDescription?: string
    cType: number
    cAccountNumberID: number
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
    booking_types: IBookingType[]
    stocks: IStock[]
  }

  interface ISettings {
    activeAccountId: number
    bookingsPerPage: number
    debug: boolean
    skin: string
  }
}

interface IStorageLocal {
  sActiveAccountId: number
  sBookingsPerPage: number
  sDebug: boolean
  sLogo: string
  sSkin: string
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
            ID: string
            S: string
            L: string
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
            AN: string
          }
        }
        STOCKS: {
          NAME: string
          FIELDS: {
            ID: string
            ISIN: string
            SYM: string
            FADE_OUT: string
            FIRST_PAGE: string
            URL: string
            MEETING_DAY: string
            QUARTER_DAY: string
            WKN: string
            COMPANY: string
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
        DEBUG: boolean
        SKIN: string
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
    SETTINGS: {
      ITEMS_PER_PAGE_OPTIONS: {
        value: number
        title: string
      }[]
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
          // <do not change! (part of database)
          ACCOUNTS: {
            NAME: 'accounts',
            FIELDS: {
              ID: 'cID',
              S: 'cSwift',
              L: 'cLogoUrl',
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
              AN: 'cAccountNumberID'
            }
          },
          BOOKING_TYPES: {
            NAME: 'booking_types',
            FIELDS: {
              ID: 'cID',
              N: 'cName',
              AN: 'cAccountNumberID'
            }
          },
          STOCKS: {
            NAME: 'stocks',
            FIELDS: {
              ID: 'cID',
              ISIN: 'cISIN',
              SYM: 'cSym',
              FADE_OUT: 'cFadeOut',
              FIRST_PAGE: 'cFirstPage',
              URL: 'cURL',
              MEETING_DAY: 'cMeetingDay',
              QUARTER_DAY: 'cQuarterDay',
              WKN: 'cWKN',
              COMPANY: 'cCompany'
            }
          }
          // do not change! (part of database)>
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
    notice: (messages) => {
      return new Promise(async (resolve) => {
        const msg = messages.join('\n')
        const notificationOption: browser.notifications.CreateNotificationOptions =
          {
            type: 'basic',
            iconUrl: 'assets/icon16.png',
            title: 'KontenManager',
            message: msg
          }
        await browser.notifications.create(notificationOption)
        resolve()
      })
    },
    utcDate: (iso) => {
      return new Date(`${iso}T00:00:00.000`)
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

const {CONS, log} = useApp()

if (window.location.href.includes(CONS.DEFAULTS.BACKGROUND)) {
  // NOTE: onInstall runs at addon install, addon update and firefox update
  const onInstall = (): Promise<void> => {
    log('BACKGROUND: onInstall')
    return new Promise(async (resolve): Promise<void> => {
      const storageLocal: Partial<IStorageLocal> = await browser.storage.local.get()
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
            requestCreateAccountStore.createIndex(`${CONS.DB.STORES.ACCOUNTS.NAME}_uk2`, CONS.DB.STORES.ACCOUNTS.FIELDS.N, {unique: true})
            requestCreateBookingTypeStore.createIndex(`${CONS.DB.STORES.BOOKING_TYPES.NAME}_uk1`, CONS.DB.STORES.BOOKING_TYPES.FIELDS.ID, {unique: true})
            requestCreateBookingTypeStore.createIndex(`${CONS.DB.STORES.BOOKING_TYPES.NAME}_k1`, CONS.DB.STORES.BOOKING_TYPES.FIELDS.N, {unique: false})
            requestCreateBookingTypeStore.createIndex(`${CONS.DB.STORES.BOOKING_TYPES.NAME}_k2`, CONS.DB.STORES.BOOKING_TYPES.FIELDS.AN, {unique: false})
            requestCreateBookingStore.createIndex(`${CONS.DB.STORES.BOOKINGS.NAME}_uk1`, CONS.DB.STORES.BOOKINGS.FIELDS.ID, {unique: true})
            requestCreateBookingStore.createIndex(`${CONS.DB.STORES.BOOKINGS.NAME}_k1`, CONS.DB.STORES.BOOKINGS.FIELDS.DAT, {unique: false})
            requestCreateBookingStore.createIndex(`${CONS.DB.STORES.BOOKINGS.NAME}_k2`, CONS.DB.STORES.BOOKINGS.FIELDS.T, {unique: false})
            requestCreateStockStore.createIndex(`${CONS.DB.STORES.STOCKS.NAME}_uk1`, CONS.DB.STORES.STOCKS.FIELDS.ID, {unique: true})
            requestCreateStockStore.createIndex(`${CONS.DB.STORES.STOCKS.NAME}_uk2`, CONS.DB.STORES.STOCKS.FIELDS.ISIN, {unique: true})
            requestCreateStockStore.createIndex(`${CONS.DB.STORES.STOCKS.NAME}_uk3`, CONS.DB.STORES.STOCKS.FIELDS.SYM, {unique: true})
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
          if (storageLocal.sSkin === undefined) {
            await browser.storage.local.set({sSkin: CONS.DEFAULTS.STORAGE.SKIN})
          }
          if (storageLocal.sActiveAccountId === undefined) {
            await browser.storage.local.set({sActiveAccountId: CONS.DEFAULTS.STORAGE.ACTIVE_ACCOUNT_ID})
          }
          if (storageLocal.sBookingsPerPage === undefined) {
            await browser.storage.local.set({sBookingsPerPage: CONS.DEFAULTS.STORAGE.BOOKINGS_PER_PAGE})
          }
          if (storageLocal.sDebug === undefined) {
            await browser.storage.local.set({sDebug: CONS.DEFAULTS.STORAGE.DEBUG})
          }
        }
      }
      const dbOpenRequest: IDBOpenDBRequest = indexedDB.open(CONS.DB.NAME, CONS.DB.START_VERSION)
      dbOpenRequest.addEventListener(CONS.EVENTS.ERR, onError, CONS.SYSTEM.ONCE)
      dbOpenRequest.addEventListener(CONS.EVENTS.SUC, onSuccess, CONS.SYSTEM.ONCE)
      dbOpenRequest.addEventListener(CONS.EVENTS.UPG, onUpgradeNeeded, CONS.SYSTEM.ONCE)
      resolve()
    })
  }
  const onClick = (): Promise<void> => {
    log('BACKGROUND: onClick')
    return new Promise(async (resolve) => {
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
      resolve()
    })
  }
  const onSettings = (data: { type: string }): Promise<ISettings | void> => {
    log('BACKGROUND: onSettings', {info: data.type})
    const startSettings = (): Promise<ISettings> => {
      return new Promise(async (resolve) => {
        const storageLocal: Partial<IStorageLocal> = await browser.storage.local.get()
        const skin = storageLocal.sSkin !== undefined ? storageLocal.sSkin : CONS.DEFAULTS.STORAGE.SKIN
        const activeAccountId = storageLocal.sActiveAccountId !== undefined ? storageLocal.sActiveAccountId : CONS.DEFAULTS.STORAGE.ACTIVE_ACCOUNT_ID
        const bookingsPerPage = storageLocal.sBookingsPerPage !== undefined ? storageLocal.sBookingsPerPage : CONS.DEFAULTS.STORAGE.BOOKINGS_PER_PAGE
        const debug = storageLocal.sDebug !== undefined ? storageLocal.sDebug : CONS.DEFAULTS.STORAGE.DEBUG
        log('BACKGROUND: onSettings: startSettings')
        resolve({
          skin,
          activeAccountId,
          bookingsPerPage,
          debug
        })
      })
    }
    return new Promise(async (resolve): Promise<ISettings | void> => {
      if (data.type === CONS.MESSAGES.GS) {
        resolve(await startSettings())
      } else {
        resolve()
      }
    })
  }
  browser.runtime.onInstalled.addListener(onInstall)
  browser.action.onClicked.addListener(onClick)
  browser.runtime.onMessage.addListener(onSettings)
  log('BACKGROUND: attached listener', {info: window.location.href})
}

log('--- PAGE_SCRIPT background.js --- CONS + useApp ---')

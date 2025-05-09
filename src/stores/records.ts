/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * you could obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2014-2025, Martin Berner, meingirokonto@gmx.de. All rights reserved.
 */
import {defineStore, type StoreDefinition} from 'pinia'
import {useApp} from '@/pages/background'
import {useSettingsStore} from '@/stores/settings'

interface IRecordsStore {
  _dbi: IDBDatabase | null
  _accounts: IRecordStoreAccount
  _bookings: IRecordStoreBooking
  _booking_types: IRecordStoreBookingType
  _booking_sum: number
  _booking_sum_field: string
}

interface IRecordStoreBooking {
  all: IBooking[]
  per_account: IBooking[]
  search: string
  selected_index: number
}

interface IRecordStoreAccount {
  all: IAccount[]
  selected_index: number
}

interface IRecordStoreBookingType {
  all: IBookingType[]
  selected_index: number
}

const {CONS, log} = useApp()

export const useRecordsStore: StoreDefinition<'records', IRecordsStore> = defineStore('records', {
  state: (): IRecordsStore => {
    return {
      _accounts: {
        all: [],
        selected_index: -1
      },
      _dbi: null,
      _bookings: {
        all: [],
        per_account: [],
        search: '',
        selected_index: -1
      },
      _booking_sum: 0,
      _booking_sum_field: '',
      _booking_types: {
        all: [],
        selected_index: -1
      }
    }
  },
  getters: {
    accounts(state: IRecordsStore): IRecordStoreAccount {
      return state._accounts
    },
    dbi(state: IRecordsStore): IDBDatabase | null {
      return state._dbi
    },
    bookings(state: IRecordsStore): IRecordStoreBooking {
      return state._bookings
    },
    // bookingsPerAccount(state: IRecordsStore): IBooking[] {
    //   return state._bookings.per_account
    // },
    // bookingsSearch(state: IRecordsStore): string {
    //   return state._bookings.search
    // },
    bookingSum(state: IRecordsStore): number {
      return state._booking_sum
    },
    bookingSumField(state: IRecordsStore): string {
      return state._booking_sum_field
    },
    bookingTypes(state: IRecordsStore): IRecordStoreBookingType {
      return state._booking_types
    }
  },
  actions: {
    getAccountIndexById(ident: number): number {
      return this._accounts.all.findIndex((account: IAccount) => {
        return account.cID === ident
      })
    },
    getBookingTypeNameById(ident: number): string {
      const tmp = this._booking_types.all.filter((entry: IBookingType) => {
        return entry.cID === ident
      })
      if (tmp.length > 0) {
        return tmp[0].cName
      } else {
        return ''
      }
    },
    getBookingTextById(ident: number): string | Error {
      const tmp = this._bookings.all.filter((entry: IBooking) => {
        return entry.cID === ident
      })
      if (tmp.length > 0) {
        return `${tmp[0].cDate} : ${tmp[0].cDebit} : ${tmp[0].cCredit}`
      } else {
        throw new Error('getBookingTextById: No booking found for given ID')
      }
    },
    sumBookings(): void | Error {
      const settings = useSettingsStore()
      const activeAccountIndex = this.getAccountIndexById(settings.activeAccountId)
      if (activeAccountIndex === -1) {
        throw new Error('sumBookings: No account found for given ID')
      }
      const bookings_per_account = this._bookings.all.filter((rec: IBooking) => {
        return rec.cAccountNumber === this._accounts.all[activeAccountIndex].cNumber
      })
      bookings_per_account.sort((a: IBooking, b: IBooking) => {
        const A = new Date(a.cDate).getTime()
        const B = new Date(b.cDate).getTime()
        return A - B
      })
      this._bookings.per_account = bookings_per_account
      if (bookings_per_account.length > 0) {
        this._booking_sum = bookings_per_account.map((entry: IBooking) => {
          return entry.cCredit - entry.cDebit
        }).reduce((acc: number, cur: number) => acc + cur, 0)
      } else {
        this._booking_sum = 0
        throw new Error('sumBookings: No bookings found')
      }
    },
    setBookingSumField(value: string): void {
      this._booking_sum_field = value
    },
    cleanStoreAndDatabase(): Promise<string> {
      log('RECORDS: cleanStoreAndDatabase')
      this._bookings.all.splice(0, this._bookings.all.length)
      this._booking_types.all.splice(0, this._booking_types.all.length)
      this._accounts.all.splice(0, this._accounts.all.length)
      this._bookings.selected_index = 0
      this._booking_types.selected_index = 0
      this._booking_types.selected_index = 0
      return new Promise(async (resolve, reject) => {
        if (this._dbi != null) {
          const onError = (ev: Event): void => {
            reject(ev)
          }
          const onComplete = (): void => {
            resolve('RECORDS: all stores (databases and memory) are clean!')
          }
          const onSuccessClearBooking = (): void => {
            requestClearBooking.removeEventListener(CONS.EVENTS.SUC, onSuccessClearBooking, false)
            log('RECORDS: bookings dropped')
          }
          const onSuccessClearAccount = (): void => {
            requestClearAccount.removeEventListener(CONS.EVENTS.SUC, onSuccessClearAccount, false)
            log('RECORDS: accounts dropped')
          }
          const onSuccessClearAccountType = (): void => {
            requestClearBookingTypes.removeEventListener(CONS.EVENTS.SUC, onSuccessClearAccountType, false)
            log('RECORDS: booking types dropped')
          }

          const requestTransaction = this._dbi.transaction([CONS.DB.STORES.BOOKINGS.NAME, CONS.DB.STORES.ACCOUNTS.NAME, CONS.DB.STORES.BOOKING_TYPES.NAME], 'readwrite')
          requestTransaction.addEventListener(CONS.EVENTS.COMP, onComplete, CONS.SYSTEM.ONCE)
          requestTransaction.addEventListener(CONS.EVENTS.ERR, onError, CONS.SYSTEM.ONCE)
          const requestClearBooking = requestTransaction.objectStore(CONS.DB.STORES.BOOKINGS.NAME).clear()
          requestClearBooking.addEventListener(CONS.EVENTS.SUC, onSuccessClearBooking, false)
          const requestClearAccount = requestTransaction.objectStore(CONS.DB.STORES.ACCOUNTS.NAME).clear()
          requestClearAccount.addEventListener(CONS.EVENTS.SUC, onSuccessClearAccount, false)
          const requestClearBookingTypes = requestTransaction.objectStore(CONS.DB.STORES.BOOKING_TYPES.NAME).clear()
          requestClearBookingTypes.addEventListener(CONS.EVENTS.SUC, onSuccessClearAccountType, false)
        }
      })
    },
    openDatabase(): Promise<string> {
      return new Promise(async (resolve, reject) => {
        const onError = (ev: Event): void => {
          reject(ev)
        }
        const onSuccess = (ev: Event): void => {
          if (ev.target instanceof IDBOpenDBRequest) {
            this._dbi = ev.target.result
            resolve('RECORDS: database opened successfully!')
          }
        }
        const openDBRequest = indexedDB.open(CONS.DB.NAME, CONS.DB.VERSION)
        openDBRequest.addEventListener(CONS.EVENTS.SUC, onSuccess, CONS.SYSTEM.ONCE)
        openDBRequest.addEventListener(CONS.EVENTS.ERR, onError, CONS.SYSTEM.ONCE)
      })
    },
    databaseIntoStore(): Promise<string> {
      log('RECORDS: databaseIntoStore')
      // const runtime = useRuntimeStore()
      this._accounts.all.splice(0, this._accounts.all.length)
      this._booking_types.all.splice(0, this._booking_types.all.length)
      this._bookings.all.splice(0, this._bookings.all.length)
      this._bookings.selected_index = 0
      this._booking_types.selected_index = 0
      this._accounts.selected_index = 0
      return new Promise(async (resolve, reject) => {
        if (this._dbi != null) {
          const onComplete = async (): Promise<void> => {
            log('RECORDS: databaseIntoStore: all database records loaded into memory!')
            resolve('RECORDS: databaseIntoStore: all database records loaded into memory!')
          }
          const onAbort = (): void => {
            //await notice(['RECORDS: databaseIntoStore: transaction aborted!'])
            reject(requestTransaction.error)
          }
          const requestTransaction = this._dbi.transaction([CONS.DB.STORES.BOOKINGS.NAME, CONS.DB.STORES.ACCOUNTS.NAME, CONS.DB.STORES.BOOKING_TYPES.NAME], 'readonly')
          requestTransaction.addEventListener(CONS.EVENTS.COMP, onComplete, CONS.SYSTEM.ONCE)
          requestTransaction.addEventListener(CONS.EVENTS.ABORT, onAbort, CONS.SYSTEM.ONCE)
          const onSuccessAccountOpenCursor = (ev: Event): void => {
            if (ev.target instanceof IDBRequest && ev.target.result instanceof IDBCursorWithValue) {
              this._accounts.all.push(ev.target.result.value)
              ev.target.result.continue()
            }
          }
          const onSuccessAccountTypeOpenCursor = (ev: Event): void => {
            if (ev.target instanceof IDBRequest && ev.target.result instanceof IDBCursorWithValue) {
              this._booking_types.all.push(ev.target.result.value)
              ev.target.result.continue()
            }
          }
          const onSuccessBookingOpenCursor = (ev: Event): void => {
            if (ev.target instanceof IDBRequest && ev.target.result instanceof IDBCursorWithValue) {
              this._bookings.all.push(ev.target.result.value)
              ev.target.result.continue()
            }
          }
          const requestAccountOpenCursor = requestTransaction.objectStore(CONS.DB.STORES.ACCOUNTS.NAME).openCursor()
          requestAccountOpenCursor.addEventListener(CONS.EVENTS.SUC, onSuccessAccountOpenCursor, false)
          const requestAccountTypeOpenCursor = requestTransaction.objectStore(CONS.DB.STORES.BOOKING_TYPES.NAME).openCursor()
          requestAccountTypeOpenCursor.addEventListener(CONS.EVENTS.SUC, onSuccessAccountTypeOpenCursor, false)
          const requestBookingOpenCursor = requestTransaction.objectStore(CONS.DB.STORES.BOOKINGS.NAME).openCursor()
          requestBookingOpenCursor.addEventListener(CONS.EVENTS.SUC, onSuccessBookingOpenCursor, false)
        }
      })
    },
    storeIntoDatabase(): Promise<string> {
      log('RECORDS: storeIntoDatabase')
      return new Promise(async (resolve, reject) => {
        if (this._dbi != null) {
          const onComplete = (): void => {
            // requestadd Account.removeEventListener(CONS.EVENTS.ERR, onError, false)
            //await notice(['All memory records are added to the database!'])
            resolve('RECORDS: storeIntoDatabase: all memory records are added to the database!')
          }
          const onAbort = (): void => {
            //await notice(['Transaction aborted!'])
            reject(requestTransaction.error)
          }
          const onError = (ev: Event): void => {
            reject(ev)
          }
          const requestTransaction = this._dbi.transaction([CONS.DB.STORES.ACCOUNTS.NAME, CONS.DB.STORES.BOOKING_TYPES.NAME, CONS.DB.STORES.BOOKINGS.NAME], 'readwrite')
          requestTransaction.addEventListener(CONS.EVENTS.COMP, onComplete, CONS.SYSTEM.ONCE)
          requestTransaction.addEventListener(CONS.EVENTS.ABORT, onError, CONS.SYSTEM.ONCE)
          requestTransaction.addEventListener(CONS.EVENTS.ABORT, onAbort, CONS.SYSTEM.ONCE)
          for (let i = 0; i < this._accounts.all.length; i++) {
            requestTransaction.objectStore(CONS.DB.STORES.ACCOUNTS.NAME).add({...this._accounts.all[i]})
          }
          for (let i = 0; i < this._booking_types.all.length; i++) {
            requestTransaction.objectStore(CONS.DB.STORES.BOOKING_TYPES.NAME).add({...this._booking_types.all[i]})
          }
          for (let i = 0; i < this._bookings.all.length; i++) {
            requestTransaction.objectStore(CONS.DB.STORES.BOOKINGS.NAME).add({...this._bookings.all[i]})
          }
        }
      })
    },
    addAccount(record: Omit<IAccount, 'cID'>): Promise<string> {
      return new Promise(async (resolve, reject) => {
        const settings = useSettingsStore()
        if (this._dbi != null) {
          const onSuccess = async (ev: Event): Promise<void> => {
            if (ev.target instanceof IDBRequest) {
              const memRecord: IAccount = {
                ...record,
                cID: ev.target.result
              }
              this._accounts.all.push(memRecord)
              settings.setActiveAccountId(ev.target.result)
              await browser.storage.local.set({sActiveAccountId: ev.target.result})
              resolve(ev.target.result)
            } else {
              reject(CONS.RESULTS.ERROR)
            }
          }
          const onError = (ev: Event): void => {
            reject(ev)
          }
          const requestTransaction = this._dbi.transaction([CONS.DB.STORES.ACCOUNTS.NAME], 'readwrite')
          requestTransaction.addEventListener(CONS.EVENTS.ERR, onError, CONS.SYSTEM.ONCE)
          const requestAdd = requestTransaction.objectStore(CONS.DB.STORES.ACCOUNTS.NAME).add(record)
          requestAdd.addEventListener(CONS.EVENTS.SUC, onSuccess, CONS.SYSTEM.ONCE)
        }
      })
    },
    deleteAccount(ident: number): Promise<string> {
      const indexOfAccount = this._accounts.all.findIndex((account: IAccount) => {
        return account.cID === ident
      })
      return new Promise(async (resolve, reject) => {
        if (this._dbi != null) {
          const onSuccess = (): void => {
            this._accounts.all.splice(indexOfAccount, 1)
            resolve('Account deleted')
          }
          const onError = (ev: Event): void => {
            reject(ev)
          }
          const requestTransaction = this._dbi.transaction([CONS.DB.STORES.ACCOUNTS.NAME], 'readwrite')
          requestTransaction.addEventListener(CONS.EVENTS.ERR, onError, CONS.SYSTEM.ONCE)
          const requestDelete = requestTransaction.objectStore(CONS.DB.STORES.ACCOUNTS.NAME).delete(ident)
          requestDelete.addEventListener(CONS.EVENTS.ERR, onError, CONS.SYSTEM.ONCE)
          requestDelete.addEventListener(CONS.EVENTS.SUC, onSuccess, CONS.SYSTEM.ONCE)
        }
      })
    },
    addBookingType(record: Omit<IBookingType, 'cID'>): Promise<string> {
      return new Promise(async (resolve, reject) => {
        if (this._dbi != null) {
          const onSuccess = (ev: Event): void => {
            if (ev.target instanceof IDBRequest) {
              const memRecord: IBookingType = {
                ...record,
                cID: ev.target.result
              }
              this._booking_types.all.push(memRecord)
              resolve(CONS.RESULTS.SUCCESS)
            } else {
              reject(CONS.RESULTS.ERROR)
            }
          }
          const onError = (ev: Event): void => {
            reject(ev)
          }
          const requestTransaction = this._dbi.transaction([CONS.DB.STORES.BOOKING_TYPES.NAME], 'readwrite')
          requestTransaction.addEventListener(CONS.EVENTS.ERR, onError, CONS.SYSTEM.ONCE)
          const requestAdd = requestTransaction.objectStore(CONS.DB.STORES.BOOKING_TYPES.NAME).add(record)
          requestAdd.addEventListener(CONS.EVENTS.SUC, onSuccess, CONS.SYSTEM.ONCE)
        }
      })
    },
    deleteBookingType(ident: number): Promise<string> {
      const indexOfBookingType = this._booking_types.all.findIndex((bookingType: IBookingType) => {
        return bookingType.cID === ident
      })
      return new Promise(async (resolve, reject) => {
        if (this._dbi != null) {
          const onSuccess = (): void => {
            this._booking_types.all.splice(indexOfBookingType, 1)
            resolve('Booking type deleted')
          }
          const onError = (ev: Event): void => {
            reject(ev)
          }
          const requestTransaction = this._dbi.transaction([CONS.DB.STORES.BOOKING_TYPES.NAME], 'readwrite')
          requestTransaction.addEventListener(CONS.EVENTS.ERR, onError, CONS.SYSTEM.ONCE)
          const requestDelete = requestTransaction.objectStore(CONS.DB.STORES.BOOKING_TYPES.NAME).delete(ident)
          requestDelete.addEventListener(CONS.EVENTS.ERR, onError, CONS.SYSTEM.ONCE)
          requestDelete.addEventListener(CONS.EVENTS.SUC, onSuccess, CONS.SYSTEM.ONCE)
        }
      })
    },
    addBooking(record: Omit<IBooking, 'cID'>): Promise<string> {
      return new Promise(async (resolve, reject) => {
        if (this._dbi != null) {
          const onSuccess = (ev: Event): void => {
            if (ev.target instanceof IDBRequest) {
              const memRecord: IBooking = {
                ...record,
                cID: ev.target.result
              }
              this._bookings.all.push(memRecord)
              this._bookings.per_account.push(memRecord)
              this._booking_sum = this._bookings.per_account.map((entry: IBooking) => {
                return entry.cCredit - entry.cDebit
              }).reduce((acc: number, cur: number) => acc + cur, 0)
              resolve(CONS.RESULTS.SUCCESS)
            } else {
              reject(CONS.RESULTS.ERROR)
            }
          }
          const onError = (ev: Event): void => {
            reject(ev)
          }
          const requestTransaction = this._dbi.transaction([CONS.DB.STORES.BOOKINGS.NAME], 'readwrite')
          requestTransaction.addEventListener(CONS.EVENTS.ERR, onError, CONS.SYSTEM.ONCE)
          const requestAdd = requestTransaction.objectStore(CONS.DB.STORES.BOOKINGS.NAME).add(record)
          requestAdd.addEventListener(CONS.EVENTS.SUC, onSuccess, CONS.SYSTEM.ONCE)
        }
      })
    },
    deleteBooking(ident: number): Promise<string> {
      const indexOfBooking = this._bookings.all.findIndex((booking: IBooking) => {
        return booking.cID === ident
      })
      return new Promise(async (resolve, reject) => {
        if (this._dbi != null) {
          const onSuccess = (): void => {
            this._bookings.all.splice(indexOfBooking, 1)
            this.sumBookings()
            resolve('Booking deleted')
          }
          const onError = (ev: Event): void => {
            reject(ev)
          }
          const requestTransaction = this._dbi.transaction([CONS.DB.STORES.BOOKINGS.NAME], 'readwrite')
          requestTransaction.addEventListener(CONS.EVENTS.ERR, onError, CONS.SYSTEM.ONCE)
          const requestDelete = requestTransaction.objectStore(CONS.DB.STORES.BOOKINGS.NAME).delete(ident)
          requestDelete.addEventListener(CONS.EVENTS.ERR, onError, CONS.SYSTEM.ONCE)
          requestDelete.addEventListener(CONS.EVENTS.SUC, onSuccess, CONS.SYSTEM.ONCE)
        }
      })
    }
  }
})

log('--- STORE records.js ---')

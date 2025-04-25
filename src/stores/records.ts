/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * you could obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2014-2025, Martin Berner, meingirokonto@gmx.de. All rights reserved.
 */
import {defineStore, type StoreDefinition} from 'pinia'
import {useApp} from '@/pages/background'

interface IRecordsStore {
  _dbi: IDBDatabase | null
  _accounts: IRecordStoreAccount
  _bookings: IRecordStoreBooking
  _booking_types: IRecordStoreBookingType
  _bkup_object: IBackup
}

interface IRecordStoreBooking {
  all: IBooking[]
  selected_index: number
}

interface IRecordStoreAccount {
  all: IAccount[]
  selected_index: number
  active_id: number
}

interface IRecordStoreBookingType {
  all: IBookingType[]
  selected_index: number
}

const {CONS} = useApp()

export const useRecordsStore: StoreDefinition<'records', IRecordsStore> = defineStore('records', {
  state: (): IRecordsStore => {
    return {
      _dbi: null,
      _accounts: {
        all: [],
        selected_index: -1,
        active_id: -1
      },
      _bookings: {
        all: [],
        selected_index: -1
      },
      _booking_types: {
        all: [],
        selected_index: -1
      },
      _bkup_object: {
        sm: {
          cVersion: 0,
          cDBVersion: 0,
          cEngine: ''
        },
        accounts: [],
        bookings: [],
        booking_types: []
      }
    }
  },
  getters: {
    accounts(state: IRecordsStore): IRecordStoreAccount {
      return state._accounts
    },
    bookingTypes(state: IRecordsStore): IRecordStoreBookingType {
      return state._booking_types
    },
    bookings(state: IRecordsStore): IRecordStoreBooking {
      return state._bookings
    },
    dbi(state: IRecordsStore): IDBDatabase | null {
      return state._dbi
    }
  },
  actions: {
    getAccountIndexById(ident: number): number {
      return this._accounts.all.findIndex((account: IAccount) => {
        return account.cID === ident
      })
    },
    getBookingsPerAccount(): IBooking[] {
      const activeAccountIndex = this.getAccountIndexById(this._accounts.active_id)
      if (activeAccountIndex === -1) {
        return []
      }
      const bookings_per_account = this._bookings.all.filter((rec: IBooking) => {
        return rec.cAccountNumber === this._accounts.all[activeAccountIndex].cNumber
      })
      bookings_per_account.sort((a: IBooking, b: IBooking) => {
        const A = new Date(a.cDate).getTime()
        const B = new Date(b.cDate).getTime()
        return A - B
      })
      return bookings_per_account
    },
    setBkupObject(value: IBackup) {
      this._bkup_object = value
    },
    loadBkupObjectIntoStore(): void {
      console.log('RECORDS: loadBkupObjectIntoStore')
      let account: IAccount
      let booking: IBooking
      let bookingType: IBookingType
      for (account of this._bkup_object.accounts) {
        this._accounts.all.push(account)
      }
      for (bookingType of this._bkup_object.booking_types) {
        this._booking_types.all.push(bookingType)
      }
      for (booking of this._bkup_object.bookings) {
        this._bookings.all.push(booking)
      }
    },
    cleanStoreAndDatabase(): Promise<string> {
      console.log('RECORDS: cleanStoreAndDatabase')
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
            console.info('RECORDS: bookings dropped')
          }
          const onSuccessClearAccount = (): void => {
            requestClearAccount.removeEventListener(CONS.EVENTS.SUC, onSuccessClearAccount, false)
            console.info('RECORDS: accounts dropped')
          }
          const onSuccessClearAccountType = (): void => {
            requestClearAccountType.removeEventListener(CONS.EVENTS.SUC, onSuccessClearAccountType, false)
            console.info('RECORDS: account types dropped')
          }

          const requestTransaction = this._dbi.transaction([CONS.DB.STORES.BOOKINGS.NAME, CONS.DB.STORES.ACCOUNTS.NAME, CONS.DB.STORES.BOOKING_TYPES.NAME], 'readwrite')
          requestTransaction.addEventListener(CONS.EVENTS.COMP, onComplete, CONS.SYSTEM.ONCE)
          requestTransaction.addEventListener(CONS.EVENTS.ERR, onError, CONS.SYSTEM.ONCE)
          const requestClearBooking = requestTransaction.objectStore(CONS.DB.STORES.BOOKINGS.NAME).clear()
          requestClearBooking.addEventListener(CONS.EVENTS.SUC, onSuccessClearBooking, false)
          const requestClearAccount = requestTransaction.objectStore(CONS.DB.STORES.ACCOUNTS.NAME).clear()
          requestClearAccount.addEventListener(CONS.EVENTS.SUC, onSuccessClearAccount, false)
          const requestClearAccountType = requestTransaction.objectStore(CONS.DB.STORES.BOOKING_TYPES.NAME).clear()
          requestClearAccountType.addEventListener(CONS.EVENTS.SUC, onSuccessClearAccountType, false)
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
      console.log('RECORDS: databaseIntoStore')
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
            console.info('RECORDS: databaseIntoStore: all database records loaded into memory!')
            resolve('RECORDS: databaseIntoStore: all database records loaded into memory!')
          }
          const onAbort = (): void => {
            //notice(['RECORDS: databaseIntoStore: transaction aborted!'])
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
      console.log('RECORDS: storeIntoDatabase')
      return new Promise(async (resolve, reject) => {
        if (this._dbi != null) {
          const onComplete = (): void => {
            // requestadd Account.removeEventListener(CONS.EVENTS.ERR, onError, false)
            //notice(['All memory records are added to the database!'])
            resolve('RECORDS: storeIntoDatabase: all memory records are added to the database!')
          }
          const onAbort = (): void => {
            //notice(['Transaction aborted!'])
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
        if (this._dbi != null) {
          const onSuccess = async (ev: Event): Promise<void> => {
            if (ev.target instanceof IDBRequest) {
              const memRecord: IAccount = {
                ...record,
                cID: ev.target.result
              }
              this._accounts.all.push(memRecord)
              this._accounts.active_id = ev.target.result
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
    updateAccount(data: IAccount, msg: boolean = false): Promise<string> {
      console.info('RECORDS: updateAccount', data)
      return new Promise(async (resolve, reject) => {
        if (this._dbi != null) {
          const onSuccess = (): void => {
            requestUpdate.removeEventListener(CONS.EVENTS.SUC, onSuccess, false)
            if (msg) {
              //notice(['sm_msg_updaterecord'])
            }
            resolve('Account updated')
          }
          const onError = (ev: Event): void => {
            requestTransaction.removeEventListener(CONS.EVENTS.ERR, onError, false)
            requestUpdate.removeEventListener(CONS.EVENTS.ERR, onError, false)
            reject(ev)
          }
          const requestTransaction = this._dbi.transaction([CONS.DB.STORES.ACCOUNTS.NAME], 'readwrite')
          requestTransaction.addEventListener(CONS.EVENTS.ERR, onError, false)
          const requestUpdate = requestTransaction.objectStore(CONS.DB.STORES.ACCOUNTS.NAME).put({...data})
          requestUpdate.addEventListener(CONS.EVENTS.SUC, onSuccess, false)
          requestUpdate.addEventListener(CONS.EVENTS.ERR, onError, false)
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
    updateBookingType(data: IBookingType, msg: boolean = false): Promise<string> {
      console.info('RECORDS: updateBookingType', data)
      return new Promise(async (resolve, reject) => {
        if (this._dbi != null) {
          const onSuccess = (): void => {
            if (msg) {
              //notice(['sm_msg_updaterecord'])
            }
            resolve('Account type updated')
          }
          const onError = (ev: Event): void => {
            reject(ev)
          }
          const requestTransaction = this._dbi.transaction([CONS.DB.STORES.BOOKING_TYPES.NAME], 'readwrite')
          requestTransaction.addEventListener(CONS.EVENTS.ERR, onError, CONS.SYSTEM.ONCE)
          const requestUpdate = requestTransaction.objectStore(CONS.DB.STORES.BOOKING_TYPES.NAME).put({...data})
          requestUpdate.addEventListener(CONS.EVENTS.SUC, onSuccess, CONS.SYSTEM.ONCE)
          requestUpdate.addEventListener(CONS.EVENTS.ERR, onError, CONS.SYSTEM.ONCE)
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
    updateBooking(data: IBooking, msg: boolean = false): Promise<string> {
      console.info('RECORDS: updateBooking', data)
      return new Promise(async (resolve, reject) => {
        if (this._dbi != null) {
          const onSuccess = (): void => {
            if (msg) {
              //notice(['sm_msg_updaterecord'])
            }
            resolve('Booking updated')
          }
          const onError = (ev: Event): void => {
            reject(ev)
          }
          const requestTransaction = this._dbi.transaction([CONS.DB.STORES.BOOKINGS.NAME], 'readwrite')
          requestTransaction.addEventListener(CONS.EVENTS.ERR, onError, CONS.SYSTEM.ONCE)
          const requestUpdate = requestTransaction.objectStore(CONS.DB.STORES.BOOKINGS.NAME).put({...data})
          requestUpdate.addEventListener(CONS.EVENTS.SUC, onSuccess, CONS.SYSTEM.ONCE)
          requestUpdate.addEventListener(CONS.EVENTS.ERR, onError, CONS.SYSTEM.ONCE)
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

console.log('--- STORE records.js ---')

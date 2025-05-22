/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * you could obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2014-2025, Martin Berner, kontenmanager@gmx.de. All rights reserved.
 */
import {defineStore, type StoreDefinition} from 'pinia'
import {useAppApi} from '@/pages/background'
import {useSettingsStore} from '@/stores/settings'

interface IRecordsStore {
  _accounts: IAccount[]
  _bookings: IBooking[]
  _booking_types: IBookingType[]
  _stocks: IStock[]
  _booking_sum: number
  _booking_sum_field: string
}

const {log} = useAppApi()

export const useRecordsStore: StoreDefinition<'records', IRecordsStore> = defineStore('records', {
  state: (): IRecordsStore => {
    return {
      _accounts: [],
      _bookings: [],
      _booking_sum: 0,
      _booking_sum_field: '',
      _booking_types: [],
      _stocks: []
    }
  },
  getters: {
    accounts(state: IRecordsStore): IAccount[] {
      return state._accounts
    },
    bookings(state: IRecordsStore): IBooking[] {
      return state._bookings
    },
    stocks(state: IRecordsStore): IStock[] {
      return state._stocks
    },
    bookingSum(state: IRecordsStore): number {
      return state._booking_sum
    },
    bookingSumField(state: IRecordsStore): string {
      return state._booking_sum_field
    },
    bookingTypes(state: IRecordsStore): IBookingType[] {
      return state._booking_types
    }
  },
  actions: {
    getAccountIndexById(ident: number): number {
      return this._accounts.findIndex((account: IAccount) => {
        return account.cID === ident
      })
    },
    getBookingTypeNameById(ident: number): string {
      const tmp = this._booking_types.filter((entry: IBookingType) => {
        return entry.cID === ident
      })
      if (tmp.length > 0) {
        return tmp[0].cName
      } else {
        return ''
      }
    },
    getBookingTextById(ident: number): string | Error {
      const tmp = this._bookings.filter((entry: IBooking) => {
        return entry.cID === ident
      })
      if (tmp.length > 0) {
        return `${tmp[0].cDate} : ${tmp[0].cDebit} : ${tmp[0].cCredit}`
      } else {
        throw new Error('getBookingTextById: No booking found for given ID')
      }
    },
    sumBookings(): void {
      const settings = useSettingsStore()
      const activeAccountIndex = this.getAccountIndexById(settings.activeAccountId)
      if (activeAccountIndex === -1) {
        return
      }
      const bookings_per_account = this._bookings.filter((rec: IBooking) => {
        return rec.cAccountNumberID === this._accounts[activeAccountIndex].cID
      })
      if (bookings_per_account.length > 0) {
        bookings_per_account.sort((a: IBooking, b: IBooking) => {
          const A = new Date(a.cDate).getTime()
          const B = new Date(b.cDate).getTime()
          return A - B
        })
        this._bookings = bookings_per_account
        this._booking_sum = bookings_per_account.map((entry: IBooking) => {
          return entry.cCredit - entry.cDebit
        }).reduce((acc: number, cur: number) => acc + cur, 0)
      } else {
        this._bookings = []
        this._booking_sum = 0
      }
    },
    setBookingSumField(value: string): void {
      this._booking_sum_field = value
    },
    async cleanStores(): Promise<void> {
      log('RECORDS: cleanStores')
      this._bookings.splice(0, this._bookings.length)
      this._booking_types.splice(0, this._booking_types.length)
      this._accounts.splice(0, this._accounts.length)
      this._stocks.splice(0, this._accounts.length)
      await browser.storage.local.set({sActiveAccountId: -1})
    }
  }
})

log('--- STORE records.js ---')

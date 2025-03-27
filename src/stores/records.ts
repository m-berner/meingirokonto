/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * you could obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2014-2025, Martin Berner, meingirokonto@gmx.de. All rights reserved.
 */
import {defineStore, type StoreDefinition} from 'pinia'
//import {toRaw} from 'vue'
import {useApp} from '@/composables/useApp'
//import type {ThemeInstance} from 'vuetify'

interface IRecordsStore {
  _dbi: IDBDatabase | null
  _account: IRecordStoreAccount
  _booking: IRecordStoreBooking
  _booking_type: IRecordStoreBookingType
  _bkup_object: IBackup
}

interface IRecordStoreBooking {
  all: IBooking[]
  dividend_transfers_per_stock: Map<number, ITransfer[]>
  total_controller: ITotalController
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

interface IOnlineStockValues {
  index: number
  value: number
  min: number
  max: number
  echange: number
  pchange: number
}

const {CONS, notice} = useApp()

export const useRecordsStore: StoreDefinition<'records', IRecordsStore> = defineStore('records', {
  state: (): IRecordsStore => {
    return {
      _dbi: null,
      _account: {
        all: [],
        selected_index: -1,
        active_id: -1
      },
      _booking: {
        all: [],
        dividend_transfers_per_stock: new Map<number, ITransfer[]>(),
        total_controller: CONS.RECORDS.CONTROLLER.TOTAL,
        selected_index: -1
      },
      _booking_type: {
        all: [],
        selected_index: -1
      },
      _bkup_object: {
        sm: {
          cVersion: 0,
          cDBVersion: 0,
          cEngine: ''
        },
        account: [],
        booking: [],
        booking_type: []
      }
    }
  },
  getters: {
    account(state: IRecordsStore): IRecordStoreAccount {
      return state._account
    },
    bookingType(state: IRecordsStore): IRecordStoreBookingType {
      return state._booking_type
    },
    booking(state: IRecordsStore): IRecordStoreBooking {
      return state._booking
    },
    dbi(state: IRecordsStore): IDBDatabase | null {
      return state._dbi
    },
    // dividendsPerStock(state: IRecordsStore): Map<number, ITransfer[]> {
    //   return state._transfers.dividend_transfers_per_stock
    // }
  },
  actions: {
    _loadAccountIntoStore(account: IAccount): void {
      // const memRecord = { ...account }
      this._account.all.push(account)
      // if (memRecord.cFadeOut === 1) {
      //   this._stocks.passive.push(memRecord)
      // } else if (memRecord.cFadeOut === 0) {
      //   this._stocks.active.push(memRecord)
      // }
    },
    _loadBookingTypeIntoStore(bookingType: IBookingType): void {
      // const memRecord = { ...account }
      this._booking_type.all.push(bookingType)
      // if (memRecord.cFadeOut === 1) {
      //   this._stocks.passive.push(memRecord)
      // } else if (memRecord.cFadeOut === 0) {
      //   this._stocks.active.push(memRecord)
      // }
    },
    _loadBookingIntoStore(booking: IBooking): void {
      // if (transfer.cType === CONS.DB.RECORD_TYPES.DIV) {
      //   transfer.mSortDate = transfer.cExDay
      // } else {
      //   transfer.mSortDate = transfer.cDate
      // }
      // if (stock.length > 0) {
      //   transfer.mCompany = toRaw(stock[0]).cCompany
      // } else {
      //   transfer.mCompany = ''
      // }
      this._booking.all.push(booking)
    },
    _sortTransfers(): ITransfer[] {
      return this._transfers.all.sort((a: ITransfer, b: ITransfer): number => {
        return (b.mSortDate ?? 0) - (a.mSortDate ?? 0)
      })
    },
    // _sortActiveStocks(): void {
    //   this._stocks.active.sort((a: IStock, b: IStock): number => {
    //     return (a.cID ?? 0) - (b.cID ?? 0)
    //   })
    //   this._stocks.active.sort((a: IStock, b: IStock): number => {
    //     return (b.cFirstPage ?? 0) - (a.cFirstPage ?? 0)
    //   })
    //   this._stocks.active.sort((a: IStock, b: IStock): number => {
    //     return (b.mPortfolio ?? 0) - (a.mPortfolio ?? 0)
    //   })
    // },
    getAccountIndexById(ident: number): number {
      return this._account.all.findIndex((account: IAccount) => {
        return account.cID === ident
      })
    },
    _setActiveStocksValues(val: IOnlineStockValues): void {
      this._stocks.active[val.index].mValue = val.value
      this._stocks.active[val.index].mMin = val.min
      this._stocks.active[val.index].mMax = val.max
      this._stocks.active[val.index].mEuroChange = val.echange
      this._stocks.active[val.index].mChange = val.pchange
    },
    initialYearTransfers(): number {
      const years: number[] = this._transfers.all.map((record: ITransfer) => {
        return new Date(record.mSortDate ?? 0).getFullYear()
      })
      return Math.min(...Array.from(new Set(years)))
    },
    yearRangeTransfers(): number[] {
      const years: number[] = this._transfers.all.map((record: ITransfer) => {
        return new Date(record.mSortDate ?? 0).getFullYear()
      })
      const uniqueYears = Array.from(new Set(years))
      uniqueYears.sort((a: number, b: number): number => {
        return b - a
      })
      return uniqueYears
    },
    setDates(i: number, d): void {
      this._stocks.active[i].cMeetingDay = d.gm
      this._stocks.active[i].cQuarterDay = d.qf
    },
    // setDrawerDepot(): void {
    //   console.log('RECORDS: setDrawerDepot')
    //   const portfolio = this._stocks.active.filter((stock: IStock) => {
    //     return (stock.mPortfolio ?? 0) > 0
    //   })
    //   const total = this._transfers.total_controller
    //   let depot = 0
    //   let buyvalue = 0
    //   portfolio.forEach((stock: IStock) => {
    //     depot += (stock.mPortfolio ?? 0) * (stock.mValue ?? 0)
    //     buyvalue += (stock.mPortfolio ?? 0) * (stock.mBuyValue ?? 0)
    //   })
    //   total.depot = depot
    //   total.winloss = depot - buyvalue + total.fees + total.taxes + total.dividends + total.earnings
    //   total.winlossPercent =
    //     total.withdrawals + total.deposits - total.account !== 0
    //       ? total.winloss / (total.withdrawals + total.deposits - total.account)
    //       : 0
    // },
    // resetActiveStocksValues(): void {
    //   const records = useRecordsStore()
    //   const settings = useSettingsStore()
    //   if (this._stocks.active.length > 0) {
    //     for (
    //       let i = (records.stocks.active_page - 1) * settings.itemsPerPageStocks;
    //       i < (records.stocks.active_page - 1) * settings.itemsPerPageStocks + records.stocks.active_page_count;
    //       i++
    //     ) {
    //       this._stocks.active[i].mValue = 0
    //       this._stocks.active[i].mMin = 0
    //       this._stocks.active[i].mMax = 0
    //       this._stocks.active[i].mChange = 0
    //       this._stocks.active[i].mEuroChange = 0
    //     }
    //   }
    // },
    setBkupObject(value: IBackup) {
      this._bkup_object = {
        sm: {
          cVersion: 0,
          cDBVersion: 0,
          cDBCurrency: '',
          cEngine: ''
        },
        account: [],
        account_type: [],
        booking: []
      }
      this._bkup_object = value
    },
    // setActiveStocksPage(value: number): void {
    //   this._stocks.active_page = value
    // },
    // setActiveStockIndexForGivenId(value: number): void {
    //   this._stocks.active_index = this._stocks.active.findIndex((rec: IStock) => {
    //     return rec.cID === value
    //   })
    // },
    // setTransferIndexForGivenId(value: number): void {
    //   this._transfers.selected_index = this._transfers.all.findIndex((rec: ITransfer) => {
    //     return rec.cID === value
    //   })
    // },
    // evaluateTransfers(year = CONS.DEFAULTS.YEAR): ITotalController {
    //   console.info('RECORDS: evaluateTransfers', year)
    //   const oldestTransferFirst = [...this._transfers.all]
    //   oldestTransferFirst.sort((a: ITransfer, b: ITransfer): number => {
    //     return (a.mSortDate ?? 0) - (b.mSortDate ?? 0)
    //   })
    //   const allStocksPlusZero = [{cID: 0}, ...this._stocks.all]
    //   const totalController: ITotalController = {...CONS.RECORDS.CONTROLLER.TOTAL}
    //   //
    //   allStocksPlusZero.forEach((stock: IStock) => {
    //     const transfersPerStock = oldestTransferFirst.filter((transfer: ITransfer) => {
    //       const currentYear = new Date(transfer.mSortDate ?? 0).getFullYear()
    //       return transfer.cStockID === stock.cID && currentYear <= year
    //     })
    //     const dividendTransfersPerStock: ITransfer[] = []
    //     const activeStockIndex = this.getAccountIndexById(stock.cID)
    //     let portfolio = 0
    //     let buyCount = 0
    //     let invest = 0
    //     transfersPerStock.forEach((transfer: ITransfer) => {
    //       totalController.fees += transfer.cFees ?? 0
    //       totalController.taxes +=
    //         (transfer.cTax ?? 0) + (transfer.cFTax ?? 0) + (transfer.cSTax ?? 0) + (transfer.cSoli ?? 0)
    //       switch (transfer.cType) {
    //         case CONS.DB.RECORD_TYPES.BUY:
    //           totalController.buy += (transfer.cUnitQuotation ?? 0) * (transfer.cCount ?? 0)
    //           portfolio += transfer.cCount ?? 0
    //           buyCount += transfer.cCount ?? 0
    //           invest += (transfer.cUnitQuotation ?? 0) * (transfer.cCount ?? 0)
    //           break
    //         case CONS.DB.RECORD_TYPES.SELL:
    //           totalController.sell += (transfer.cUnitQuotation ?? 0) * (transfer.cCount ?? 0)
    //           portfolio += transfer.cCount ?? 0
    //           invest = (portfolio * invest) / buyCount
    //           buyCount = portfolio
    //           if (portfolio < 0.9 && portfolio > -0.9) {
    //             portfolio = 0
    //             buyCount = 0
    //             invest = 0
    //           }
    //           break
    //         case CONS.DB.RECORD_TYPES.DIV:
    //           totalController.dividends += (transfer.cUnitQuotation ?? 0) * (transfer.cCount ?? 0)
    //           dividendTransfersPerStock.push(transfer)
    //           break
    //         case CONS.DB.RECORD_TYPES.DEPOSIT:
    //           totalController.deposits += transfer.cAmount ?? 0
    //           break
    //         case CONS.DB.RECORD_TYPES.WITHDRAWAL:
    //           totalController.withdrawals += transfer.cAmount ?? 0
    //           break
    //         default:
    //           console.error('RECORDS: evaluateTransfers:unknown type', transfer.cType)
    //       }
    //     })
    //     if (activeStockIndex > -1) {
    //       this._stocks.active[activeStockIndex].mPortfolio = portfolio
    //       this._stocks.active[activeStockIndex].mBuyValue = buyCount > 0.9 ? invest / buyCount : 0
    //       this._transfers.dividend_transfers_per_stock.set(stock.cID, dividendTransfersPerStock)
    //     }
    //     totalController.depotBuyValue += buyCount > 0.9 ? (portfolio * invest) / buyCount : 0
    //   })
    //   totalController.account =
    //     totalController.dividends +
    //     totalController.deposits -
    //     totalController.sell +
    //     totalController.withdrawals -
    //     totalController.buy +
    //     totalController.fees +
    //     totalController.taxes
    //   totalController.earnings = totalController.depotBuyValue - totalController.sell - totalController.buy
    //   totalController.winloss = totalController.winloss === undefined ? 0 : totalController.winloss
    //   totalController.depot = totalController.depot === undefined ? 0 : totalController.depot
    //   if (year === CONS.DEFAULTS.YEAR) {
    //     this._transfers.total_controller = totalController
    //   }
    //   return {...totalController}
    // },
    // updatePage(data: TFetch[]): void {
    //   console.info('RECORDS: updatePage', data)
    //   const {toNumber} = useApp()
    //   const settings = useSettingsStore()
    //   const runtime = useRuntimeStore()
    //   let factor = 1
    //   let top = settings.itemsPerPageStocks
    //   const rest = this._stocks.active.length % settings.itemsPerPageStocks
    //   const lastPage = Math.ceil(this._stocks.active.length / settings.itemsPerPageStocks)
    //   const dataPageCount = Math.ceil(data.length / settings.itemsPerPageStocks)
    //   if (lastPage === this._stocks.active_page) {
    //     top = (this._stocks.active_page - 1) * settings.itemsPerPageStocks + rest
    //   } else {
    //     top = (this._stocks.active_page - 1) * settings.itemsPerPageStocks + dataPageCount * this._stocks.active_page_count
    //   }
    //   for (let i = (this._stocks.active_page - 1) * settings.itemsPerPageStocks; i < top; i++) {
    //     const id = this._stocks.active[i].cID as number
    //     const idValues: TFetch[] = data.filter((obj: TFetch) => {
    //       return obj.id === id
    //     })
    //     const buyValue = this._stocks.active[i].mBuyValue ?? 0
    //     const portfolio = this._stocks.active[i].mPortfolio ?? 0
    //     const euroChange = (toNumber(idValues[0].rate) - buyValue) * portfolio
    //     const percentChange = buyValue * portfolio !== 0 ? (euroChange * 100) / (buyValue * portfolio) : 0
    //     if (idValues.length > 0) {
    //       if (idValues[0].cur?.includes('USD')) {
    //         factor = runtime.exchangesCurUsd
    //       } else if (idValues[0].cur?.includes('EUR')) {
    //         factor = runtime.exchangesCurEur
    //       }
    //       const stockValues: IOnlineStockValues = {
    //         index: i,
    //         value: toNumber(idValues[0].rate) / factor,
    //         min: toNumber(idValues[0].min) / factor,
    //         max: toNumber(idValues[0].max) / factor,
    //         echange: euroChange,
    //         pchange: percentChange
    //       }
    //       this._setActiveStocksValues(stockValues)
    //     }
    //   }
    // },
    loadBkupObjectIntoStore(): void {
      console.log('RECORDS: loadBkupObjectIntoStore')
      let account: IAccount
      let booking: IBooking
      let accountType: IBookingType
      for (account of this._bkup_object.account) {
        // addAccount = migrateStock({...stock})
        this._loadAccountIntoStore(account)
      }
      for (accountType of this._bkup_object.account_type) {
        this._loadAccounTypeIntoStore(accountType)
      }
      for (booking of this._bkup_object.booking) {
        this._loadBookingIntoStore(booking)
      }
      // this.evaluateTransfers()
      // this._sortActiveStocks()
      // this.setActiveStocksPage(1)
      // this.resetActiveStocksValues()
    },
    // async updateWrapper(): Promise<void> {
    //   console.log('RECORDS: updateWrapper')
    //   const readIsin = () => {
    //     console.log('RECORDS: readIsin')
    //     const settings = useSettingsStore()
    //     const isin: TFetch[] = []
    //     const isinDates: TFetch[] = []
    //     const rest = this._stocks.active.length % settings.itemsPerPageStocks
    //     const lastPage = Math.ceil(this._stocks.active.length / settings.itemsPerPageStocks)
    //     const activePortfolioCount = this._stocks.active.filter((stock: IStock) => {
    //       let portfolio = 0
    //       if (stock.mPortfolio !== undefined) {
    //         portfolio = stock.mPortfolio
    //       }
    //       return portfolio > 0
    //     }).length
    //     const portfolioCount = Math.ceil(activePortfolioCount / settings.itemsPerPageStocks)
    //     let pageStocks: IStock[] = []
    //     this._stocks.active_page_count = this._stocks.active_page < lastPage ? settings.itemsPerPageStocks : rest
    //     if (this._stocks.active.length > 0) {
    //       if (portfolioCount > 1 && this._stocks.active_page <= portfolioCount) {
    //         if (this._stocks.active_page === 1) {
    //           pageStocks = this._stocks.active.slice(
    //             (this._stocks.active_page - 1) * settings.itemsPerPageStocks,
    //             (this._stocks.active_page - 1) * settings.itemsPerPageStocks + portfolioCount * this._stocks.active_page_count
    //           )
    //         }
    //       } else {
    //         pageStocks = this._stocks.active.slice(
    //           (this._stocks.active_page - 1) * settings.itemsPerPageStocks,
    //           (this._stocks.active_page - 1) * settings.itemsPerPageStocks + this._stocks.active_page_count
    //         )
    //       }
    //       for (let i = 0; i < pageStocks.length; i++) {
    //         if (pageStocks[i].mValue === 0) {
    //           isin.push({id: pageStocks[i].cID, isin: pageStocks[i].cISIN, min: '0', rate: '0', max: '0', cur: ''})
    //         }
    //         if ((pageStocks[i].cMeetingDay === 0 || pageStocks[i].cQuarterDay === 0) && pageStocks[i].mAskDates) {
    //           isinDates.push({
    //             id: pageStocks[i].cID,
    //             isin: pageStocks[i].cISIN,
    //             gm: pageStocks[i].cMeetingDay,
    //             qf: pageStocks[i].cQuarterDay
    //           })
    //           pageStocks[i].mAskDates = false
    //         }
    //       }
    //     }
    //     return {isin, isinDates}
    //   }
    //   const runtime = useRuntimeStore()
    //   const readISIN = readIsin()
    //   if (readISIN.isin.length > 0) {
    //     runtime.setIsStocksLoading(true)
    //     appPort().postMessage({type: CONS.FETCH_API.ASK__MIN_RATE_MAX, data: readISIN.isin})
    //   }
    //   if (readISIN.isinDates.length > 0) {
    //     appPort().postMessage({type: CONS.FETCH_API.ASK__DATES_DATA, data: readISIN.isinDates})
    //   }
    // },
    async storageIntoStore(): Promise<void> {
      console.log('RECORDS: storageIntoStore')
      const response: IStorageLocal = await browser.storage.local.get()
      this._account.active_id = response.sAccountActiveId
    },
    async cleanStoreAndDatabase(): Promise<string> {
      console.log('RECORDS: cleanStoreAndDatabase')
      this._booking.all.splice(0, this._booking.all.length)
      this._booking_type.all.splice(0, this._booking_type.all.length)
      this._account.all.splice(0, this._account.all.length)
      this._booking.selected_index = 0
      this._booking_type.selected_index = 0
      this._booking_type.selected_index = 0
      return new Promise((resolve, reject) => {
        const onError = (ev: ErrorEvent): void => {
          reject(ev.message)
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
        const requestTransaction = this._dbi.transaction([CONS.DB.STORES.BOOKING, CONS.DB.STORES.ACCOUNT, CONS.DB.STORES.BOOKING_TYPE], 'readwrite')
        requestTransaction.addEventListener(CONS.EVENTS.COMP, onComplete, CONS.SYSTEM.ONCE)
        requestTransaction.addEventListener(CONS.EVENTS.ERR, onError, CONS.SYSTEM.ONCE)
        const requestClearBooking = requestTransaction.objectStore(CONS.DB.STORES.BOOKING).clear()
        requestClearBooking.addEventListener(CONS.EVENTS.SUC, onSuccessClearBooking, false)
        const requestClearAccount = requestTransaction.objectStore(CONS.DB.STORES.ACCOUNT).clear()
        requestClearAccount.addEventListener(CONS.EVENTS.SUC, onSuccessClearAccount, false)
        const requestClearAccountType = requestTransaction.objectStore(CONS.DB.STORES.BOOKING_TYPE).clear()
        requestClearAccountType.addEventListener(CONS.EVENTS.SUC, onSuccessClearAccountType, false)
      })
    },
    async openDatabase(): Promise<string> {
      return new Promise((resolve, reject) => {
        const onError = (err: ErrorEvent): void => {
          reject(err.message)
        }
        const onSuccess = (ev: Event): void => {
          this._dbi = (ev.target as IDBOpenDBRequest).result
          resolve('RECORDS: database opened successfully!')
        }
        const openDBRequest = indexedDB.open(CONS.DB.NAME, CONS.DB.VERSION)
        openDBRequest.addEventListener(CONS.EVENTS.SUC, onSuccess, CONS.SYSTEM.ONCE)
        openDBRequest.addEventListener(CONS.EVENTS.ERR, onError, CONS.SYSTEM.ONCE)
      })
    },
    async databaseIntoStore(): Promise<string> {
      console.info('RECORDS: databaseIntoStore')
      // const runtime = useRuntimeStore()
      this._account.all.splice(0, this._account.all.length)
      this._booking_type.all.splice(0, this._booking_type.all.length)
      this._booking.all.splice(0, this._booking.all.length)
      this._booking.selected_index = 0
      this._booking_type.selected_index = 0
      this._account.selected_index = 0
      return new Promise((resolve, reject) => {
        const onComplete = async (): Promise<void> => {
          console.info('RECORDS: databaseIntoStore: all database records loaded into memory!')
          // this.evaluateTransfers()
          // this._sortActiveStocks()
          // this.setActiveStocksPage(1)
          // this.resetActiveStocksValues()
          // runtime.setTable('StocksTable')
          // await this.updateWrapper()
          resolve('RECORDS: databaseIntoStore: all database records loaded into memory!')
        }
        const onAbort = (): void => {
          notice(['RECORDS: databaseIntoStore: transaction aborted!', requestTransaction.error as string])
          reject(requestTransaction.error)
        }
        const requestTransaction = this._dbi.transaction([CONS.DB.STORES.BOOKING, CONS.DB.STORES.ACCOUNT, CONS.DB.STORES.BOOKING_TYPE], 'readonly')
        requestTransaction.addEventListener(CONS.EVENTS.COMP, onComplete, CONS.SYSTEM.ONCE)
        requestTransaction.addEventListener(CONS.EVENTS.ABORT, onAbort, CONS.SYSTEM.ONCE)
        const onSuccessAccountOpenCursor = (ev: TIDBRequestEvent): void => {
          const cursor = ev.target.result
          if (cursor !== null) {
            this._loadAccountIntoStore(cursor.value)
            cursor.continue()
          }
          // else {
          //   requestStocksOpenCursor.removeEventListener(CONS.EVENTS.SUC, onSuccessStocksOpenCursor, false)
          //   console.info('RECORDS: stocks loaded into memory')
          //   const onSuccessTransfersOpenCursor = (ev: TIDBRequestEvent): void => {
          //     const cursor: IDBCursorWithValue | null = ev.target.result
          //     if (cursor !== null) {
          //       const transfer: ITransfer = {...cursor.value}
          //       const newTransfer = migrateTransfer({...transfer})
          //       const currentStock: IStock[] = this._stocks.all.filter((stock: IStock) => {
          //         return stock.cID === newTransfer.cStockID
          //       })
          //       this._loadTransferIntoStore(currentStock, newTransfer)
          //       cursor.continue()
          //     } else {
          //       requestTransfersOpenCursor.removeEventListener(CONS.EVENTS.SUC, onSuccessTransfersOpenCursor, false)
          //       console.info('RECORDS: transfers loaded into memory')
          //       this._sortTransfers()
          //     }
          //   }
        }
        const onSuccessAccountTypeOpenCursor = (ev: TIDBRequestEvent): void => {
          const cursor = ev.target.result
          if (cursor !== null) {
            this._loadBookingTypeIntoStore(cursor.value)
            cursor.continue()
          }
        }
        const onSuccessBookingOpenCursor = (ev: TIDBRequestEvent): void => {
          const cursor = ev.target.result
          if (cursor !== null) {
            this._loadBookingIntoStore(cursor.value)
            cursor.continue()
          }
        }
        const requestAccountOpenCursor = requestTransaction.objectStore(CONS.DB.STORES.ACCOUNT).openCursor()
        requestAccountOpenCursor.addEventListener(CONS.EVENTS.SUC, onSuccessAccountOpenCursor, false)
        const requestAccountTypeOpenCursor = requestTransaction.objectStore(CONS.DB.STORES.BOOKING_TYPE).openCursor()
        requestAccountTypeOpenCursor.addEventListener(CONS.EVENTS.SUC, onSuccessAccountTypeOpenCursor, false)
        const requestBookingOpenCursor = requestTransaction.objectStore(CONS.DB.STORES.BOOKING).openCursor()
        requestBookingOpenCursor.addEventListener(CONS.EVENTS.SUC, onSuccessBookingOpenCursor, false)
      })
    },
    async storeIntoDatabase(): Promise<string> {
      console.log('RECORDS: storeIntoDatabase')
      return new Promise((resolve, reject) => {
        const onComplete = (): void => {
          // requestadd Account.removeEventListener(CONS.EVENTS.ERR, onError, false)
          notice(['All memory records are added to the database!'])
          resolve('RECORDS: storeIntoDatabase: all memory records are added to the database!')
        }
        const onAbort = (): void => {
          notice(['Transaction aborted!', requestTransaction.error as string])
          reject(requestTransaction.error)
        }
        const onError = (ev: ErrorEvent): void => {
          reject(ev.message)
        }
        const requestTransaction = this._dbi.transaction([CONS.DB.STORES.ACCOUNT, CONS.DB.STORES.BOOKING_TYPE, CONS.DB.STORES.BOOKING], 'readwrite')
        requestTransaction.addEventListener(CONS.EVENTS.COMP, onComplete, CONS.SYSTEM.ONCE)
        requestTransaction.addEventListener(CONS.EVENTS.ABORT, onError, CONS.SYSTEM.ONCE)
        requestTransaction.addEventListener(CONS.EVENTS.ABORT, onAbort, CONS.SYSTEM.ONCE)
        for (let i = 0; i < this._account.all.length; i++) {
          requestTransaction.objectStore(CONS.DB.STORES.ACCOUNT).add({...this._account.all[i]})
        }
        for (let i = 0; i < this._booking_type.all.length; i++) {
          requestTransaction.objectStore(CONS.DB.STORES.BOOKING_TYPE).add({...this._booking_type.all[i]})
        }
        for (let i = 0; i < this._booking.all.length; i++) {
          requestTransaction.objectStore(CONS.DB.STORES.BOOKING).add({...this._booking.all[i]})
        }
      })
    },
    // async updateAccountsStoreIntoDatabase(): Promise<string> {
    //   console.log('RECORDS: updateAccountsStoreIntoDatabase')
    //   return new Promise((resolve, reject) => {
    //     let requestaddAccount: IDBRequest
    //     const onComplete = (): void => {
    //       requestaddAccount.removeEventListener(CONS.EVENTS.ERR, onError, false)
    //       resolve('RECORDS: updateAccountsStoreIntoDatabase: stocks updated in database!')
    //     }
    //     const onAbort = (): void => {
    //       notice(['Transaction aborted!', requestTransaction.error as string])
    //       reject(requestTransaction.error)
    //     }
    //     const onError = (ev: ErrorEvent): void => {
    //       reject(ev.message)
    //     }
    //     const requestTransaction = this._dbi.transaction([CONS.DB.STORES.S], 'readwrite')
    //     requestTransaction.addEventListener(CONS.EVENTS.COMP, onComplete, CONS.SYSTEM.ONCE)
    //     requestTransaction.addEventListener(CONS.EVENTS.ABORT, onAbort, CONS.SYSTEM.ONCE)
    //     for (let i = 0; i < this._stocks.all.length; i++) {
    //       const stock: IStock = {...this._stocks.all[i]}
    //       delete stock.mBuyValue
    //       delete stock.mRealBuyValue
    //       delete stock.mPortfolio
    //       delete stock.mDividendYielda
    //       delete stock.mDividendYeara
    //       delete stock.mDividendYieldb
    //       delete stock.mDividendYearb
    //       delete stock.mRealDividend
    //       delete stock.mMin
    //       delete stock.mMax
    //       delete stock.mValue
    //       delete stock.mChange
    //       delete stock.mEuroChange
    //       requestaddAccount = requestTransaction.objectStore(CONS.DB.STORES.S).put({...stock})
    //       requestaddAccount.addEventListener(CONS.EVENTS.ERR, onError, false)
    //     }
    //   })
    // },
    async addAccount(record: Omit<IAccount, 'cID'>): Promise<string> {
      return new Promise((resolve, reject) => {
        const onSuccess = async (ev: Event): Promise<void> => {
          if (ev.target instanceof IDBRequest) {
            const memRecord: IAccount = {
              ...record,
              cID: ev.target.result
            }
            this._account.all.push(memRecord)
            this._account.active_id = ev.target.result
            await browser.storage.local.set({ sAccountActiveId: ev.target.result })
            resolve(CONS.RESULTS.SUCCESS)
          } else {
            reject(CONS.RESULTS.ERROR)
          }
        }
        const onError = (ev: ErrorEvent): void => {
          reject(ev)
        }
        const requestTransaction = this._dbi.transaction([CONS.DB.STORES.ACCOUNT], 'readwrite')
        requestTransaction.addEventListener(CONS.EVENTS.ERR, onError, CONS.SYSTEM.ONCE)
        const requestAdd = requestTransaction.objectStore(CONS.DB.STORES.ACCOUNT).add(record)
        requestAdd.addEventListener(CONS.EVENTS.SUC, onSuccess, CONS.SYSTEM.ONCE)
      })
    },
    async updateAccount(data: IAccount, msg: boolean = false): Promise<string> {
      console.info('RECORDS: updateAccount', data)
      return new Promise((resolve, reject) => {
        const onSuccess = (): void => {
          requestUpdate.removeEventListener(CONS.EVENTS.SUC, onSuccess, false)
          if (msg) {
            notice(['sm_msg_updaterecord'])
          }
          resolve('Account updated')
        }
        const onError = (ev: ErrorEvent): void => {
          requestTransaction.removeEventListener(CONS.EVENTS.ERR, onError, false)
          requestUpdate.removeEventListener(CONS.EVENTS.ERR, onError, false)
          notice([ev.message])
          reject(ev.message)
        }
        const requestTransaction = this._dbi.transaction([CONS.DB.STORES.ACCOUNT], 'readwrite')
        requestTransaction.addEventListener(CONS.EVENTS.ERR, onError, false)
        const requestUpdate = requestTransaction.objectStore(CONS.DB.STORES.ACCOUNT).put({...data})
        requestUpdate.addEventListener(CONS.EVENTS.SUC, onSuccess, false)
        requestUpdate.addEventListener(CONS.EVENTS.ERR, onError, false)
      })
    },
    async deleteAccount(ident: number): Promise<string> {
      const indexOfAccount = this._account.all.findIndex((account: IAccount) => {
        return account.cID === ident
      })
      return new Promise((resolve, reject) => {
        const onSuccess = (): void => {
          requestTransaction.removeEventListener(CONS.EVENTS.SUC, onSuccess, false)
          this._account.all.splice(indexOfAccount, 1)
          resolve('Account deleted')
        }
        const onError = (ev: ErrorEvent): void => {
          requestTransaction.removeEventListener(CONS.EVENTS.ERR, onError, false)
          requestDelete.removeEventListener(CONS.EVENTS.ERR, onError, false)
          reject(ev.message)
        }
        const requestTransaction = this._dbi.transaction([CONS.DB.STORES.ACCOUNT], 'readwrite')
        requestTransaction.addEventListener(CONS.EVENTS.ERR, onError, false)
        const requestDelete = requestTransaction.objectStore(CONS.DB.STORES.ACCOUNT).delete(ident)
        requestDelete.addEventListener(CONS.EVENTS.ERR, onError, false)
        requestDelete.addEventListener(CONS.EVENTS.SUC, onSuccess, false)
      })
    },
    async addBookingType(record: Omit<IBookingType, 'cID'>): Promise<string> {
      return new Promise((resolve, reject) => {
        const onSuccess = (ev: Event): void => {
          if (ev.target instanceof IDBRequest) {
            const memRecord: IBookingType = {
              ...record,
              cID: ev.target.result
            }
            this._booking_type.all.push(memRecord)
            resolve(CONS.RESULTS.SUCCESS)
          } else {
            reject(CONS.RESULTS.ERROR)
          }
        }
        const onError = (ev: ErrorEvent): void => {
          reject(ev.message)
        }
        const requestTransaction = this._dbi.transaction([CONS.DB.STORES.BOOKING_TYPE], 'readwrite')
        requestTransaction.addEventListener(CONS.EVENTS.ERR, onError, CONS.SYSTEM.ONCE)
        const requestAdd = requestTransaction.objectStore(CONS.DB.STORES.BOOKING_TYPE).add(record)
        requestAdd.addEventListener(CONS.EVENTS.SUC, onSuccess, CONS.SYSTEM.ONCE)
      })
    },
    async updateBookingType(data: IBookingType, msg: boolean = false): Promise<string> {
      console.info('RECORDS: updateBookingType', data)
      return new Promise((resolve, reject) => {
        const onSuccess = (): void => {
          requestUpdate.removeEventListener(CONS.EVENTS.SUC, onSuccess, false)
          if (msg) {
            notice(['sm_msg_updaterecord'])
          }
          resolve('Account type updated')
        }
        const onError = (ev: ErrorEvent): void => {
          requestTransaction.removeEventListener(CONS.EVENTS.ERR, onError, false)
          requestUpdate.removeEventListener(CONS.EVENTS.ERR, onError, false)
          notice([ev.message])
          reject(ev.message)
        }
        const requestTransaction = this._dbi.transaction([CONS.DB.STORES.BOOKING_TYPE], 'readwrite')
        requestTransaction.addEventListener(CONS.EVENTS.ERR, onError, false)
        const requestUpdate = requestTransaction.objectStore(CONS.DB.STORES.BOOKING_TYPE).put({...data})
        requestUpdate.addEventListener(CONS.EVENTS.SUC, onSuccess, false)
        requestUpdate.addEventListener(CONS.EVENTS.ERR, onError, false)
      })
    },
    async deleteBookingType(ident: number): Promise<string> {
      const indexOfAccountType = this._account.all.findIndex((accountType: IBookingType) => {
        return accountType.cID === ident
      })
      return new Promise((resolve, reject) => {
        const onSuccess = (): void => {
          requestTransaction.removeEventListener(CONS.EVENTS.SUC, onSuccess, false)
          this._account.all.splice(indexOfAccountType, 1)
          resolve('Account type deleted')
        }
        const onError = (ev: ErrorEvent): void => {
          requestTransaction.removeEventListener(CONS.EVENTS.ERR, onError, false)
          requestDelete.removeEventListener(CONS.EVENTS.ERR, onError, false)
          reject(ev.message)
        }
        const requestTransaction = this._dbi.transaction([CONS.DB.STORES.BOOKING_TYPE], 'readwrite')
        requestTransaction.addEventListener(CONS.EVENTS.ERR, onError, false)
        const requestDelete = requestTransaction.objectStore(CONS.DB.STORES.BOOKING_TYPE).delete(ident)
        requestDelete.addEventListener(CONS.EVENTS.ERR, onError, false)
        requestDelete.addEventListener(CONS.EVENTS.SUC, onSuccess, false)
      })
    },
    async addBooking(record: Omit<IBooking, 'cID'>): Promise<string> {
      return new Promise((resolve, reject) => {
        const onSuccess = (ev: Event): void => {
          if (ev.target instanceof IDBRequest) {
            const memRecord: IBooking = {
              ...record,
              cID: ev.target.result
            }
            this._booking.all.push(memRecord)
            resolve(CONS.RESULTS.SUCCESS)
          } else {
            reject(CONS.RESULTS.ERROR)
          }
        }
        const onError = (ev: ErrorEvent): void => {
          reject(ev.message)
        }
        const requestTransaction = this._dbi.transaction([CONS.DB.STORES.BOOKING], 'readwrite')
        requestTransaction.addEventListener(CONS.EVENTS.ERR, onError, CONS.SYSTEM.ONCE)
        const requestAdd = requestTransaction.objectStore(CONS.DB.STORES.BOOKING).add(record)
        requestAdd.addEventListener(CONS.EVENTS.SUC, onSuccess, CONS.SYSTEM.ONCE)
      })
    },
    async updateBooking(data: IBooking, msg: boolean = false): Promise<string> {
      console.info('RECORDS: updateBooking', data)
      return new Promise((resolve, reject) => {
        const onSuccess = (): void => {
          requestUpdate.removeEventListener(CONS.EVENTS.SUC, onSuccess, false)
          if (msg) {
            notice(['sm_msg_updaterecord'])
          }
          resolve('Booking updated')
        }
        const onError = (ev: ErrorEvent): void => {
          requestTransaction.removeEventListener(CONS.EVENTS.ERR, onError, false)
          requestUpdate.removeEventListener(CONS.EVENTS.ERR, onError, false)
          notice([ev.message])
          reject(ev.message)
        }
        const requestTransaction = this._dbi.transaction([CONS.DB.STORES.BOOKING], 'readwrite')
        requestTransaction.addEventListener(CONS.EVENTS.ERR, onError, false)
        const requestUpdate = requestTransaction.objectStore(CONS.DB.STORES.BOOKING).put({...data})
        requestUpdate.addEventListener(CONS.EVENTS.SUC, onSuccess, false)
        requestUpdate.addEventListener(CONS.EVENTS.ERR, onError, false)
      })
    },
    async deleteBooking(ident: number): Promise<string> {
      const indexOfBooking = this._account.all.findIndex((booking: IBooking) => {
        return booking.cID === ident
      })
      return new Promise((resolve, reject) => {
        const onSuccess = (): void => {
          requestTransaction.removeEventListener(CONS.EVENTS.SUC, onSuccess, false)
          this._booking.all.splice(indexOfBooking, 1)
          resolve('Booking deleted')
        }
        const onError = (ev: ErrorEvent): void => {
          requestTransaction.removeEventListener(CONS.EVENTS.ERR, onError, false)
          requestDelete.removeEventListener(CONS.EVENTS.ERR, onError, false)
          reject(ev.message)
        }
        const requestTransaction = this._dbi.transaction([CONS.DB.STORES.BOOKING], 'readwrite')
        requestTransaction.addEventListener(CONS.EVENTS.ERR, onError, false)
        const requestDelete = requestTransaction.objectStore(CONS.DB.STORES.BOOKING).delete(ident)
        requestDelete.addEventListener(CONS.EVENTS.ERR, onError, false)
        requestDelete.addEventListener(CONS.EVENTS.SUC, onSuccess, false)
      })
    }
  }
})

console.log('--- records.js ---')

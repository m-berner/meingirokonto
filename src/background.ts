/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * you could obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2014-2025, Martin Berner, meingirokonto@gmx.de. All rights reserve
 */
import {useApp} from '@/composables/useApp'

interface IUseListener {
  onClick: () => Promise<void>
  onRemove: (permissions: browser.permissions.Permissions) => void
  onInstall: () => void
}

const initStorageLocal = async (): Promise<void> => {
  console.log('BACKGROUND: initStorageLocal')
  const {CONS} = useApp()
  const storageLocal: IStorageLocal = await browser.storage.local.get()
  if (storageLocal.service === undefined) {
    await browser.storage.local.set({
      service: CONS.DEFAULTS.STORAGE.service
    })
  }
  if (storageLocal.skin === undefined) {
    await browser.storage.local.set({skin: CONS.DEFAULTS.STORAGE.skin})
  }
  if (storageLocal.indexes === undefined) {
    await browser.storage.local.set({
      indexes: CONS.DEFAULTS.STORAGE.indexes
    })
  }
  if (storageLocal.materials === undefined) {
    await browser.storage.local.set({
      materials: CONS.DEFAULTS.STORAGE.materials
    })
  }
  if (storageLocal.markets === undefined) {
    await browser.storage.local.set({
      markets: CONS.DEFAULTS.STORAGE.markets
    })
  }
  if (storageLocal.exchanges === undefined) {
    await browser.storage.local.set({
      exchanges: CONS.DEFAULTS.STORAGE.exchanges
    })
  }
  if (storageLocal.partner === undefined) {
    await browser.storage.local.set({
      partner: CONS.DEFAULTS.STORAGE.partner
    })
  }
  if (storageLocal.items_per_page_stocks === undefined) {
    await browser.storage.local.set({
      items_per_page_stocks: CONS.DEFAULTS.STORAGE.items_per_page_stocks
    })
  }
  if (storageLocal.items_per_page_transfers === undefined) {
    await browser.storage.local.set({
      items_per_page_transfers: CONS.DEFAULTS.STORAGE.items_per_page_transfers
    })
  }
}
const useListener = (): IUseListener => {
  const {CONS} = useApp()
  const appUrls = {url: browser.runtime.getURL(CONS.RESOURCES.INDEX) + '*'}
  const onClick = async (): Promise<void> => {
    console.log('BACKGROUND: onClick')
    //const {notice} = useApp()
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
  const onRemove = (permissions: browser.permissions.Permissions): void => {
    console.warn('BACKGROUND: onRemove')
    const {notice} = useApp()
    notice(['Online data might not be available.', JSON.stringify(permissions)])
  }
  // NOTE: onInstall runs at addon install, addon update and firefox update
  const onInstall = (): void => {
    console.log('BACKGROUND: onInstall')
    // const {migrateStock, migrateTransfer} = useApp()
    const onSuccess = (ev: TIDBRequestEvent): void => {
      console.log('BACKGROUND: onInstall: onSuccess')
      ev.target.result.close()
    }
    const onError = (err: ErrorEvent): void => {
      console.error('BACKGROUND: onError: ', err.message)
    }
    const onUpgradeNeeded = async (
      ev: IDBVersionChangeEvent
    ): Promise<void> => {
      console.info('BACKGROUND: onInstall: onUpgradeNeeded', ev.oldVersion)
      const createDB = (): void => {
        console.log('BACKGROUND: onInstall: onUpgradeNeeded: createDB')
        const requestCreateAccountStore = dbOpenRequest.result.createObjectStore(
          CONS.DB.STORES.ACCOUNT,
          {
            keyPath: 'cID',
            autoIncrement: true
          })
        const requestCreateBookingStore = dbOpenRequest.result.createObjectStore(
          CONS.DB.STORES.BOOKING,
          {
            keyPath: 'cID',
            autoIncrement: true
          }
        )
        const requestCreateAccountFrameStore = dbOpenRequest.result.createObjectStore(
          CONS.DB.STORES.ACCOUNT_TYPE,
          {
            keyPath: 'cID',
            autoIncrement: true
          }
        )
        requestCreateAccountStore.createIndex(`${CONS.DB.STORES.ACCOUNT}_uk1`, 'cID', {unique: true})
        requestCreateBookingStore.createIndex(`${CONS.DB.STORES.BOOKING}_uk1`, 'cID', {unique: true})
        requestCreateAccountFrameStore.createIndex(`${CONS.DB.STORES.ACCOUNT_TYPE}_uk1`, 'cID', {unique: true})
        requestCreateAccountFrameStore.createIndex(`${CONS.DB.STORES.ACCOUNT_TYPE}_k1`, 'cName', {unique: true})
        requestCreateBookingStore.createIndex(`${CONS.DB.STORES.BOOKING}_k1`, 'cAccountID', {unique: false})
        requestCreateBookingStore.createIndex(`${CONS.DB.STORES.BOOKING}_k2`, 'cAccountTypeID', {unique: false})

        // requestCreateSStore.createIndex('stocks_uk2', 'cSym', optTrue)
        // requestCreateSStore.createIndex('stocks_k1', 'cFirstPage', optFalse)
        // requestCreateSStore.createIndex('stocks_k2', 'cFadeOut', optFalse)
        // requestCreateTStore.createIndex('transfers_k1', 'cDate', optFalse)
        // requestCreateTStore.createIndex('transfers_k2', 'cType', optFalse)
        // requestCreateTStore.createIndex('transfers_k3', 'cStockID', optFalse)
      }
      const updateDB = (): void => {
        console.log('BACKGROUND: onInstall: onUpgradeNeeded: updateDB')
        // const optFalse: IDBIndexParameters = {unique: false}
        // const onSuccessStocks = (ev: TIDBRequestEvent): void => {
        //   console.log(
        //     'BACKGROUND: onInstall: onUpgradeNeeded: createDB: onSuccessStocks'
        //   )
        //   const cursor: IDBCursorWithValue | null = ev.target.result
        //   if (cursor !== null) {
        //     const stock: IStock = cursor.value
        //     cursor.update(migrateStock({...stock}))
        //     cursor.continue()
        //   } else {
        //     stocksOpenCursorRequest?.removeEventListener(
        //       CONS.EVENTS.SUC,
        //       onSuccessStocks,
        //       false
        //     )
        //     const onSuccessTransfers = (ev: TIDBRequestEvent): void => {
        //       console.log(
        //         'BACKGROUND: onUpgradeNeeded: fCreateDB: onSuccessTransfers'
        //       )
        //       const cursor: IDBCursorWithValue | null = ev.target.result
        //       if (cursor !== null) {
        //         const transfer: ITransfer = cursor.value
        //         cursor.update(migrateTransfer({...transfer}))
        //         cursor.continue()
        //       } else {
        //         stocksOpenCursorRequest?.removeEventListener(
        //           CONS.EVENTS.SUC,
        //           onSuccessTransfers,
        //           false
        //         )
        //       }
        //     }
        //     if (dbOpenRequest?.transaction === null) {
        //       console.error('BACKGROUND: open database error')
        //     } else if (
        //       !dbOpenRequest.transaction
        //         ?.objectStore(CONS.DB.STORES.S)
        //         .indexNames.contains('stocks_k2')
        //     ) {
        //       dbOpenRequest.transaction
        //         ?.objectStore(CONS.DB.STORES.S)
        //         .createIndex('stocks_k2', 'cFadeOut', optFalse)
        //     }
        //     const requestTransfersOpenCursor:
        //       | IDBRequest<IDBCursorWithValue | null>
        //       | undefined = dbOpenRequest.transaction?.objectStore(CONS.DB.STORES.T).openCursor()
        //     requestTransfersOpenCursor?.addEventListener(
        //       CONS.EVENTS.SUC,
        //       onSuccessTransfers,
        //       false
        //     )
        //   }
        // }
        // const onErrorStocks = (err: ErrorEvent): void => {
        //   stocksOpenCursorRequest?.removeEventListener(
        //     CONS.EVENTS.ERR,
        //     onError,
        //     false
        //   )
        //   console.error(err.message)
        // }
        // const stocksOpenCursorRequest:
        //   | IDBRequest<IDBCursorWithValue | null>
        //   | undefined = dbOpenRequest?.transaction?.objectStore(CONS.DB.STORES.S).openCursor()
        // stocksOpenCursorRequest?.addEventListener(
        //   CONS.EVENTS.ERR,
        //   onErrorStocks,
        //   false
        // )
        // stocksOpenCursorRequest?.addEventListener(
        //   CONS.EVENTS.SUC,
        //   onSuccessStocks,
        //   false
        // )
        // for (
        //   let i = 0;
        //   i < dbOpenRequest.result.objectStoreNames.length;
        //   i++
        // ) {
        //   if (
        //     dbOpenRequest.result.objectStoreNames[i] !== CONS.DB.STORES.S &&
        //     dbOpenRequest.result.objectStoreNames[i] !== CONS.DB.STORES.T
        //   ) {
        //     dbOpenRequest.result.deleteObjectStore(
        //       dbOpenRequest.result.objectStoreNames[i]
        //     )
        //   }
        // }
      }
      const updateStorageLocal = async () => {
        const storageKeys = Object.keys(CONS.DEFAULTS.STORAGE)
        const storageValues = Object.values(CONS.DEFAULTS.STORAGE)
        const storage: IStorageLocal = await browser.storage.local.get(
          storageKeys
        )
        for (let i = 0; i < storageKeys.length; i++) {
          if (storage[storageKeys[i]] === undefined) {
            await browser.storage.local.set({
              [storageKeys[i]]: storageValues[i]
            })
          }
        }
      }
      if (ev.oldVersion === 0) {
        createDB()
      } else {
        updateDB()
        // remove historical values
        await browser.storage.local
          .remove(CONS.SYSTEM.STORAGE_OLD)
      }
      await updateStorageLocal()
    }
    //
    const dbOpenRequest = indexedDB.open(CONS.DB.NAME, CONS.DB.VERSION)
    dbOpenRequest.addEventListener(CONS.EVENTS.ERR, onError, CONS.SYSTEM.ONCE)
    dbOpenRequest.addEventListener(CONS.EVENTS.SUC, onSuccess, CONS.SYSTEM.ONCE)
    dbOpenRequest.addEventListener(CONS.EVENTS.UPG, onUpgradeNeeded, CONS.SYSTEM.ONCE)
  }
  return {onClick, onRemove, onInstall}
}
const {onClick, onRemove, onInstall} = useListener()
if (!browser.runtime.onInstalled.hasListener(onInstall)) {
  browser.runtime.onInstalled.addListener(onInstall)
}
if (!browser.action.onClicked.hasListener(onClick)) {
  browser.action.onClicked.addListener(onClick)
}
if (!browser.permissions.onRemoved.hasListener(onRemove)) {
  browser.permissions.onRemoved.addListener(onRemove)
}
await initStorageLocal()
console.info('--- background.js ---', window.location.href)
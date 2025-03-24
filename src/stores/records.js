import { defineStore } from 'pinia';
import { toRaw } from 'vue';
import { useApp } from '@/composables/useApp';
const { CONS, notice, offset } = useApp();
export const useRecordsStore = defineStore('records', {
    state: () => {
        return {
            _dbi: null,
            _account: {
                all: [],
                selected_index: -1
            },
            _booking: {
                all_per_account: [],
                dividend_transfers_per_stock: new Map(),
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
                    cDBCurrency: '',
                    cEngine: ''
                },
                account: [],
                booking: [],
                booking_type: []
            }
        };
    },
    getters: {
        account(state) {
            return state._account;
        },
        bookingType(state) {
            return state._booking_type;
        },
        booking(state) {
            return state._booking;
        },
        dbi(state) {
            return state._dbi;
        },
    },
    actions: {
        _loadAccountIntoStore(account) {
            this._account.all.push(account);
        },
        _loadBookingTypeIntoStore(bookingType) {
            this._booking_type.all.push(bookingType);
        },
        _loadBookingIntoStore(booking) {
            this._booking.all_per_account.push(booking);
        },
        _sortTransfers() {
            return this._transfers.all.sort((a, b) => {
                return (b.mSortDate ?? 0) - (a.mSortDate ?? 0);
            });
        },
        _getAccountIndexById(ident) {
            return this._account.findIndex((account) => {
                return account.cID === ident;
            });
        },
        _setActiveStocksValues(val) {
            this._stocks.active[val.index].mValue = val.value;
            this._stocks.active[val.index].mMin = val.min;
            this._stocks.active[val.index].mMax = val.max;
            this._stocks.active[val.index].mEuroChange = val.echange;
            this._stocks.active[val.index].mChange = val.pchange;
        },
        initialYearTransfers() {
            const years = this._transfers.all.map((record) => {
                return new Date(record.mSortDate ?? 0).getFullYear();
            });
            return Math.min(...Array.from(new Set(years)));
        },
        yearRangeTransfers() {
            const years = this._transfers.all.map((record) => {
                return new Date(record.mSortDate ?? 0).getFullYear();
            });
            const uniqueYears = Array.from(new Set(years));
            uniqueYears.sort((a, b) => {
                return b - a;
            });
            return uniqueYears;
        },
        setDates(i, d) {
            this._stocks.active[i].cMeetingDay = d.gm;
            this._stocks.active[i].cQuarterDay = d.qf;
        },
        setBkupObject(value) {
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
            };
            this._bkup_object = value;
        },
        loadBkupObjectIntoStore() {
            console.log('RECORDS: loadBkupObjectIntoStore');
            let account;
            let booking;
            let accountType;
            for (account of this._bkup_object.account) {
                this._loadAccountIntoStore(account);
            }
            for (accountType of this._bkup_object.account_type) {
                this._loadAccounTypeIntoStore(accountType);
            }
            for (booking of this._bkup_object.booking) {
                this._loadBookingIntoStore(booking);
            }
        },
        async cleanStoreAndDatabase() {
            console.log('RECORDS: cleanStoreAndDatabase');
            this._booking.all_per_account.splice(0, this._booking.all_per_account.length);
            this._booking_type.all.splice(0, this._booking_type.all.length);
            this._account.all.splice(0, this._account.all.length);
            this._booking.selected_index = 0;
            this._booking_type.selected_index = 0;
            this._booking_type.selected_index = 0;
            return new Promise((resolve, reject) => {
                const onError = (ev) => {
                    reject(ev.message);
                };
                const onComplete = () => {
                    resolve('RECORDS: all stores (databases and memory) are clean!');
                };
                const onSuccessClearBooking = () => {
                    requestClearBooking.removeEventListener(CONS.EVENTS.SUC, onSuccessClearBooking, false);
                    console.info('RECORDS: bookings dropped');
                };
                const onSuccessClearAccount = () => {
                    requestClearAccount.removeEventListener(CONS.EVENTS.SUC, onSuccessClearAccount, false);
                    console.info('RECORDS: accounts dropped');
                };
                const onSuccessClearAccountType = () => {
                    requestClearAccountType.removeEventListener(CONS.EVENTS.SUC, onSuccessClearAccountType, false);
                    console.info('RECORDS: account types dropped');
                };
                const requestTransaction = this._dbi.transaction([CONS.DB.STORES.BOOKING, CONS.DB.STORES.ACCOUNT, CONS.DB.STORES.BOOKING_TYPE], 'readwrite');
                requestTransaction.addEventListener(CONS.EVENTS.COMP, onComplete, CONS.SYSTEM.ONCE);
                requestTransaction.addEventListener(CONS.EVENTS.ERR, onError, CONS.SYSTEM.ONCE);
                const requestClearBooking = requestTransaction.objectStore(CONS.DB.STORES.BOOKING).clear();
                requestClearBooking.addEventListener(CONS.EVENTS.SUC, onSuccessClearBooking, false);
                const requestClearAccount = requestTransaction.objectStore(CONS.DB.STORES.ACCOUNT).clear();
                requestClearAccount.addEventListener(CONS.EVENTS.SUC, onSuccessClearAccount, false);
                const requestClearAccountType = requestTransaction.objectStore(CONS.DB.STORES.BOOKING_TYPE).clear();
                requestClearAccountType.addEventListener(CONS.EVENTS.SUC, onSuccessClearAccountType, false);
            });
        },
        async openDatabase() {
            return new Promise((resolve, reject) => {
                const onError = (err) => {
                    reject(err.message);
                };
                const onSuccess = (ev) => {
                    this._dbi = ev.target.result;
                    resolve('RECORDS: database opened successfully!');
                };
                const openDBRequest = indexedDB.open(CONS.DB.NAME, CONS.DB.VERSION);
                openDBRequest.addEventListener(CONS.EVENTS.SUC, onSuccess, CONS.SYSTEM.ONCE);
                openDBRequest.addEventListener(CONS.EVENTS.ERR, onError, CONS.SYSTEM.ONCE);
            });
        },
        async databaseIntoStore() {
            console.info('RECORDS: databaseIntoStore');
            this._account.all.splice(0, this._account.all.length);
            this._booking_type.all.splice(0, this._booking_type.all.length);
            this._booking.all_per_account.splice(0, this._booking.all_per_account.length);
            this._booking.selected_index = 0;
            this._booking_type.selected_index = 0;
            this._account.selected_index = 0;
            return new Promise((resolve, reject) => {
                const onComplete = async () => {
                    console.info('RECORDS: databaseIntoStore: all database records loaded into memory!');
                    resolve('RECORDS: databaseIntoStore: all database records loaded into memory!');
                };
                const onAbort = () => {
                    notice(['RECORDS: databaseIntoStore: transaction aborted!', requestTransaction.error]);
                    reject(requestTransaction.error);
                };
                const requestTransaction = this._dbi.transaction([CONS.DB.STORES.BOOKING, CONS.DB.STORES.ACCOUNT, CONS.DB.STORES.BOOKING_TYPE], 'readonly');
                requestTransaction.addEventListener(CONS.EVENTS.COMP, onComplete, CONS.SYSTEM.ONCE);
                requestTransaction.addEventListener(CONS.EVENTS.ABORT, onAbort, CONS.SYSTEM.ONCE);
                const onSuccessAccountOpenCursor = (ev) => {
                    const cursor = ev.target.result;
                    if (cursor !== null) {
                        this._loadAccountIntoStore(cursor.value);
                        cursor.continue();
                    }
                };
                const onSuccessAccountTypeOpenCursor = (ev) => {
                    const cursor = ev.target.result;
                    if (cursor !== null) {
                        this._loadBookingTypeIntoStore(cursor.value);
                        cursor.continue();
                    }
                };
                const onSuccessBookingOpenCursor = (ev) => {
                    const cursor = ev.target.result;
                    if (cursor !== null) {
                        this._loadBookingIntoStore(cursor.value);
                        cursor.continue();
                    }
                };
                const requestAccountOpenCursor = requestTransaction.objectStore(CONS.DB.STORES.ACCOUNT).openCursor();
                requestAccountOpenCursor.addEventListener(CONS.EVENTS.SUC, onSuccessAccountOpenCursor, false);
                const requestAccountTypeOpenCursor = requestTransaction.objectStore(CONS.DB.STORES.BOOKING_TYPE).openCursor();
                requestAccountTypeOpenCursor.addEventListener(CONS.EVENTS.SUC, onSuccessAccountTypeOpenCursor, false);
                const requestBookingOpenCursor = requestTransaction.objectStore(CONS.DB.STORES.BOOKING).openCursor();
                requestBookingOpenCursor.addEventListener(CONS.EVENTS.SUC, onSuccessBookingOpenCursor, false);
            });
        },
        async storeIntoDatabase() {
            console.log('RECORDS: storeIntoDatabase');
            return new Promise((resolve, reject) => {
                const onComplete = () => {
                    notice(['All memory records are added to the database!']);
                    resolve('RECORDS: storeIntoDatabase: all memory records are added to the database!');
                };
                const onAbort = () => {
                    notice(['Transaction aborted!', requestTransaction.error]);
                    reject(requestTransaction.error);
                };
                const onError = (ev) => {
                    reject(ev.message);
                };
                const requestTransaction = this._dbi.transaction([CONS.DB.STORES.ACCOUNT, CONS.DB.STORES.BOOKING_TYPE, CONS.DB.STORES.BOOKING], 'readwrite');
                requestTransaction.addEventListener(CONS.EVENTS.COMP, onComplete, CONS.SYSTEM.ONCE);
                requestTransaction.addEventListener(CONS.EVENTS.ABORT, onError, CONS.SYSTEM.ONCE);
                requestTransaction.addEventListener(CONS.EVENTS.ABORT, onAbort, CONS.SYSTEM.ONCE);
                for (let i = 0; i < this._account.all.length; i++) {
                    requestTransaction.objectStore(CONS.DB.STORES.ACCOUNT).add({ ...this._account.all[i] });
                }
                for (let i = 0; i < this._booking_type.all.length; i++) {
                    requestTransaction.objectStore(CONS.DB.STORES.BOOKING_TYPE).add({ ...this._booking_type.all[i] });
                }
                for (let i = 0; i < this._booking.all_per_account.length; i++) {
                    requestTransaction.objectStore(CONS.DB.STORES.BOOKING).add({ ...this._booking.all_per_account[i] });
                }
            });
        },
        async addAccount(record) {
            return new Promise((resolve, reject) => {
                const onSuccess = (ev) => {
                    if (ev.target instanceof IDBRequest) {
                        const memRecord = {
                            ...record,
                            cID: ev.target.result
                        };
                        this._account.all.push(memRecord);
                        resolve(CONS.RESULTS.SUCCESS);
                    }
                    else {
                        reject(CONS.RESULTS.ERROR);
                    }
                };
                const onError = (ev) => {
                    reject(ev);
                };
                const requestTransaction = this._dbi.transaction([CONS.DB.STORES.ACCOUNT], 'readwrite');
                requestTransaction.addEventListener(CONS.EVENTS.ERR, onError, CONS.SYSTEM.ONCE);
                const requestAdd = requestTransaction.objectStore(CONS.DB.STORES.ACCOUNT).add(record);
                requestAdd.addEventListener(CONS.EVENTS.SUC, onSuccess, CONS.SYSTEM.ONCE);
            });
        },
        async updateAccount(data, msg = false) {
            console.info('RECORDS: updateAccount', data);
            return new Promise((resolve, reject) => {
                const onSuccess = () => {
                    requestUpdate.removeEventListener(CONS.EVENTS.SUC, onSuccess, false);
                    if (msg) {
                        notice(['sm_msg_updaterecord']);
                    }
                    resolve('Account updated');
                };
                const onError = (ev) => {
                    requestTransaction.removeEventListener(CONS.EVENTS.ERR, onError, false);
                    requestUpdate.removeEventListener(CONS.EVENTS.ERR, onError, false);
                    notice([ev.message]);
                    reject(ev.message);
                };
                const requestTransaction = this._dbi.transaction([CONS.DB.STORES.ACCOUNT], 'readwrite');
                requestTransaction.addEventListener(CONS.EVENTS.ERR, onError, false);
                const requestUpdate = requestTransaction.objectStore(CONS.DB.STORES.ACCOUNT).put({ ...data });
                requestUpdate.addEventListener(CONS.EVENTS.SUC, onSuccess, false);
                requestUpdate.addEventListener(CONS.EVENTS.ERR, onError, false);
            });
        },
        async deleteAccount(ident) {
            const indexOfAccount = this._account.all.findIndex((account) => {
                return account.cID === ident;
            });
            return new Promise((resolve, reject) => {
                const onSuccess = () => {
                    requestTransaction.removeEventListener(CONS.EVENTS.SUC, onSuccess, false);
                    this._account.all.splice(indexOfAccount, 1);
                    resolve('Account deleted');
                };
                const onError = (ev) => {
                    requestTransaction.removeEventListener(CONS.EVENTS.ERR, onError, false);
                    requestDelete.removeEventListener(CONS.EVENTS.ERR, onError, false);
                    reject(ev.message);
                };
                const requestTransaction = this._dbi.transaction([CONS.DB.STORES.ACCOUNT], 'readwrite');
                requestTransaction.addEventListener(CONS.EVENTS.ERR, onError, false);
                const requestDelete = requestTransaction.objectStore(CONS.DB.STORES.ACCOUNT).delete(ident);
                requestDelete.addEventListener(CONS.EVENTS.ERR, onError, false);
                requestDelete.addEventListener(CONS.EVENTS.SUC, onSuccess, false);
            });
        },
        async addBookingType(record) {
            return new Promise((resolve, reject) => {
                const onSuccess = (ev) => {
                    if (ev.target instanceof IDBRequest) {
                        const memRecord = {
                            ...record,
                            cID: ev.target.result
                        };
                        this._booking_type.all.push(memRecord);
                        resolve(CONS.RESULTS.SUCCESS);
                    }
                    else {
                        reject(CONS.RESULTS.ERROR);
                    }
                };
                const onError = (ev) => {
                    reject(ev);
                };
                const requestTransaction = this._dbi.transaction([CONS.DB.STORES.BOOKING_TYPE], 'readwrite');
                requestTransaction.addEventListener(CONS.EVENTS.ERR, onError, CONS.SYSTEM.ONCE);
                const requestAdd = requestTransaction.objectStore(CONS.DB.STORES.BOOKING_TYPE).add(record);
                requestAdd.addEventListener(CONS.EVENTS.SUC, onSuccess, CONS.SYSTEM.ONCE);
            });
        },
        async updateBookingType(data, msg = false) {
            console.info('RECORDS: updateBookingType', data);
            return new Promise((resolve, reject) => {
                const onSuccess = () => {
                    requestUpdate.removeEventListener(CONS.EVENTS.SUC, onSuccess, false);
                    if (msg) {
                        notice(['sm_msg_updaterecord']);
                    }
                    resolve('Account type updated');
                };
                const onError = (ev) => {
                    requestTransaction.removeEventListener(CONS.EVENTS.ERR, onError, false);
                    requestUpdate.removeEventListener(CONS.EVENTS.ERR, onError, false);
                    notice([ev.message]);
                    reject(ev.message);
                };
                const requestTransaction = this._dbi.transaction([CONS.DB.STORES.BOOKING_TYPE], 'readwrite');
                requestTransaction.addEventListener(CONS.EVENTS.ERR, onError, false);
                const requestUpdate = requestTransaction.objectStore(CONS.DB.STORES.BOOKING_TYPE).put({ ...data });
                requestUpdate.addEventListener(CONS.EVENTS.SUC, onSuccess, false);
                requestUpdate.addEventListener(CONS.EVENTS.ERR, onError, false);
            });
        },
        async deleteBookingType(ident) {
            const indexOfAccountType = this._account.all.findIndex((accountType) => {
                return accountType.cID === ident;
            });
            return new Promise((resolve, reject) => {
                const onSuccess = () => {
                    requestTransaction.removeEventListener(CONS.EVENTS.SUC, onSuccess, false);
                    this._account.all.splice(indexOfAccountType, 1);
                    resolve('Account type deleted');
                };
                const onError = (ev) => {
                    requestTransaction.removeEventListener(CONS.EVENTS.ERR, onError, false);
                    requestDelete.removeEventListener(CONS.EVENTS.ERR, onError, false);
                    reject(ev.message);
                };
                const requestTransaction = this._dbi.transaction([CONS.DB.STORES.BOOKING_TYPE], 'readwrite');
                requestTransaction.addEventListener(CONS.EVENTS.ERR, onError, false);
                const requestDelete = requestTransaction.objectStore(CONS.DB.STORES.BOOKING_TYPE).delete(ident);
                requestDelete.addEventListener(CONS.EVENTS.ERR, onError, false);
                requestDelete.addEventListener(CONS.EVENTS.SUC, onSuccess, false);
            });
        },
        async booking(record) {
            return new Promise((resolve, reject) => {
                const onSuccess = (ev) => {
                    requestAdd.removeEventListener(CONS.EVENTS.SUC, onSuccess, false);
                    const memRecord = {
                        ...dbRecord,
                        cID: ev.target.result
                    };
                    this._booking.all_per_account.push(memRecord);
                    resolve('RECORDS: booking: booking added');
                };
                const onError = (ev) => {
                    requestTransaction.removeEventListener(CONS.EVENTS.ERR, onError, false);
                    requestAdd.removeEventListener(CONS.EVENTS.ERR, onError, false);
                    reject(ev.message);
                };
                const rawRecordClone = { ...toRaw(record) };
                const dbRecord = {
                    cDate: rawRecordClone.cDate + offset(),
                    cDebit: rawRecordClone.cDebit,
                    cCredit: rawRecordClone.cCredit,
                    cDescription: rawRecordClone.cDescription,
                    cAccountID: rawRecordClone.cAccountID,
                    cAccountTypeID: rawRecordClone.cAccountTypeID
                };
                const requestTransaction = this._dbi.transaction([CONS.DB.STORES.BOOKING], 'readwrite');
                requestTransaction.addEventListener(CONS.EVENTS.ERR, onError, false);
                const requestAdd = requestTransaction.objectStore(CONS.DB.STORES.BOOKING).add(dbRecord);
                requestAdd.addEventListener(CONS.EVENTS.ERR, onError, false);
                requestAdd.addEventListener(CONS.EVENTS.SUC, onSuccess, false);
            });
        },
        async updateBooking(data, msg = false) {
            console.info('RECORDS: updateBooking', data);
            return new Promise((resolve, reject) => {
                const onSuccess = () => {
                    requestUpdate.removeEventListener(CONS.EVENTS.SUC, onSuccess, false);
                    if (msg) {
                        notice(['sm_msg_updaterecord']);
                    }
                    resolve('Booking updated');
                };
                const onError = (ev) => {
                    requestTransaction.removeEventListener(CONS.EVENTS.ERR, onError, false);
                    requestUpdate.removeEventListener(CONS.EVENTS.ERR, onError, false);
                    notice([ev.message]);
                    reject(ev.message);
                };
                const requestTransaction = this._dbi.transaction([CONS.DB.STORES.BOOKING], 'readwrite');
                requestTransaction.addEventListener(CONS.EVENTS.ERR, onError, false);
                const requestUpdate = requestTransaction.objectStore(CONS.DB.STORES.BOOKING).put({ ...data });
                requestUpdate.addEventListener(CONS.EVENTS.SUC, onSuccess, false);
                requestUpdate.addEventListener(CONS.EVENTS.ERR, onError, false);
            });
        },
        async deleteBooking(ident) {
            const indexOfBooking = this._account.all.findIndex((booking) => {
                return booking.cID === ident;
            });
            return new Promise((resolve, reject) => {
                const onSuccess = () => {
                    requestTransaction.removeEventListener(CONS.EVENTS.SUC, onSuccess, false);
                    this._booking.all_per_account.splice(indexOfBooking, 1);
                    resolve('Booking deleted');
                };
                const onError = (ev) => {
                    requestTransaction.removeEventListener(CONS.EVENTS.ERR, onError, false);
                    requestDelete.removeEventListener(CONS.EVENTS.ERR, onError, false);
                    reject(ev.message);
                };
                const requestTransaction = this._dbi.transaction([CONS.DB.STORES.BOOKING], 'readwrite');
                requestTransaction.addEventListener(CONS.EVENTS.ERR, onError, false);
                const requestDelete = requestTransaction.objectStore(CONS.DB.STORES.BOOKING).delete(ident);
                requestDelete.addEventListener(CONS.EVENTS.ERR, onError, false);
                requestDelete.addEventListener(CONS.EVENTS.SUC, onSuccess, false);
            });
        }
    }
});
console.log('--- records.js ---');

import { defineStore } from 'pinia';
import { useApp } from '@/pages/background';
import { useSettingsStore } from '@/stores/settings';
const { CONS } = useApp();
export const useRecordsStore = defineStore('records', {
    state: () => {
        return {
            _dbi: null,
            _accounts: {
                all: [],
                selected_index: -1
            },
            _bookings: {
                all: [],
                per_account: [],
                search: '',
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
            },
            _booking_sum: 0,
            _booking_sum_field: ''
        };
    },
    getters: {
        accounts(state) {
            return state._accounts;
        },
        bookingTypes(state) {
            return state._booking_types;
        },
        bookings(state) {
            return state._bookings;
        },
        bookingsPerAccount(state) {
            return state._bookings.per_account;
        },
        bookingsSearch(state) {
            return state._bookings.search;
        },
        bookingSum(state) {
            return state._booking_sum;
        },
        bookingSumField(state) {
            return state._booking_sum_field;
        },
        dbi(state) {
            return state._dbi;
        }
    },
    actions: {
        getAccountIndexById(ident) {
            return this._accounts.all.findIndex((account) => {
                return account.cID === ident;
            });
        },
        getBookingTypeNameById(ident) {
            const tmp = this._booking_types.all.filter((entry) => {
                return entry.cID === ident;
            });
            if (tmp.length > 0) {
                return tmp[0].cName;
            }
            else {
                return '';
            }
        },
        getBookingTextById(ident) {
            const tmp = this._bookings.all.filter((entry) => {
                return entry.cID === ident;
            });
            return `${tmp[0].cDate} : ${tmp[0].cDebit} : ${tmp[0].cCredit}`;
        },
        setBookingsPerAccount() {
            const settings = useSettingsStore();
            const activeAccountIndex = this.getAccountIndexById(settings.activeAccountId);
            if (activeAccountIndex === -1) {
                return;
            }
            const bookings_per_account = this._bookings.all.filter((rec) => {
                return rec.cAccountNumber === this._accounts.all[activeAccountIndex].cNumber;
            });
            bookings_per_account.sort((a, b) => {
                const A = new Date(a.cDate).getTime();
                const B = new Date(b.cDate).getTime();
                return A - B;
            });
            this._bookings.per_account = bookings_per_account;
        },
        setBookingsSum() {
            if (this._bookings.all.length > 0) {
                this._booking_sum = this._bookings.all.map((entry) => {
                    return entry.cCredit - entry.cDebit;
                }).reduce((acc, cur) => acc + cur, 0);
            }
        },
        setBookingSumField(value) {
            this._booking_sum_field = value;
        },
        cleanStoreAndDatabase() {
            console.log('RECORDS: cleanStoreAndDatabase');
            this._bookings.all.splice(0, this._bookings.all.length);
            this._booking_types.all.splice(0, this._booking_types.all.length);
            this._accounts.all.splice(0, this._accounts.all.length);
            this._bookings.selected_index = 0;
            this._booking_types.selected_index = 0;
            this._booking_types.selected_index = 0;
            return new Promise(async (resolve, reject) => {
                if (this._dbi != null) {
                    const onError = (ev) => {
                        reject(ev);
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
                        requestClearBookingTypes.removeEventListener(CONS.EVENTS.SUC, onSuccessClearAccountType, false);
                        console.info('RECORDS: booking types dropped');
                    };
                    const requestTransaction = this._dbi.transaction([CONS.DB.STORES.BOOKINGS.NAME, CONS.DB.STORES.ACCOUNTS.NAME, CONS.DB.STORES.BOOKING_TYPES.NAME], 'readwrite');
                    requestTransaction.addEventListener(CONS.EVENTS.COMP, onComplete, CONS.SYSTEM.ONCE);
                    requestTransaction.addEventListener(CONS.EVENTS.ERR, onError, CONS.SYSTEM.ONCE);
                    const requestClearBooking = requestTransaction.objectStore(CONS.DB.STORES.BOOKINGS.NAME).clear();
                    requestClearBooking.addEventListener(CONS.EVENTS.SUC, onSuccessClearBooking, false);
                    const requestClearAccount = requestTransaction.objectStore(CONS.DB.STORES.ACCOUNTS.NAME).clear();
                    requestClearAccount.addEventListener(CONS.EVENTS.SUC, onSuccessClearAccount, false);
                    const requestClearBookingTypes = requestTransaction.objectStore(CONS.DB.STORES.BOOKING_TYPES.NAME).clear();
                    requestClearBookingTypes.addEventListener(CONS.EVENTS.SUC, onSuccessClearAccountType, false);
                }
            });
        },
        openDatabase() {
            return new Promise(async (resolve, reject) => {
                const onError = (ev) => {
                    reject(ev);
                };
                const onSuccess = (ev) => {
                    if (ev.target instanceof IDBOpenDBRequest) {
                        this._dbi = ev.target.result;
                        resolve('RECORDS: database opened successfully!');
                    }
                };
                const openDBRequest = indexedDB.open(CONS.DB.NAME, CONS.DB.VERSION);
                openDBRequest.addEventListener(CONS.EVENTS.SUC, onSuccess, CONS.SYSTEM.ONCE);
                openDBRequest.addEventListener(CONS.EVENTS.ERR, onError, CONS.SYSTEM.ONCE);
            });
        },
        databaseIntoStore() {
            console.log('RECORDS: databaseIntoStore');
            this._accounts.all.splice(0, this._accounts.all.length);
            this._booking_types.all.splice(0, this._booking_types.all.length);
            this._bookings.all.splice(0, this._bookings.all.length);
            this._bookings.selected_index = 0;
            this._booking_types.selected_index = 0;
            this._accounts.selected_index = 0;
            return new Promise(async (resolve, reject) => {
                if (this._dbi != null) {
                    const onComplete = async () => {
                        console.info('RECORDS: databaseIntoStore: all database records loaded into memory!');
                        resolve('RECORDS: databaseIntoStore: all database records loaded into memory!');
                    };
                    const onAbort = () => {
                        reject(requestTransaction.error);
                    };
                    const requestTransaction = this._dbi.transaction([CONS.DB.STORES.BOOKINGS.NAME, CONS.DB.STORES.ACCOUNTS.NAME, CONS.DB.STORES.BOOKING_TYPES.NAME], 'readonly');
                    requestTransaction.addEventListener(CONS.EVENTS.COMP, onComplete, CONS.SYSTEM.ONCE);
                    requestTransaction.addEventListener(CONS.EVENTS.ABORT, onAbort, CONS.SYSTEM.ONCE);
                    const onSuccessAccountOpenCursor = (ev) => {
                        if (ev.target instanceof IDBRequest && ev.target.result instanceof IDBCursorWithValue) {
                            this._accounts.all.push(ev.target.result.value);
                            ev.target.result.continue();
                        }
                    };
                    const onSuccessAccountTypeOpenCursor = (ev) => {
                        if (ev.target instanceof IDBRequest && ev.target.result instanceof IDBCursorWithValue) {
                            this._booking_types.all.push(ev.target.result.value);
                            ev.target.result.continue();
                        }
                    };
                    const onSuccessBookingOpenCursor = (ev) => {
                        if (ev.target instanceof IDBRequest && ev.target.result instanceof IDBCursorWithValue) {
                            this._bookings.all.push(ev.target.result.value);
                            ev.target.result.continue();
                        }
                    };
                    const requestAccountOpenCursor = requestTransaction.objectStore(CONS.DB.STORES.ACCOUNTS.NAME).openCursor();
                    requestAccountOpenCursor.addEventListener(CONS.EVENTS.SUC, onSuccessAccountOpenCursor, false);
                    const requestAccountTypeOpenCursor = requestTransaction.objectStore(CONS.DB.STORES.BOOKING_TYPES.NAME).openCursor();
                    requestAccountTypeOpenCursor.addEventListener(CONS.EVENTS.SUC, onSuccessAccountTypeOpenCursor, false);
                    const requestBookingOpenCursor = requestTransaction.objectStore(CONS.DB.STORES.BOOKINGS.NAME).openCursor();
                    requestBookingOpenCursor.addEventListener(CONS.EVENTS.SUC, onSuccessBookingOpenCursor, false);
                }
            });
        },
        storeIntoDatabase() {
            console.log('RECORDS: storeIntoDatabase');
            return new Promise(async (resolve, reject) => {
                if (this._dbi != null) {
                    const onComplete = () => {
                        resolve('RECORDS: storeIntoDatabase: all memory records are added to the database!');
                    };
                    const onAbort = () => {
                        reject(requestTransaction.error);
                    };
                    const onError = (ev) => {
                        reject(ev);
                    };
                    const requestTransaction = this._dbi.transaction([CONS.DB.STORES.ACCOUNTS.NAME, CONS.DB.STORES.BOOKING_TYPES.NAME, CONS.DB.STORES.BOOKINGS.NAME], 'readwrite');
                    requestTransaction.addEventListener(CONS.EVENTS.COMP, onComplete, CONS.SYSTEM.ONCE);
                    requestTransaction.addEventListener(CONS.EVENTS.ABORT, onError, CONS.SYSTEM.ONCE);
                    requestTransaction.addEventListener(CONS.EVENTS.ABORT, onAbort, CONS.SYSTEM.ONCE);
                    for (let i = 0; i < this._accounts.all.length; i++) {
                        requestTransaction.objectStore(CONS.DB.STORES.ACCOUNTS.NAME).add({ ...this._accounts.all[i] });
                    }
                    for (let i = 0; i < this._booking_types.all.length; i++) {
                        requestTransaction.objectStore(CONS.DB.STORES.BOOKING_TYPES.NAME).add({ ...this._booking_types.all[i] });
                    }
                    for (let i = 0; i < this._bookings.all.length; i++) {
                        requestTransaction.objectStore(CONS.DB.STORES.BOOKINGS.NAME).add({ ...this._bookings.all[i] });
                    }
                }
            });
        },
        addAccount(record) {
            return new Promise(async (resolve, reject) => {
                const settings = useSettingsStore();
                if (this._dbi != null) {
                    const onSuccess = async (ev) => {
                        if (ev.target instanceof IDBRequest) {
                            const memRecord = {
                                ...record,
                                cID: ev.target.result
                            };
                            this._accounts.all.push(memRecord);
                            settings.setActiveAccountId(ev.target.result);
                            await browser.storage.local.set({ sActiveAccountId: ev.target.result });
                            resolve(ev.target.result);
                        }
                        else {
                            reject(CONS.RESULTS.ERROR);
                        }
                    };
                    const onError = (ev) => {
                        reject(ev);
                    };
                    const requestTransaction = this._dbi.transaction([CONS.DB.STORES.ACCOUNTS.NAME], 'readwrite');
                    requestTransaction.addEventListener(CONS.EVENTS.ERR, onError, CONS.SYSTEM.ONCE);
                    const requestAdd = requestTransaction.objectStore(CONS.DB.STORES.ACCOUNTS.NAME).add(record);
                    requestAdd.addEventListener(CONS.EVENTS.SUC, onSuccess, CONS.SYSTEM.ONCE);
                }
            });
        },
        updateAccount(data, msg = false) {
            console.info('RECORDS: updateAccount', data);
            return new Promise(async (resolve, reject) => {
                if (this._dbi != null) {
                    const onSuccess = () => {
                        requestUpdate.removeEventListener(CONS.EVENTS.SUC, onSuccess, false);
                        if (msg) {
                        }
                        resolve('Account updated');
                    };
                    const onError = (ev) => {
                        requestTransaction.removeEventListener(CONS.EVENTS.ERR, onError, false);
                        requestUpdate.removeEventListener(CONS.EVENTS.ERR, onError, false);
                        reject(ev);
                    };
                    const requestTransaction = this._dbi.transaction([CONS.DB.STORES.ACCOUNTS.NAME], 'readwrite');
                    requestTransaction.addEventListener(CONS.EVENTS.ERR, onError, false);
                    const requestUpdate = requestTransaction.objectStore(CONS.DB.STORES.ACCOUNTS.NAME).put({ ...data });
                    requestUpdate.addEventListener(CONS.EVENTS.SUC, onSuccess, false);
                    requestUpdate.addEventListener(CONS.EVENTS.ERR, onError, false);
                }
            });
        },
        deleteAccount(ident) {
            const indexOfAccount = this._accounts.all.findIndex((account) => {
                return account.cID === ident;
            });
            return new Promise(async (resolve, reject) => {
                if (this._dbi != null) {
                    const onSuccess = () => {
                        this._accounts.all.splice(indexOfAccount, 1);
                        resolve('Account deleted');
                    };
                    const onError = (ev) => {
                        reject(ev);
                    };
                    const requestTransaction = this._dbi.transaction([CONS.DB.STORES.ACCOUNTS.NAME], 'readwrite');
                    requestTransaction.addEventListener(CONS.EVENTS.ERR, onError, CONS.SYSTEM.ONCE);
                    const requestDelete = requestTransaction.objectStore(CONS.DB.STORES.ACCOUNTS.NAME).delete(ident);
                    requestDelete.addEventListener(CONS.EVENTS.ERR, onError, CONS.SYSTEM.ONCE);
                    requestDelete.addEventListener(CONS.EVENTS.SUC, onSuccess, CONS.SYSTEM.ONCE);
                }
            });
        },
        addBookingType(record) {
            return new Promise(async (resolve, reject) => {
                if (this._dbi != null) {
                    const onSuccess = (ev) => {
                        if (ev.target instanceof IDBRequest) {
                            const memRecord = {
                                ...record,
                                cID: ev.target.result
                            };
                            this._booking_types.all.push(memRecord);
                            resolve(CONS.RESULTS.SUCCESS);
                        }
                        else {
                            reject(CONS.RESULTS.ERROR);
                        }
                    };
                    const onError = (ev) => {
                        reject(ev);
                    };
                    const requestTransaction = this._dbi.transaction([CONS.DB.STORES.BOOKING_TYPES.NAME], 'readwrite');
                    requestTransaction.addEventListener(CONS.EVENTS.ERR, onError, CONS.SYSTEM.ONCE);
                    const requestAdd = requestTransaction.objectStore(CONS.DB.STORES.BOOKING_TYPES.NAME).add(record);
                    requestAdd.addEventListener(CONS.EVENTS.SUC, onSuccess, CONS.SYSTEM.ONCE);
                }
            });
        },
        updateBookingType(data, msg = false) {
            console.info('RECORDS: updateBookingType', data);
            return new Promise(async (resolve, reject) => {
                if (this._dbi != null) {
                    const onSuccess = () => {
                        if (msg) {
                        }
                        resolve('Account type updated');
                    };
                    const onError = (ev) => {
                        reject(ev);
                    };
                    const requestTransaction = this._dbi.transaction([CONS.DB.STORES.BOOKING_TYPES.NAME], 'readwrite');
                    requestTransaction.addEventListener(CONS.EVENTS.ERR, onError, CONS.SYSTEM.ONCE);
                    const requestUpdate = requestTransaction.objectStore(CONS.DB.STORES.BOOKING_TYPES.NAME).put({ ...data });
                    requestUpdate.addEventListener(CONS.EVENTS.SUC, onSuccess, CONS.SYSTEM.ONCE);
                    requestUpdate.addEventListener(CONS.EVENTS.ERR, onError, CONS.SYSTEM.ONCE);
                }
            });
        },
        deleteBookingType(ident) {
            const indexOfBookingType = this._booking_types.all.findIndex((bookingType) => {
                return bookingType.cID === ident;
            });
            return new Promise(async (resolve, reject) => {
                if (this._dbi != null) {
                    const onSuccess = () => {
                        this._booking_types.all.splice(indexOfBookingType, 1);
                        resolve('Booking type deleted');
                    };
                    const onError = (ev) => {
                        reject(ev);
                    };
                    const requestTransaction = this._dbi.transaction([CONS.DB.STORES.BOOKING_TYPES.NAME], 'readwrite');
                    requestTransaction.addEventListener(CONS.EVENTS.ERR, onError, CONS.SYSTEM.ONCE);
                    const requestDelete = requestTransaction.objectStore(CONS.DB.STORES.BOOKING_TYPES.NAME).delete(ident);
                    requestDelete.addEventListener(CONS.EVENTS.ERR, onError, CONS.SYSTEM.ONCE);
                    requestDelete.addEventListener(CONS.EVENTS.SUC, onSuccess, CONS.SYSTEM.ONCE);
                }
            });
        },
        addBooking(record) {
            return new Promise(async (resolve, reject) => {
                if (this._dbi != null) {
                    const onSuccess = (ev) => {
                        if (ev.target instanceof IDBRequest) {
                            const memRecord = {
                                ...record,
                                cID: ev.target.result
                            };
                            this._bookings.all.push(memRecord);
                            resolve(CONS.RESULTS.SUCCESS);
                        }
                        else {
                            reject(CONS.RESULTS.ERROR);
                        }
                    };
                    const onError = (ev) => {
                        reject(ev);
                    };
                    const requestTransaction = this._dbi.transaction([CONS.DB.STORES.BOOKINGS.NAME], 'readwrite');
                    requestTransaction.addEventListener(CONS.EVENTS.ERR, onError, CONS.SYSTEM.ONCE);
                    const requestAdd = requestTransaction.objectStore(CONS.DB.STORES.BOOKINGS.NAME).add(record);
                    requestAdd.addEventListener(CONS.EVENTS.SUC, onSuccess, CONS.SYSTEM.ONCE);
                }
            });
        },
        updateBooking(data, msg = false) {
            console.info('RECORDS: updateBooking', data);
            return new Promise(async (resolve, reject) => {
                if (this._dbi != null) {
                    const onSuccess = () => {
                        if (msg) {
                        }
                        resolve('Booking updated');
                    };
                    const onError = (ev) => {
                        reject(ev);
                    };
                    const requestTransaction = this._dbi.transaction([CONS.DB.STORES.BOOKINGS.NAME], 'readwrite');
                    requestTransaction.addEventListener(CONS.EVENTS.ERR, onError, CONS.SYSTEM.ONCE);
                    const requestUpdate = requestTransaction.objectStore(CONS.DB.STORES.BOOKINGS.NAME).put({ ...data });
                    requestUpdate.addEventListener(CONS.EVENTS.SUC, onSuccess, CONS.SYSTEM.ONCE);
                    requestUpdate.addEventListener(CONS.EVENTS.ERR, onError, CONS.SYSTEM.ONCE);
                }
            });
        },
        deleteBooking(ident) {
            const indexOfBooking = this._bookings.all.findIndex((booking) => {
                return booking.cID === ident;
            });
            return new Promise(async (resolve, reject) => {
                if (this._dbi != null) {
                    const onSuccess = () => {
                        this._bookings.all.splice(indexOfBooking, 1);
                        resolve('Booking deleted');
                    };
                    const onError = (ev) => {
                        reject(ev);
                    };
                    const requestTransaction = this._dbi.transaction([CONS.DB.STORES.BOOKINGS.NAME], 'readwrite');
                    requestTransaction.addEventListener(CONS.EVENTS.ERR, onError, CONS.SYSTEM.ONCE);
                    const requestDelete = requestTransaction.objectStore(CONS.DB.STORES.BOOKINGS.NAME).delete(ident);
                    requestDelete.addEventListener(CONS.EVENTS.ERR, onError, CONS.SYSTEM.ONCE);
                    requestDelete.addEventListener(CONS.EVENTS.SUC, onSuccess, CONS.SYSTEM.ONCE);
                }
            });
        }
    }
});
console.log('--- STORE records.js ---');

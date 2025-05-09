import { defineStore } from 'pinia';
import { useApp } from '@/pages/background';
import { useSettingsStore } from '@/stores/settings';
const { CONS, log } = useApp();
export const useRecordsStore = defineStore('records', {
    state: () => {
        return {
            _accounts: {
                all: []
            },
            _dbi: null,
            _bookings: {
                all: [],
                per_account: [],
                search: ''
            },
            _booking_sum: 0,
            _booking_sum_field: '',
            _booking_types: {
                all: [],
                per_account: []
            }
        };
    },
    getters: {
        accounts(state) {
            return state._accounts;
        },
        dbi(state) {
            return state._dbi;
        },
        bookings(state) {
            return state._bookings;
        },
        bookingSum(state) {
            return state._booking_sum;
        },
        bookingSumField(state) {
            return state._booking_sum_field;
        },
        bookingTypes(state) {
            return state._booking_types;
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
            if (tmp.length > 0) {
                return `${tmp[0].cDate} : ${tmp[0].cDebit} : ${tmp[0].cCredit}`;
            }
            else {
                throw new Error('getBookingTextById: No booking found for given ID');
            }
        },
        sumBookings() {
            const settings = useSettingsStore();
            const activeAccountIndex = this.getAccountIndexById(settings.activeAccountId);
            if (activeAccountIndex === -1) {
                throw new Error('sumBookings: No account found for given ID');
            }
            const bookings_per_account = this._bookings.all.filter((rec) => {
                return rec.cAccountNumberID === this._accounts.all[activeAccountIndex].cID;
            });
            if (bookings_per_account.length > 0) {
                bookings_per_account.sort((a, b) => {
                    const A = new Date(a.cDate).getTime();
                    const B = new Date(b.cDate).getTime();
                    return A - B;
                });
                this._bookings.per_account = bookings_per_account;
                this._booking_sum = bookings_per_account.map((entry) => {
                    return entry.cCredit - entry.cDebit;
                }).reduce((acc, cur) => acc + cur, 0);
            }
            else {
                this._bookings.per_account = [];
                this._booking_sum = 0;
            }
        },
        setBookingSumField(value) {
            this._booking_sum_field = value;
        },
        cleanStoreAndDatabase() {
            log('RECORDS: cleanStoreAndDatabase');
            this._bookings.all.splice(0, this._bookings.all.length);
            this._booking_types.all.splice(0, this._booking_types.all.length);
            this._accounts.all.splice(0, this._accounts.all.length);
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
                        log('RECORDS: bookings dropped');
                    };
                    const onSuccessClearAccount = () => {
                        requestClearAccount.removeEventListener(CONS.EVENTS.SUC, onSuccessClearAccount, false);
                        log('RECORDS: accounts dropped');
                    };
                    const onSuccessClearAccountType = () => {
                        requestClearBookingTypes.removeEventListener(CONS.EVENTS.SUC, onSuccessClearAccountType, false);
                        log('RECORDS: booking types dropped');
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
            log('RECORDS: databaseIntoStore');
            this._accounts.all.splice(0, this._accounts.all.length);
            this._booking_types.all.splice(0, this._booking_types.all.length);
            this._bookings.all.splice(0, this._bookings.all.length);
            return new Promise(async (resolve, reject) => {
                if (this._dbi != null) {
                    const onComplete = async () => {
                        log('RECORDS: databaseIntoStore: all database records loaded into memory!');
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
            log('RECORDS: storeIntoDatabase');
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
                            this._booking_types.per_account.push(memRecord);
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
        deleteBookingType(ident) {
            const indexOfBookingType = this._booking_types.all.findIndex((bookingType) => {
                return bookingType.cID === ident;
            });
            const indexOfBookingTypePerAccount = this._booking_types.per_account.findIndex((bookingType) => {
                return bookingType.cID === ident;
            });
            return new Promise(async (resolve, reject) => {
                if (this._dbi != null) {
                    const onSuccess = () => {
                        this._booking_types.all.splice(indexOfBookingType, 1);
                        this._booking_types.per_account.splice(indexOfBookingTypePerAccount, 1);
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
                            this._bookings.per_account.push(memRecord);
                            this._booking_sum = this._bookings.per_account.map((entry) => {
                                return entry.cCredit - entry.cDebit;
                            }).reduce((acc, cur) => acc + cur, 0);
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
        deleteBooking(ident) {
            const indexOfBooking = this._bookings.all.findIndex((booking) => {
                return booking.cID === ident;
            });
            return new Promise(async (resolve, reject) => {
                if (this._dbi != null) {
                    const onSuccess = () => {
                        this._bookings.all.splice(indexOfBooking, 1);
                        this.sumBookings();
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
log('--- STORE records.js ---');

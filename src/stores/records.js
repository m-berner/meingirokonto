import { defineStore } from 'pinia';
import { useApp } from '@/composables/useApp';
const { CONS, notice } = useApp();
export const useRecordsStore = defineStore('records', {
    state: () => {
        return {
            _dbi: null,
            _account: {
                all: [],
                selected_index: -1,
                active_id: -1
            },
            _booking: {
                all: [],
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
        }
    },
    actions: {
        _loadAccountIntoStore(account) {
            this._account.all.push(account);
        },
        _loadBookingTypeIntoStore(bookingType) {
            this._booking_type.all.push(bookingType);
        },
        _loadBookingIntoStore(booking) {
            this._booking.all.push(booking);
        },
        getAccountIndexById(ident) {
            return this._account.all.findIndex((account) => {
                return account.cID === ident;
            });
        },
        getBookingsPerAccount() {
            const activeAccountIndex = this.getAccountIndexById(this._account.active_id);
            if (activeAccountIndex === -1) {
                return [];
            }
            const bookings_per_account = this._booking.all.filter((rec) => {
                return rec.cAccountNumber === this._account.all[activeAccountIndex].cNumber;
            });
            bookings_per_account.sort((a, b) => {
                const A = new Date(a.cDate).getTime();
                const B = new Date(b.cDate).getTime();
                return A - B;
            });
            return bookings_per_account;
        },
        setBkupObject(value) {
            this._bkup_object = {
                sm: {
                    cVersion: 0,
                    cDBVersion: 0,
                    cEngine: ''
                },
                account: [],
                booking_type: [],
                booking: []
            };
            this._bkup_object = value;
        },
        loadBkupObjectIntoStore() {
            console.log('RECORDS: loadBkupObjectIntoStore');
            let account;
            let booking;
            let bookingType;
            for (account of this._bkup_object.account) {
                this._loadAccountIntoStore(account);
            }
            for (bookingType of this._bkup_object.booking_type) {
                this._loadBookingTypeIntoStore(bookingType);
            }
            for (booking of this._bkup_object.booking) {
                this._loadBookingIntoStore(booking);
            }
        },
        async storageIntoStore() {
            console.log('RECORDS: storageIntoStore');
            const response = await browser.storage.local.get();
            if (response.sAccountActiveId != null) {
                this._account.active_id = response.sAccountActiveId;
            }
        },
        async cleanStoreAndDatabase() {
            console.log('RECORDS: cleanStoreAndDatabase');
            this._booking.all.splice(0, this._booking.all.length);
            this._booking_type.all.splice(0, this._booking_type.all.length);
            this._account.all.splice(0, this._account.all.length);
            this._booking.selected_index = 0;
            this._booking_type.selected_index = 0;
            this._booking_type.selected_index = 0;
            return new Promise((resolve, reject) => {
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
                        requestClearAccountType.removeEventListener(CONS.EVENTS.SUC, onSuccessClearAccountType, false);
                        console.info('RECORDS: account types dropped');
                    };
                    const requestTransaction = this._dbi.transaction([CONS.DB.STORES.BOOKINGS.NAME, CONS.DB.STORES.ACCOUNTS.NAME, CONS.DB.STORES.BOOKING_TYPES.NAME], 'readwrite');
                    requestTransaction.addEventListener(CONS.EVENTS.COMP, onComplete, CONS.SYSTEM.ONCE);
                    requestTransaction.addEventListener(CONS.EVENTS.ERR, onError, CONS.SYSTEM.ONCE);
                    const requestClearBooking = requestTransaction.objectStore(CONS.DB.STORES.BOOKINGS.NAME).clear();
                    requestClearBooking.addEventListener(CONS.EVENTS.SUC, onSuccessClearBooking, false);
                    const requestClearAccount = requestTransaction.objectStore(CONS.DB.STORES.ACCOUNTS.NAME).clear();
                    requestClearAccount.addEventListener(CONS.EVENTS.SUC, onSuccessClearAccount, false);
                    const requestClearAccountType = requestTransaction.objectStore(CONS.DB.STORES.BOOKING_TYPES.NAME).clear();
                    requestClearAccountType.addEventListener(CONS.EVENTS.SUC, onSuccessClearAccountType, false);
                }
            });
        },
        async openDatabase() {
            return new Promise((resolve, reject) => {
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
        async databaseIntoStore() {
            console.info('RECORDS: databaseIntoStore');
            this._account.all.splice(0, this._account.all.length);
            this._booking_type.all.splice(0, this._booking_type.all.length);
            this._booking.all.splice(0, this._booking.all.length);
            this._booking.selected_index = 0;
            this._booking_type.selected_index = 0;
            this._account.selected_index = 0;
            return new Promise((resolve, reject) => {
                if (this._dbi != null) {
                    const onComplete = async () => {
                        console.info('RECORDS: databaseIntoStore: all database records loaded into memory!');
                        resolve('RECORDS: databaseIntoStore: all database records loaded into memory!');
                    };
                    const onAbort = () => {
                        notice(['RECORDS: databaseIntoStore: transaction aborted!']);
                        reject(requestTransaction.error);
                    };
                    const requestTransaction = this._dbi.transaction([CONS.DB.STORES.BOOKINGS.NAME, CONS.DB.STORES.ACCOUNTS.NAME, CONS.DB.STORES.BOOKING_TYPES.NAME], 'readonly');
                    requestTransaction.addEventListener(CONS.EVENTS.COMP, onComplete, CONS.SYSTEM.ONCE);
                    requestTransaction.addEventListener(CONS.EVENTS.ABORT, onAbort, CONS.SYSTEM.ONCE);
                    const onSuccessAccountOpenCursor = (ev) => {
                        if (ev.target instanceof IDBCursorWithValue) {
                            this._loadAccountIntoStore(ev.target.value);
                            ev.target.continue();
                        }
                    };
                    const onSuccessAccountTypeOpenCursor = (ev) => {
                        if (ev.target instanceof IDBCursorWithValue) {
                            this._loadBookingTypeIntoStore(ev.target.value);
                            ev.target.continue();
                        }
                    };
                    const onSuccessBookingOpenCursor = (ev) => {
                        if (ev.target instanceof IDBCursorWithValue) {
                            this._loadBookingIntoStore(ev.target.value);
                            ev.target.continue();
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
        async storeIntoDatabase() {
            console.log('RECORDS: storeIntoDatabase');
            return new Promise((resolve, reject) => {
                if (this._dbi != null) {
                    const onComplete = () => {
                        notice(['All memory records are added to the database!']);
                        resolve('RECORDS: storeIntoDatabase: all memory records are added to the database!');
                    };
                    const onAbort = () => {
                        notice(['Transaction aborted!']);
                        reject(requestTransaction.error);
                    };
                    const onError = (ev) => {
                        reject(ev);
                    };
                    const requestTransaction = this._dbi.transaction([CONS.DB.STORES.ACCOUNTS.NAME, CONS.DB.STORES.BOOKING_TYPES.NAME, CONS.DB.STORES.BOOKINGS.NAME], 'readwrite');
                    requestTransaction.addEventListener(CONS.EVENTS.COMP, onComplete, CONS.SYSTEM.ONCE);
                    requestTransaction.addEventListener(CONS.EVENTS.ABORT, onError, CONS.SYSTEM.ONCE);
                    requestTransaction.addEventListener(CONS.EVENTS.ABORT, onAbort, CONS.SYSTEM.ONCE);
                    for (let i = 0; i < this._account.all.length; i++) {
                        requestTransaction.objectStore(CONS.DB.STORES.ACCOUNTS.NAME).add({ ...this._account.all[i] });
                    }
                    for (let i = 0; i < this._booking_type.all.length; i++) {
                        requestTransaction.objectStore(CONS.DB.STORES.BOOKING_TYPES.NAME).add({ ...this._booking_type.all[i] });
                    }
                    for (let i = 0; i < this._booking.all.length; i++) {
                        requestTransaction.objectStore(CONS.DB.STORES.BOOKINGS.NAME).add({ ...this._booking.all[i] });
                    }
                }
            });
        },
        async addAccount(record) {
            return new Promise((resolve, reject) => {
                if (this._dbi != null) {
                    const onSuccess = async (ev) => {
                        if (ev.target instanceof IDBRequest) {
                            const memRecord = {
                                ...record,
                                cID: ev.target.result
                            };
                            this._account.all.push(memRecord);
                            this._account.active_id = ev.target.result;
                            await browser.storage.local.set({ sAccountActiveId: ev.target.result });
                            resolve(CONS.RESULTS.SUCCESS);
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
        async updateAccount(data, msg = false) {
            console.info('RECORDS: updateAccount', data);
            return new Promise((resolve, reject) => {
                if (this._dbi != null) {
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
        async deleteAccount(ident) {
            const indexOfAccount = this._account.all.findIndex((account) => {
                return account.cID === ident;
            });
            return new Promise((resolve, reject) => {
                if (this._dbi != null) {
                    const onSuccess = () => {
                        requestTransaction.removeEventListener(CONS.EVENTS.SUC, onSuccess, false);
                        this._account.all.splice(indexOfAccount, 1);
                        resolve('Account deleted');
                    };
                    const onError = (ev) => {
                        requestTransaction.removeEventListener(CONS.EVENTS.ERR, onError, false);
                        requestDelete.removeEventListener(CONS.EVENTS.ERR, onError, false);
                        reject(ev);
                    };
                    const requestTransaction = this._dbi.transaction([CONS.DB.STORES.ACCOUNTS.NAME], 'readwrite');
                    requestTransaction.addEventListener(CONS.EVENTS.ERR, onError, false);
                    const requestDelete = requestTransaction.objectStore(CONS.DB.STORES.ACCOUNTS.NAME).delete(ident);
                    requestDelete.addEventListener(CONS.EVENTS.ERR, onError, false);
                    requestDelete.addEventListener(CONS.EVENTS.SUC, onSuccess, false);
                }
            });
        },
        async addBookingType(record) {
            return new Promise((resolve, reject) => {
                if (this._dbi != null) {
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
                    const requestTransaction = this._dbi.transaction([CONS.DB.STORES.BOOKING_TYPES.NAME], 'readwrite');
                    requestTransaction.addEventListener(CONS.EVENTS.ERR, onError, CONS.SYSTEM.ONCE);
                    const requestAdd = requestTransaction.objectStore(CONS.DB.STORES.BOOKING_TYPES.NAME).add(record);
                    requestAdd.addEventListener(CONS.EVENTS.SUC, onSuccess, CONS.SYSTEM.ONCE);
                }
            });
        },
        async updateBookingType(data, msg = false) {
            console.info('RECORDS: updateBookingType', data);
            return new Promise((resolve, reject) => {
                if (this._dbi != null) {
                    const onSuccess = () => {
                        if (msg) {
                            notice(['sm_msg_updaterecord']);
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
        async deleteBookingType(ident) {
            const indexOfBookingType = this._booking_type.all.findIndex((bookingType) => {
                return bookingType.cID === ident;
            });
            return new Promise((resolve, reject) => {
                if (this._dbi != null) {
                    const onSuccess = () => {
                        this._booking_type.all.splice(indexOfBookingType, 1);
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
        async addBooking(record) {
            return new Promise((resolve, reject) => {
                if (this._dbi != null) {
                    const onSuccess = (ev) => {
                        if (ev.target instanceof IDBRequest) {
                            const memRecord = {
                                ...record,
                                cID: ev.target.result
                            };
                            this._booking.all.push(memRecord);
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
        async updateBooking(data, msg = false) {
            console.info('RECORDS: updateBooking', data);
            return new Promise((resolve, reject) => {
                if (this._dbi != null) {
                    const onSuccess = () => {
                        if (msg) {
                            notice(['sm_msg_updaterecord']);
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
        async deleteBooking(ident) {
            const indexOfBooking = this._booking.all.findIndex((booking) => {
                return booking.cID === ident;
            });
            return new Promise((resolve, reject) => {
                if (this._dbi != null) {
                    const onSuccess = () => {
                        this._booking.all.splice(indexOfBooking, 1);
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
console.log('--- records.js ---');

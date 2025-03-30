import { type StoreDefinition } from 'pinia';
interface IRecordsStore {
    _dbi: IDBDatabase | null;
    _account: IRecordStoreAccount;
    _booking: IRecordStoreBooking;
    _booking_type: IRecordStoreBookingType;
    _bkup_object: IBackup;
}
interface IRecordStoreBooking {
    all: IBooking[];
    dividend_transfers_per_stock: Map<number, ITransfer[]>;
    total_controller: ITotalController;
    selected_index: number;
}
interface IRecordStoreAccount {
    all: IAccount[];
    selected_index: number;
    active_id: number;
}
interface IRecordStoreBookingType {
    all: IBookingType[];
    selected_index: number;
}
export declare const useRecordsStore: StoreDefinition<'records', IRecordsStore>;
export {};

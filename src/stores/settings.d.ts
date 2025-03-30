import { type StoreDefinition } from 'pinia';
interface ISettingsStore {
    _skin: string;
    _accountIndex: number;
    _items_per_page_transfers: number;
    _items_per_page_stocks: number;
}
export declare const useSettingsStore: StoreDefinition<'settings', ISettingsStore>;
export {};

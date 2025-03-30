import { type StoreDefinition } from 'pinia';
import { type Ref } from 'vue';
interface IRuntimeStore {
    _is_stocks_loading: boolean;
    _show_partial_drawer: boolean;
    _table: string;
    _page_title: string;
    _exchanges: Record<string, number | boolean>;
    _dialogs: Record<string, string | boolean | undefined | Ref>;
}
export declare const useRuntimeStore: StoreDefinition<'runtime', IRuntimeStore>;
export {};

import { defineStore } from 'pinia';
export const useHomeContentStore = defineStore('homecontent', {
    state: () => {
        return {
            _search: '',
            _steady: {
                bookingsHeaders: [],
                searchLabel: '',
                noDataText: '',
                itemsPerPageText: '',
                dotMenuItems: []
            }
        };
    },
    getters: {
        steady(state) {
            return state._steady;
        }
    },
    actions: {
        setSteady(value) {
            this._steady.bookingsHeaders = value.bookingsHeaders;
            this._steady.searchLabel = value.searchLabel;
            this._steady.noDataText = value.noDataText;
            this._steady.itemsPerPageText = value.itemsPerPageText;
            this._steady.dotMenuItems = value.dotMenuItems;
        }
    }
});
console.log('--- STORE homecontent.js ---');

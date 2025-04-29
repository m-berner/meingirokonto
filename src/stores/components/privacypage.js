import { defineStore } from 'pinia';
export const usePrivacyPageStore = defineStore('privacypage', {
    state: () => {
        return {
            _public: {
                title: '',
                content: ''
            },
            _connections: {
                title: '',
                content: '',
                data_list: []
            }
        };
    },
    getters: {
        publicTitle(state) {
            return state._public.title;
        },
        publicContent(state) {
            return state._public.content;
        },
        connectionsTitle(state) {
            return state._connections.title;
        },
        connectionsContent(state) {
            return state._connections.content;
        },
        connectionsDataList(state) {
            return state._connections.data_list;
        }
    },
    actions: {
        setStore(value) {
            this._public.title = value._public.title;
            this._public.content = value._public.content;
            this._connections.title = value._connections.title;
            this._connections.content = value._connections.content;
            this._connections.data_list = value._connections.data_list;
        }
    }
});
console.log('--- STORE privacypage.js ---');

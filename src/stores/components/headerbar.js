import { defineStore } from 'pinia';
export const useHeaderBarStore = defineStore('headerbar', {
    state: () => {
        return {
            _steady: {
                local: {
                    title: '',
                    content: ''
                },
                public: {
                    title: '',
                    content: ''
                },
                connections: {
                    title: '',
                    content: ''
                }
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
            this._steady.local.title = value.local.title;
            this._steady.local.content = value.local.content;
            this._steady.public.title = value.public.title;
            this._steady.public.content = value.public.content;
            this._steady.connections.title = value.connections.title;
            this._steady.connections.content = value.connections.content;
        }
    }
});
console.log('--- STORE headerbar.js ---');

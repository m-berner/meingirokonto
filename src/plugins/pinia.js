import { createPinia } from 'pinia';
import { useApp } from '@/pages/background';
const { log } = useApp();
export default {
    pinia: createPinia()
};
log('--- PLUGINS pinia.js ---');

import { createPinia } from 'pinia';
import { useAppApi } from '@/pages/background';
const { log } = useAppApi();
export default {
    pinia: createPinia()
};
log('--- PLUGINS pinia.js ---');

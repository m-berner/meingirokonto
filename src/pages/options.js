import OptionsIndex from '@/pages/OptionsIndex.vue';
import { createApp } from 'vue';
import 'vuetify/styles';
import { useApp } from '@/composables/useApp';
const { vuetify, i18n } = useApp();
const op = createApp(OptionsIndex);
op.config.errorHandler = (err) => {
    console.error(err);
};
op.config.warnHandler = (msg) => {
    console.warn(msg);
};
op.use(vuetify);
op.use(i18n);
op.mount('#options');
console.log('--- options.js ---');

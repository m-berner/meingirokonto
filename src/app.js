import { createPinia } from 'pinia';
import { createRouter, createWebHashHistory } from 'vue-router';
import { createApp } from 'vue';
import 'vuetify/styles';
import { useApp } from '@/composables/useApp';
import HomePage from '@/components/HomePage.vue';
import AppIndex from '@/AppIndex.vue';
import HelpPage from '@/components/HelpPage.vue';
import PrivacyPage from '@/components/PrivacyPage.vue';
import TitleBar from '@/components/TitleBar.vue';
import HeaderBar from '@/components/HeaderBar.vue';
import FooterBar from '@/components/FooterBar.vue';
import AddAccount from '@/components/dialogs/AddAccount.vue';
import AddBookingType from '@/components/dialogs/AddBookingType.vue';
import AddBooking from '@/components/dialogs/AddBooking.vue';
import ingd from '@/components/logos/ingd.vue';
import byla from '@/components/logos/byla.vue';
import nologo from '@/components/logos/nologo.vue';
const { vuetify, i18n } = useApp();
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            components: {
                default: HomePage,
                title: TitleBar,
                header: HeaderBar,
                footer: FooterBar
            }
        },
        {
            path: '/help',
            name: 'help',
            components: {
                default: HelpPage,
                title: TitleBar,
                header: HeaderBar,
                footer: FooterBar
            }
        },
        {
            path: '/privacy',
            name: 'privacy',
            components: {
                default: PrivacyPage,
                title: TitleBar,
                header: HeaderBar,
                footer: FooterBar
            }
        }
    ]
});
const pinia = createPinia();
const app = createApp(AppIndex);
app.config.errorHandler = (err) => {
    console.error(err);
};
app.config.warnHandler = (msg) => {
    console.warn(msg);
};
export const COMPONENT_NAMES = Object.freeze({
    ADD_ACCOUNT: 'AddAccount',
    ADD_BOOKING: 'AddBooking',
    ADD_BOOKING_TYPE: 'AddBookingType',
    NO_LOGO: 'Nologo',
    INGD: 'ingd',
    BYLA: 'byla'
});
app.component(COMPONENT_NAMES.ADD_ACCOUNT, AddAccount);
app.component(COMPONENT_NAMES.ADD_BOOKING_TYPE, AddBookingType);
app.component(COMPONENT_NAMES.ADD_BOOKING, AddBooking);
app.component(COMPONENT_NAMES.NO_LOGO, nologo);
app.component(COMPONENT_NAMES.INGD, ingd);
app.component(COMPONENT_NAMES.BYLA, byla);
app.use(router);
app.use(vuetify);
app.use(i18n);
app.use(pinia);
app.mount('#app');
console.log('--- app.js ---');

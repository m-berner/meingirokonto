import { createRouter, createWebHashHistory } from 'vue-router';
import HomePage from '@/components/HomePage.vue';
import TitleBar from '@/components/TitleBar.vue';
import HeaderBar from '@/components/HeaderBar.vue';
import FooterBar from '@/components/FooterBar.vue';
import HelpPage from '@/components/HelpPage.vue';
import PrivacyPage from '@/components/PrivacyPage.vue';
export default {
    router: createRouter({
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
    })
};
console.log('--- PLUGINS router.js ---');

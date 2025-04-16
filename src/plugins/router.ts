/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * you could obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2014-2025, Martin Berner, meingirokonto@gmx.de. All rights reserved.
 */
import {createRouter, createWebHashHistory, type Router} from 'vue-router'
import HomePage from '@/components/HomePage.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeaderBar from '@/components/HeaderBar.vue'
import FooterBar from '@/components/FooterBar.vue'
import HelpPage from '@/components/HelpPage.vue'
import PrivacyPage from '@/components/PrivacyPage.vue'

interface IRouter {
  router: Router
}

export default<IRouter> {
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
}

console.log('--- PLUGINS router.js ---')

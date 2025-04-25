/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * you could obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2014-2025, Martin Berner, meingirokonto@gmx.de. All rights reserved.
 */
import {createRouter, createWebHashHistory, type Router} from 'vue-router'

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
          default: () => import('@/components/HomePage.vue'),
          title: () => import('@/components/TitleBar.vue'),
          header: () => import ('@/components/HeaderBar.vue'),
          footer: () => import('@/components/FooterBar.vue')
        }
      },
      {
        path: '/help',
        name: 'help',
        components: {
          default: () => import('@/components/HelpPage.vue'),
          title: () => import('@/components/TitleBar.vue'),
          header: () => import ('@/components/HeaderBar.vue'),
          footer: () => import('@/components/FooterBar.vue')
        }
      },
      {
        path: '/privacy',
        name: 'privacy',
        components: {
          default: () => import('@/components/PrivacyPage.vue'),
          title: () => import('@/components/TitleBar.vue'),
          header: () => import ('@/components/HeaderBar.vue'),
          footer: () => import('@/components/FooterBar.vue')
        }
      }
    ]
  })
}

console.log('--- PLUGINS router.js ---')

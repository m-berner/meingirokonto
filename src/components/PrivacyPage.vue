<!--
  - This Source Code Form is subject to the terms of the Mozilla Public
  - License, v. 2.0. If a copy of the MPL was not distributed with this file,
  - you could obtain one at https://mozilla.org/MPL/2.0/.
  -
  - Copyright (c) 2014-2025, Martin Berner, meingirokonto@gmx.de. All rights reserved.
  -->
<script lang="ts" setup>
import {useI18n} from 'vue-i18n'
import {usePrivacyPageStore} from '@/stores/components/privacypage'
import {onMounted} from 'vue'

const {rt, t, tm} = useI18n()
const privacypage = usePrivacyPageStore()

onMounted(() => {
  console.log('PRIVACYPAGE: onMounted')
  privacypage.setStore({
    _public: {
      title: t('privacyContent.public.title'),
      content: t('privacyContent.public.content')    },
    _connections: {
      title: t('privacyContent.connections.title'),
      content: t('privacyContent.connections.content'),
      data_list: tm('privacyContent.connections.dataList')
    }
  })
})

console.log('--- PrivacyPage.vue setup ---')
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="7" sm="7">
        <v-card>
          <v-card-title>
            {{ privacypage.publicTitle }}
          </v-card-title>
          <v-card-text>
            {{ privacypage.publicContent }}
          </v-card-text>
        </v-card>
        <v-card>
          <v-card-title>
            {{ privacypage.connectionsTitle }}
          </v-card-title>
          <v-card-text>
            {{ privacypage.connectionsContent }}
            <v-list density="compact">
              <v-list-item
                v-for="item in privacypage.connectionsDataList"
                v-bind:key="rt(item.id)"
                v-bind:title="rt(item.name)">
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

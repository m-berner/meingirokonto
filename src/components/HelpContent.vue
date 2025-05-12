<!--
  - This Source Code Form is subject to the terms of the Mozilla Public
  - License, v. 2.0. If a copy of the MPL was not distributed with this file,
  - you could obtain one at https://mozilla.org/MPL/2.0/.
  -
  - Copyright (c) 2014-2025, Martin Berner, kontenmanager@gmx.de. All rights reserved.
  -->
<script lang="ts" setup>
import {useI18n} from 'vue-i18n'
import {useHelpPageStore} from '@/components/helpcontent'
import {useApp} from '@/pages/background'

const {rt, t, tm} = useI18n()
const {log} = useApp()

const helppage = useHelpPageStore()
helppage.setSteady({
  titleBarTitle: t('helpContent.requestsTitle'),
  titleBar: tm('helpContent.requests'),
  toolBarTitle: t('helpContent.toolBarTitle'),
  toolBar: tm('helpContent.toolBar'),
  dotMenuTitle: t('helpContent.companyBarTitle'),
  dotMenu: tm('helpContent.companyBar'),
  footerBarTitle: t('helpContent.transferBarTitle'),
  footerBar: tm('helpContent.transferBar')
})
log('--- HelpContent.vue setup ---')
</script>

<template>
  <v-sheet class="sheet" color="surface-light">
    <v-container>
      <v-row justify="center">
        <v-col cols="8" s="8">
          <v-card color="secondary">
            <v-card-title>
              {{ helppage.steady.titleBarTitle }}
            </v-card-title>
          </v-card>
          <v-card v-for="item in helppage.steady.titleBar" v-bind:key="item.title">
            <v-card-title>
              <v-icon v-if="rt(item.icon).length > 0">{{ rt(item.icon) }}</v-icon>
              {{ rt(item.title) }}
            </v-card-title>
            <v-card-text>
              {{ rt(item.content) }}
            </v-card-text>
          </v-card>
          <v-card color="secondary">
            <v-card-title>
              {{ helppage.toolBarTitle }}
            </v-card-title>
          </v-card>
          <v-card v-for="item in helppage.steady.toolBar" v-bind:key="item.title">
            <v-card-title>
              <v-icon v-if="rt(item.icon).length > 0">{{ rt(item.icon) }}</v-icon>
              {{ rt(item.title) }}
            </v-card-title>
            <v-card-text>
              {{ rt(item.content) }}
            </v-card-text>
          </v-card>
          <v-card color="secondary">
            <v-card-title>
              {{ helppage.steady.dotMenuBarTitle }}
            </v-card-title>
          </v-card>
          <v-card v-for="item in helppage.steady.dotMenu" v-bind:key="item.title">
            <v-card-title>
              <v-icon v-if="rt(item.icon).length > 0">{{ rt(item.icon) }}</v-icon>
              {{ rt(item.title) }}
            </v-card-title>
            <v-card-text>
              {{ rt(item.subtitle) }}
            </v-card-text>
          </v-card>
          <v-card color="secondary">
            <v-card-title>
              {{ helppage.footerBarTitle }}
            </v-card-title>
          </v-card>
          <v-card v-for="item in helppage.footerBar" v-bind:key="item.title">
            <v-card-title>
              <v-icon v-if="rt(item.icon).length > 0">{{ rt(item.icon) }}</v-icon>
              {{ rt(item.title) }}
            </v-card-title>
            <v-card-text>
              {{ rt(item.subtitle) }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<style scoped>
.sheet {
  overflow: auto;
  height: calc(100vh - 300px);
}
</style>

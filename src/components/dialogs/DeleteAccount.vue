<!--
  -- This Source Code Form is subject to the terms of the Mozilla Public
  -- License, v. 2.0. If a copy of the MPL was not distributed with this file,
  -- you could obtain one at https://mozilla.org/MPL/2.0/.
  --
  -- Copyright (c) 2014-2025, Martin Berner, kontenmanager@gmx.de. All rights reserved.
  -->
<script lang="ts" setup>
import {defineExpose, onMounted, useTemplateRef} from 'vue'
import {useI18n} from 'vue-i18n'
import {useRecordsStore} from '@/stores/records'
import {useSettingsStore} from '@/stores/settings'
import {useApp} from '@/pages/background'
import {useDeleteAccountStore} from '@/components/dialogs/deleteaccount'
import {storeToRefs} from 'pinia'
import {useTitleBarStore} from '@/components/titlebar'

const {t} = useI18n()
const {CONS, log, notice} = useApp()
const formRef = useTemplateRef('form-ref')
const records = useRecordsStore()
const settings = useSettingsStore()
const deleteaccount = useDeleteAccountStore()
const titlebar = useTitleBarStore()
const {_selected} = storeToRefs(deleteaccount)

deleteaccount.setSteady({
  accountNumberLabel: t('dialogs.deleteAccount.accountNumberLabel')
})

const ok = (): Promise<void> => {
  log('DELETE_ACCOUNT: ok')
  return new Promise(async (resolve): Promise<void> => {
    try {
      const result = await records.deleteAccount(_selected.value)
      if (result === 'Account deleted') {
        formRef.value?.reset()
        if (records.accounts.length > 0) {
          settings.setActiveAccountId(records.accounts.all[0].cID)
          await browser.storage.local.set({sActiveAccountId: records.accounts.all[0].cID})
        } else {
          settings.setActiveAccountId(-1)
          await browser.storage.local.set({sActiveAccountId: -1})
        }
        titlebar.setLogo()
        await notice([t('dialogs.deleteAccount.success')])
        resolve()
      }
    } catch (e) {
      console.error(e)
      await notice([t('dialogs.deleteAccount.error')])
    }
  })
}
const title = t('dialogs.deleteAccount.title')

defineExpose({ok, title})

onMounted(() => {
  log('DELETE_ACCOUNT: onMounted')
  formRef.value?.reset()
})

log('--- DeleteAccount.vue setup ---')
</script>

<template>
  <v-form ref="form-ref" validate-on="submit" v-on:submit.prevent>
    <v-select
      v-model="_selected"
      density="compact"
      required
      v-bind:item-title="CONS.DB.STORES.ACCOUNTS.FIELDS.N"
      v-bind:item-value="CONS.DB.STORES.ACCOUNTS.FIELDS.ID"
      v-bind:items="records.accounts.all"
      v-bind:label="deleteaccount.steady.accountNumberlabel"
      variant="outlined"
    ></v-select>
  </v-form>
</template>

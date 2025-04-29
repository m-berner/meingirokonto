<!--
  - This Source Code Form is subject to the terms of the Mozilla Public
  - License, v. 2.0. If a copy of the MPL was not distributed with this file,
  - you could obtain one at https://mozilla.org/MPL/2.0/.
  -
  - Copyright (c) 2014-2025, Martin Berner, meingirokonto@gmx.de. All rights reserved.
  -->
<script lang="ts" setup>
interface PropsCustomLogo {
  name: string
}

const _props = defineProps<PropsCustomLogo>()
</script>

<template>
  <component
    v-bind:is="_props.name"
    class="inline-block"
    role="img"
  ></component>
</template>

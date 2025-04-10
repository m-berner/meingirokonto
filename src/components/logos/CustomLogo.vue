<template>
  <component
    v-bind:is="_props.name"
    class="inline-block"
    role="img"
  ></component>
</template>

<script lang="ts" setup>
interface PropsCustomLogo {
  name: string
}

const _props = defineProps<PropsCustomLogo>()
</script>

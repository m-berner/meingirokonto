<template>
  <component
    v-bind:is="_props.name"
    class="inline-block"
    role="img"
  ></component>
</template>

<script lang="ts" setup>
//import ingd from '@/components/logos/ingd.vue'
//import byla from '@/components/logos/byla.vue'

interface PropsCustomLogo {
  name: string
}

const _props = defineProps<PropsCustomLogo>()
// const logos = {
//   ingd: Ingd,
//   byla: Byla
// }
</script>

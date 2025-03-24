<template>
  <component
    v-bind:is="icons[_props.name]"
    class="inline-block"
    role="img"
  ></component>
</template>

<script lang="ts" setup>
import INGIcon from '@/assets/INGIcon.vue'
import DKBIcon from '@/assets/DKBIcon.vue'

interface PropsCustomIcon {
  name: string
}

const _props = defineProps<PropsCustomIcon>()
const icons = {
  ing: INGIcon,
  dkb: DKBIcon
}
</script>

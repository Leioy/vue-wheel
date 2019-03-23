<template lang="pug">
  button.y-button(:class="[`icon-${iconPosition}`]")
    y-icon(v-if="loading" name="loading" class="icon loading")
    y-icon(v-if="icon && !loading" :name="icon" class="icon")
    .y-content
      slot
</template>

<script>
import YIcon from '@/components/icon/icon'
export default {
  name: 'y-button',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
    iconPosition: {
      type: String,
      default: 'left',
      validator (value) {
        return value === 'left' || value === 'right'
      },
    },
  },
  components: {
    YIcon,
  },
}
</script>

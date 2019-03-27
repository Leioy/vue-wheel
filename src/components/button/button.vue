<template>
  <button :class="classObj"  @click="$emit('click')">
    <y-icon v-if="loading" name="loading" class="icon loading"></y-icon>
    <y-icon v-if="icon && !loading" :name="icon" class="icon"></y-icon>
    <div :class="`${prefix}-content`">
      <slot></slot>
    </div>
  </button>
</template>

<script>
import YIcon from '@/components/icon/icon'
const prefix = 'y-button'
export default {
  name: prefix,
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'default',
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
  data () {
    return {
      prefix,
    }
  },
  components: {
    YIcon,
  },
  computed: {
    classObj () {
      return [
        `${this.prefix}`,
        `${this.prefix}-icon-${this.iconPosition}`,
        {
          [`${this.prefix}-button-${this.type}`]: this.type,
        },
      ]
    },
  },
}
</script>

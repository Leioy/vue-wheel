<template>
  <li :class="classes" @click.stop="handleClick">
    <slot></slot>
  </li>
</template>

<script>
import { findComponentUpward } from '../../../utils/assistant.js'
import Emitter from '../../../mixins/emitter.js'
const prefix = 'y-menu-item'
export default {
  name: 'y-menu-item',
  mixins: [Emitter],
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
      prefix,
      active: false,
    }
  },
  computed: {
    classes () {
      return [
        `${this.prefix}`,
        {
          [`${this.prefix}-active`]: this.active,
        },
      ]
    },
  },
  methods: {
    handleClick () {
      const parent = findComponentUpward(this, 'y-sub-menu')
      if (parent) {
        this.dispatch('y-sub-menu', 'on-item-select', this.name)
      } else {
        this.dispatch('y-menu', 'on-item-select', this.name)
      }
    },
  },
  mounted () {
    this.$on('on-update-active-name', name => {
      if (this.name === name) {
        this.active = true
        this.dispatch('y-sub-menu', 'on-update-active-name', name)
      } else {
        this.active = false
      }
    })
  },
}
</script>

<style lang="scss" scoped>
.y-menu-item {
  position: relative;
  padding: 0 20px;
  white-space: nowrap;
  z-index: 1;
  cursor: pointer;
  &-active {
    z-index: 1;
    border-bottom: 2px solid #2d8cf0;
  }
}
</style>

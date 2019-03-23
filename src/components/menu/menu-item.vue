<template>
  <li :class="classes" @click.stop="handleClick" :style="itemStyle">
    <slot></slot>
  </li>
</template>

<script>
import { findComponentUpward } from '../../utils/assistant.js'
import Emitter from '../../mixins/emitter.js'
import mixin from './mixin.js'
const prefix = 'y-menu-item'
export default {
  name: 'y-menu-item',
  mixins: [Emitter, mixin],
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
    itemStyle () {
      return this.hasParentSubmenu && this.mode !== 'horizontal'
        ? { paddingLeft: `${43 + (this.parentSubmenuNum - 1) * 24}px` } : {}
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

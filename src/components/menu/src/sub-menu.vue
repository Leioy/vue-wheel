<template>
  <li :class="classes" @mouseenter="handleEnter" @mouseleave="handleLeave">
    <div :class="`${prefix}-title`" :style="titleStyle" @click="handleClick">
      <slot name="title"></slot>
    </div>
    <template v-if="mode === 'vertical'">
      <ul class="y-menu-vertical" v-show="menuVisible">
        <slot></slot>
      </ul>
    </template>
    <template v-else>
      <div :class="`${prefix}-popover`" v-show="menuVisible">
        <slot></slot>
      </div>
    </template>
  </li>
</template>

<script>
import Emitter from '../../../mixins/emitter.js'
import mixin from './mixin.js'
const prefix = 'y-sub-menu'
export default {
  name: 'y-sub-menu',
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
      menuVisible: false,
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
    titleStyle () {
      return this.hasParentSubmenu && this.mode !== 'horizontal'
        ? { paddingLeft: `${43 + (this.parentSubmenuNum - 1) * 24}px` } : {}
    },
    accordion () {
      return this.menu.accordion
    },
  },
  methods: {
    handleClick () {
      if (this.mode === 'horizontal') {
        return
      }
      if (this.accordion) {
        this.$parent.$children.forEach(vm => {
          if (vm.$options.name === 'y-sub-menu') {
            vm.menuVisible = false
          }
        })
      }
      this.menuVisible = !this.menuVisible
    },
    handleEnter () {
      if (this.mode === 'vertical') {
        return
      }
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.menuVisible = true
      }, 250)
    },
    handleLeave () {
      if (this.mode === 'vertical') {
        return
      }
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.menuVisible = false
      }, 150)
    },
  },
  mounted () {
    this.$on('on-item-select', name => {
      if (this.mode === 'horizontal') {
        this.menuVisible = false
      }
      this.dispatch('y-menu', 'on-item-select', name)
    })
    this.$on('on-update-active-name', status => {
      this.active = status
    })
  },
}
</script>

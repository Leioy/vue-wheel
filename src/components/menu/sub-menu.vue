<template>
  <li :class="classes" @mouseenter="handleEnter" @mouseleave="handleLeave">
    <div :class="`${prefix}-title`" :style="titleStyle" @click="handleClick">
      <div>
        <slot name="title"></slot>
      </div>
      <y-icon name="down" :class="`${prefix}-title-icon`"></y-icon>
    </div>
      <collapse-transition v-if="mode === 'vertical'">
        <ul class="y-menu-vertical" v-show="menuVisible">
          <slot></slot>
        </ul>
      </collapse-transition>
      <transition name="slide-up" v-else>
        <ul :class="`${prefix}-popover`" v-show="menuVisible" ref="popover">
          <slot></slot>
        </ul>
      </transition>
  </li>
</template>

<script>
import Emitter from '../../mixins/emitter.js'
import mixin from './mixin.js'
import YIcon from '@/components/icon/icon'
import CollapseTransition from '../base/collapse-transition.js'
const prefix = 'y-sub-menu'
export default {
  name: 'y-sub-menu',
  mixins: [Emitter, mixin],
  components: {
    YIcon,
    CollapseTransition,
  },
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
          [`${this.prefix}-open`]: this.menuVisible,
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
      const menuVisible = this.menuVisible
      if (this.accordion) {
        this.$parent.$children.forEach(vm => {
          if (vm.$options.name === 'y-sub-menu') {
            vm.menuVisible = false
          }
        })
      }
      this.menu.updateOpenKeys(this.name)
      this.menuVisible = !menuVisible
    },
    handleEnter () {
      if (this.mode === 'vertical') {
        return
      }
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.menuVisible = true
      }, 250)
    },
    handleLeave () {
      if (this.mode === 'vertical') {
        return
      }
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
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

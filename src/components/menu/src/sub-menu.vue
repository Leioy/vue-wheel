<template>
  <li :class="classes" @mouseenter="handleEnter" @mouseleave="handleLeave">
    <div :class="`${prefix}-title`">
      <slot name="title"></slot>
    </div>
    <div :class="`${prefix}-popover`" v-show="menuVisible">
      <slot></slot>
    </div>
  </li>
</template>

<script>
import Emitter from '../../../mixins/emitter.js'
const prefix = 'y-sub-menu'
export default {
  name: 'y-sub-menu',
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
  },
  methods: {
    handleEnter () {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.menuVisible = true
      }, 250)
    },
    handleLeave () {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.menuVisible = false
      }, 150)
    },
  },
  mounted () {
    this.$on('on-item-select', name => {
      this.menuVisible = false
      this.dispatch('y-menu', 'on-item-select', name)
    })
    this.$on('on-update-active-name', status => {
      this.active = status
    })
  },
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/var";
.y-sub-menu {
  padding: 0 20px;
  height: inherit;
  line-height: inherit;
  position: relative;
  z-index: 1;
  &:hover {
    border-bottom: 2px solid #2d8cf0;
  }
  &-active {
    border-bottom: 2px solid #2d8cf0;
  }
  &-popover {
    min-width: 100%;
    position: absolute;
    top: calc(100% + 5px);
    left: 0;
    @extend %box-shadow;
    .y-menu-item {
      padding: 8px 16px;
      line-height: normal;
      border-bottom: none;
      &:hover {
        background: #f3f3f3;
      }
      &-active {
        color: #2d8cf0;
      }
    }
  }
}
</style>

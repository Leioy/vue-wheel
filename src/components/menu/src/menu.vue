<template>
  <ul :class="classes" :style="styles"><slot></slot></ul>
</template>

<script>
import Emitter from '../../../mixins/emitter.js'
const prefix = 'y-menu'
export default {
  name: 'y-menu',
  mixins: [Emitter],
  data () {
    return {
      prefix,
      currentName: this.activeName,
    }
  },
  props: {
    activeName: {
      type: String,
    },
    mode: {
      type: String,
      default: 'horizontal',
      validator (value) {
        return ['horizontal', 'vertical'].indexOf(value) >= 0
      },
    },
    width: {
      type: String,
      default: '240',
    },
    accordion: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes () {
      return [
        `${this.prefix}`,
        {
          [`${this.prefix}-${this.mode}`]: this.mode,
        },
      ]
    },
    styles () {
      let style = {}
      if (this.mode === 'vertical') {
        style.width = this.width + 'px'
      }
      return style
    },
  },
  methods: {
    updateActiveName () {
      this.broadcast('y-sub-menu', 'on-update-active-name', false)
      this.broadcast('y-menu-item', 'on-update-active-name', this.currentName)
    },
  },
  mounted () {
    this.updateActiveName()
    this.$on('on-item-select', name => {
      this.currentName = name
      this.$emit('on-select', name)
    })
  },
  watch: {
    currentName () {
      this.updateActiveName()
    },
  },
}
</script>

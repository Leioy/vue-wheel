<template>
  <ul :class="classes" :style="styles"><slot></slot></ul>
</template>

<script>
import Emitter from '../../../mixins/emitter.js'
import { findComponentsDownward, findComponentsUpward } from '../../../utils/assistant.js'
const prefix = 'y-menu'
export default {
  name: 'y-menu',
  mixins: [Emitter],
  data () {
    return {
      prefix,
      currentName: this.activeName,
      openedNames: [...this.openNames],
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
    openNames: {
      type: Array,
      default: () => [],
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
    updateOpenItems () {
      const items = findComponentsDownward(this, 'y-sub-menu')
      items.forEach(item => {
        if (this.openedNames.indexOf(item.name) >= 0) {
          item.menuVisible = true
        } else {
          item.menuVisible = false
        }
      })
    },
    updateOpenKeys (name) {
      let names = [...this.openedNames]
      const index = names.indexOf(name)
      if (index >= 0) {
        names.splice(index, 1)
      } else {
        if (this.accordion) {
          let currentSubmenu = null
          names = []
          findComponentsDownward(this, 'y-sub-menu').forEach(item => {
            if (item.name === name) {
              currentSubmenu = item
            }
          })
          findComponentsUpward(currentSubmenu, 'y-sub-menu').forEach(item => {
            names.push(item.name)
          })
        }
        names.push(name)
      }
      this.openedNames = names
      this.updateOpenItems()
    },
  },
  mounted () {
    this.updateActiveName()
    this.updateOpenItems()
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

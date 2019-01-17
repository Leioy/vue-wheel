<template>
  <ul :class="classes"><slot></slot></ul>
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
  },
  computed: {
    classes () {
      return [
        `${this.prefix}`,
      ]
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

<style lang="scss" scoped>
.y-menu {
  display: flex;
  height: 60px;
  line-height: 60px;
  position: relative;
  color: #515a6e;
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 1px;
    margin-top: -1px;
    background:#dcdee2;
  }
}
</style>

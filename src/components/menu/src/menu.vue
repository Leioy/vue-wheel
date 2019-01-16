<template>
  <ul :class="classes"><slot></slot></ul>
</template>

<script>
const prefix = 'y-menu'
export default {
  name: 'y-menu',
  data () {
    return {
      prefix,
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
}
</script>

<style lang="scss" scoped>
.y-menu {
  display: flex;
  height: 60px;
  line-height: 60px;
  position: relative;
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

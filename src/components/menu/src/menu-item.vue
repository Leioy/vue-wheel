<template>
  <li :class="classes">
    <slot></slot>
  </li>
</template>

<script>
const prefix = 'y-menu-item'
export default {
  name: 'y-menu-item',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
      prefix,
    }
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
.y-menu-item {
  position: relative;
  padding: 0 20px;
  white-space: nowrap;
  border-bottom: 2px solid #2d8cf0;
  z-index: 1;
}
</style>

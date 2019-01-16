<template>
  <li :class="classes">
    <div :class="`${prefix}-title`">
      <slot name="title"></slot>
    </div>
    <div :class="`${prefix}-popover`">
      <slot></slot>
    </div>
  </li>
</template>

<script>
const prefix = 'y-sub-menu'
export default {
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
@import "~@/assets/scss/var";
.y-sub-menu {
  padding: 0 20px;
  height: inherit;
  line-height: inherit;
  position: relative;
  border-bottom: 2px solid #2d8cf0;
  z-index: 1;
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
    }
  }
}
</style>

<template>
  <div :class="`${prefix}`">
    <div :class="`${prefix}-trigger`" @click="popoverVisible = !popoverVisible">
      <slot></slot>
    </div>
    <div :class="`${prefix}-popover`" v-if="popoverVisible">
     <y-cascader-item :items="dataSource"></y-cascader-item>
    </div>
  </div>
</template>

<script>
import YCascaderItem from './cascader-item'
const prefix = 'y-cascader'
export default {
  name: 'y-cascader',
  data () {
    return {
      prefix,
      popoverVisible: false,
    }
  },
  props: {
    dataSource: {
      type: Array,
    },
  },
  components: {
    YCascaderItem,
  },
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/var';
.y-cascader {
  position: relative;
  &-trigger {
    width: 100px;
    height: 32px;
    border: 1px solid red;
  }
  &-popover {
    position: absolute;
    top: 100%;
    left: 0;
    @extend %box-shadow;
  }
}
</style>

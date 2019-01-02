<template>
  <div :class="`${prefix}-wrapper`">
    <ul :class="`${prefix}`">
      <y-cascader-item
        v-for="(item,index) in data"
        :key="index"
        :data="item"
      ></y-cascader-item>
    </ul>
    <y-cascader-pane v-if="sublist.length" :data="sublist"></y-cascader-pane>
  </div>
</template>

<script>
import YCascaderItem from './cascader-item'
const prefix = 'y-cascader-pane'
export default {
  name: 'y-cascader-pane',
  data () {
    return {
      prefix,
      sublist: [],
    }
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    YCascaderItem,
  },
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/var';
.y-cascader-pane {
  &-wrapper {
    min-width: 100px;
    height: 180px;
    padding: 5px 0;
    @extend %box-shadow;
    font-size: 12px;
    color: $input-color;
    white-space: nowrap;
    overflow: auto;
  }
}
</style>

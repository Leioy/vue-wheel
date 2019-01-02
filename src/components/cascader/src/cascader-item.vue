<template>
  <li :class="`${prefix}`">
    {{data.label}}
    <y-icon name="right" :class="`${prefix}-arrow`"></y-icon>
  </li>
</template>

<script>
import YIcon from '@/components/icon/src/icon'
const prefix = 'y-cascader-item'
export default {
  data () {
    return {
      prefix,
    }
  },
  props: {
    data: {
      type: Object,
    },
  },
  components: {
    YIcon,
  },
}
</script>

<style lang="scss" scoped>
.y-cascader-item {
  padding: 8px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background: #f3f3f3;
  }
  &-arrow {
    transform: scale(.7);
    font-size: 12px;
    color: #000;
  }
}
</style>

<template>
  <li :class="classes">
    {{ data.label }}
    <y-icon v-if="showArrow" name="right" :class="`${prefix}-arrow`"></y-icon>
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
    tempItem: {
      type: Object,
    },
  },
  components: {
    YIcon,
  },
  computed: {
    classes () {
      return [
        `${this.prefix}`,
        {
          [`${this.prefix}-active`]: this.tempItem.value === this.data.value,
        },
      ]
    },
    showArrow () {
      return this.data.children
    },
  },
}
</script>

<style lang="scss" scoped>

</style>

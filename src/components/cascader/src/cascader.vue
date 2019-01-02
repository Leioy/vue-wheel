<template>
  <div :class="classes">
    <div :class="`${prefix}-wrapper`" @click="toggle">
      <slot>
        <input
          type="text"
          autocomplete="off"
          spellcheck="false"
          placeholder="请选择"
          readonly="readonly"
          :class="`${prefix}-trigger`"
        >
      </slot>
      <y-icon name="down" :class="`${prefix}-arrow`"></y-icon>
    </div>
    <div :class="`${prefix}-popover`" v-if="visible">
      <y-cascader-pane :data="data"></y-cascader-pane>
    </div>
  </div>
</template>

<script>
import YCascaderPane from './cascader-pane'
import YIcon from '@/components/icon/src/icon'
const prefix = 'y-cascader'
export default {
  data () {
    return {
      prefix,
      visible: false,
    }
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    YCascaderPane,
    YIcon,
  },
  computed: {
    classes () {
      return [
        `${prefix}`,
        {
          [`${prefix}-visible`]: this.visible,
        },
      ]
    },
  },
  methods: {
    toggle () {
      this.visible = !this.visible
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/var';
.y-cascader {
  position: relative;
  &-visible {
    .y-cascader-arrow {
      transform: rotate(180deg);
    }
  }
  &-wrapper {
    display: inline-block;
    position: relative;
  }
  &-trigger {
    height: $input-height;
    padding: 0 16px;
    outline: none;
    border: 1px solid $border-color;
    border-radius: $border-radius;
    color: $input-color;
    cursor: pointer;
    &::placeholder {
      color: #dcdee2;
    }
  }
  &-arrow {
    font-size: 12px;
    position: absolute;
    top: 50%;
    right: 8px;
    margin-top: -6px;
  }
  &-popover {
    position: absolute;
    top: calc(100% + 5px);
    left: 0;
  }
}
</style>

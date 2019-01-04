<template>
  <div :class="classes">
    <div :class="`${prefix}-wrapper`">
      <input type="text"
      :class="`${prefix}-trigger`"
      @click="popoverVisible = !popoverVisible"
      :value="selectedValue"
      readonly="readonly"
      autocomplete="off"
      spellcheck="false"
      :placeholder="placeholder">
      <div :class="`${prefix}-icon`">
        <y-icon name="delete" @click.native="clearSelected" v-if="selected.length"></y-icon>
        <y-icon name="down" v-else :class="`${prefix}-icon_down`"></y-icon>
      </div>
      <div :class="`${prefix}-popover`" v-if="popoverVisible">
      <y-cascader-item :items="dataSource" :selected="selected" @update:selected="onUpdate" @close="closePopover"></y-cascader-item>
      </div>
    </div>
  </div>
</template>

<script>
import YIcon from '@/components/icon/src/icon'
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
    selected: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: '请选择',
    },
  },
  components: {
    YCascaderItem,
    YIcon,
  },
  computed: {
    classes () {
      return [
        `${this.prefix}`,
        {
          [`${this.prefix}-active`]: this.popoverVisible,
        },
      ]
    },
    selectedValue () {
      console.log(this.selected)
      return this.selected.map(item => item.label).join(' / ')
    },
  },
  watch: {
    popoverVisible (val) {
      if (val) {
        document.addEventListener('click', this.listenToDocument)
      } else {
        document.removeEventListener('click', this.listenToDocument)
      }
    },
  },
  methods: {
    onUpdate (newSelected) {
      this.$emit('update:selected', newSelected)
    },
    listenToDocument (e) {
      if (e.target.contains(this.$el)) {
        this.closePopover()
      }
    },
    clearSelected () {
      this.$emit('update:selected', [])
      this.closePopover()
    },
    closePopover () {
      this.popoverVisible = false
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/var';
.y-cascader {
  &-active {
    .y-cascader-icon_down {
      transform: rotate(180deg);
    }
  }
  &-wrapper {
    position: relative;
  }
  &-trigger {
    width: 100%;
    display: flex;
    align-items: center;
    height: $input-height;
    padding: 0 16px;
    outline: none;
    border: 1px solid $border-color;
    border-radius: $border-radius;
    cursor: pointer;
    color: $input-color;
    &::placeholder {
      color: #dcdee2;
    }
  }
  &-icon {
    position: absolute;
    top: 50%;
    right: 8px;
    transform: translateY(-50%);
    font-size: 12px;
    cursor: pointer;
    &_down {
      transition: all .2s ease-in-out;
    }
  }
  &-popover {
    position: absolute;
    top: calc(100% + 5px);
    left: 0;
    @extend %box-shadow;
    font-size: 12px;
    color: $input-color;
    white-space: nowrap;
  }
}
</style>

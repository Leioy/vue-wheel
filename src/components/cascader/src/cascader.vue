<template>
  <div :class="`${prefix}`">
    <div :class="`${prefix}-wrapper`">
      <input type="text"
      :class="`${prefix}-trigger`"
      @click="popoverVisible = !popoverVisible"
      :value="selectedValue"
      readonly="readonly"
      autocomplete="off"
      spellcheck="false"
      :placeholder="placeholder">
      <div :class="`${prefix}-icon`" v-if="selected.length" @click="clearSelected">
        <y-icon name="delete"></y-icon>
      </div>
      <div :class="`${prefix}-popover`" v-if="popoverVisible">
      <y-cascader-item :items="dataSource" :selected="selected" @update:selected="onUpdate"></y-cascader-item>
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
    selectedValue () {
      return this.selected.map(item => item.name).join(' / ')
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
        this.popoverVisible = false
      }
    },
    clearSelected () {
      this.$emit('update:selected', [])
      this.popoverVisible = false
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/var';
.y-cascader {
  &-wrapper {
    display: inline-block;
    position: relative;
  }
  &-trigger {
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

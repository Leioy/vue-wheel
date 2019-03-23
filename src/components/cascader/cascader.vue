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
          :value="selectedLabel"
        />
      </slot>
      <y-icon name="down" :class="`${prefix}-arrow`"></y-icon>
      <y-icon
        name="delete"
        :class="`${prefix}-arrow`"
        v-show="isCloseIconVisible"
        @click.native.stop="clearSelect"
      ></y-icon>
    </div>
    <div :class="`${prefix}-popover`" v-show="visible">
      <y-cascader-pane :data="data"></y-cascader-pane>
    </div>
  </div>
</template>

<script>
import YCascaderPane from './cascader-pane'
import YIcon from '@/components/icon/icon'
import Emitter from '@/mixins/emitter'
const prefix = 'y-cascader'
export default {
  name: 'y-cascader',
  mixins: [Emitter],
  data () {
    return {
      prefix,
      visible: false,
      currentValue: this.value,
      selected: [],
      // 临时选中项
      tempSelected: [],
    }
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Array,
      dafault: () => [],
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
          [`${prefix}-show-clear`]: this.isCloseIconVisible,
        },
      ]
    },
    selectedLabel () {
      return this.selected.map(item => item.label).join(' / ')
    },
    isCloseIconVisible () {
      return this.currentValue && this.currentValue.length
    },
  },
  methods: {
    toggle () {
      this.visible = !this.visible
    },
    handleClose () {
      this.visible = false
    },
    updateResult (result) {
      this.tempSelected = result
    },
    clearSelect () {
      this.currentValue = this.selected = this.tempSelected = []
      this.handleClose()
      this.broadcast('y-cascader-pane', 'on-clear')
    },
    updateSelected () {
      this.broadcast('y-cascader-pane', 'on-find-selected', {
        value: this.currentValue,
      })
    },
    emitValue (val, oldVal) {
      if (JSON.stringify(val) !== oldVal) {
        this.$emit('on-change', this.currentValue, JSON.parse(JSON.stringify(this.selected)))
      }
    },
  },
  created () {
    this.$on('on-result-change', params => {
      const { lastValue } = params
      if (lastValue) {
        const oldVal = JSON.stringify(this.currentValue)
        this.selected = this.tempSelected
        let newVal = []
        this.selected.forEach(item => {
          newVal.push(item.value)
        })
        this.currentValue = newVal
        this.emitValue(this.currentValue, oldVal)
        this.handleClose()
      }
    })
  },
  mounted () {
    this.updateSelected()
  },
  watch: {
    currentValue () {
      this.$emit('input', this.currentValue)
    },
  },
}
</script>

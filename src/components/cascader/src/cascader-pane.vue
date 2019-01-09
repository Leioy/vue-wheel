<template>
  <div :class="`${prefix}-wrapper`">
    <ul :class="`${prefix}`">
      <y-cascader-item
        v-for="(item, index) in data"
        :key="index"
        :data="item"
        :temp-item="tempItem"
        @click.native.stop="handleClickItem(item);"
      ></y-cascader-item>
    </ul>
    <y-cascader-pane
      v-if="sublist && sublist.length"
      :data="sublist"
    ></y-cascader-pane>
  </div>
</template>

<script>
import YCascaderItem from './cascader-item'
import Emitter from '@/mixins/emitter'
const prefix = 'y-cascader-pane'
export default {
  name: 'y-cascader-pane',
  mixins: [Emitter],
  data () {
    return {
      prefix,
      sublist: [],
      result: [],
      tempItem: {},
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
  watch: {
    data () {
      this.sublist = []
    },
  },
  methods: {
    handleClickItem (item) {
      const backItem = this.getBaseItem(item)
      this.tempItem = backItem
      this.emitUpdate([backItem])
      if (item.children) {
        this.sublist = item.children
        this.dispatch('y-cascader', 'on-result-change', { lastValue: false })
      } else {
        this.sublist = []
        this.dispatch('y-cascader', 'on-result-change', { lastValue: true })
      }
    },
    getBaseItem (item) {
      const backItem = Object.assign({}, item)
      this.tempItem = backItem
      if (backItem.children) {
        delete backItem.children
      }
      return backItem
    },
    updateResult (item) {
      this.result = [this.tempItem].concat(item)
      this.emitUpdate(this.result)
    },
    emitUpdate (result) {
      if (this.$parent.$options.name === 'y-cascader-pane') {
        this.$parent.updateResult(result)
      } else {
        this.$parent.updateResult(result)
      }
    },
  },
  mounted () {
    this.$on('on-clear', () => {
      this.sublist = []
      this.tempItem = {}
    })
    this.$on('on-find-selected', params => {
      const val = params.value
      const value = [...val]
      value.forEach(item => {
        this.data.forEach(i => {
          if (item === i.value) {
            this.handleClickItem(i)
            value.splice(0, 1)
            this.$nextTick(() => {
              this.broadcast('y-cascader-pane', 'on-find-selected', {
                value: value,
              })
            })
          }
        })
      })
    })
  },
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/var";
.y-cascader-pane {
  min-width: 100px;
  height: 180px;
  padding: 5px 0;
  white-space: nowrap;
  overflow: auto;
  border-right: 1px solid #e8eaec;
  &-wrapper {
    display: flex;
    font-size: 12px;
    color: $input-color;
  }
}
</style>

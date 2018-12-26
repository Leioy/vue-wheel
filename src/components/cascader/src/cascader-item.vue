<template>
  <div :class="`${prefix}`">
    <div :class="`${prefix}-left`">
      <div :class="labelClass(item)" v-for="(item,index) in items" :key="index" @click="clickLabel(item)">
        {{item.name}}
        <span v-if="item.children">
          <y-icon name="right" :class="`${prefix}-icon`"></y-icon>
        </span>
      </div>
    </div>
    <div :class="`${prefix}-right`" v-if="rightItems">
      <y-cascader-item :items="rightItems" :level="level + 1" @update:selected="onUpdateSelected" :selected="selected"></y-cascader-item>
    </div>
  </div>
</template>

<script>
import YIcon from '@/components/icon/src/icon'
const prefix = 'y-cascader-item'
export default {
  name: 'y-cascader-item',
  props: {
    items: {
      type: Array,
    },
    selected: {
      type: Array,
      default: () => [],
    },
    level: {
      type: Number,
      default: 0,
    },
  },
  components: {
    YIcon,
  },
  data () {
    return {
      prefix,
      leftSelected: null,
    }
  },
  computed: {
    rightItems () {
      const currentSelected = this.selected[this.level]
      if (currentSelected && currentSelected.children) {
        return currentSelected.children
      } else {
        return null
      }
    },
  },
  methods: {
    labelClass (item) {
      return [
        `${prefix}-label`,
        { 'active': this.selected.findIndex(s => item.name === s.name) > -1 },
      ]
    },
    clickLabel (item) {
      let copy = JSON.parse(JSON.stringify(this.selected))
      copy[this.level] = item
      copy.splice(this.level + 1)
      this.$emit('update:selected', copy)
    },
    onUpdateSelected (newSelected) {
      this.$emit('update:selected', newSelected)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/var';
.y-cascader-item {
  height: 200px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  &-left {
    height: 100%;
    padding: .3em 0;
  }
  &-label {
    padding: .3em 1em;
    display: flex;
    align-items: center;
    &.active {
      background: #f3f3f3;
      color: #2d8cf0;
    }
  }
  &-icon {
    margin-left: 1em;
    transform: scale(.6);
  }
  &-right {
    height: 100%;
    border-left: 1px solid $border-color-light;
  }
}
</style>

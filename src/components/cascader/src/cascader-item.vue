<template>
  <div :class="`${prefix}`">
    <div :class="`${prefix}-left`">
      <div :class="`${prefix}-label`" v-for="(item,index) in items" :key="index" @click="leftSelected = item">
        {{item.name}}
        <span v-if="item.children">
          <y-icon name="right" :class="`${prefix}-icon`"></y-icon>
        </span>
      </div>
    </div>
    <div :class="`${prefix}-right`" v-if="rightItems">
      <y-cascader-item :items="rightItems"></y-cascader-item>
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
      if (this.leftSelected && this.leftSelected.children) {
        return this.leftSelected.children
      } else {
        return null
      }
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

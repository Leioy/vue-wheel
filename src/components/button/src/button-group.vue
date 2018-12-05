<template lang="pug">
  .y-button-group
    slot
</template>

<script>
export default {
  name: 'y-button-group',
  mounted () {
    for (const node of this.$el.children) {
      if (node.nodeName.toLocaleLowerCase() !== 'button') {
        console.warn(`y-button-group的子元素应全为button，但你的写的是${node.nodeName}`)
      }
    }
  },
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/scss/var";
  .y-button-group {
    display: inline-flex;
    vertical-align: middle;
    .y-button {
      border-radius: 0;
      &:not(first-child) {
        margin-left: -1px;
      }
      &:first-child {
        border-top-left-radius: $border-radius;
        border-bottom-left-radius: $border-radius;
      }
      &:last-child {
        border-top-right-radius: $border-radius;
        border-bottom-right-radius: $border-radius;
      }
      // 为什么要添加这个样式，试试把$border-color-hover改成red就知道了
      &:hover {
        position: relative;
        z-index: 1;
      }
    }
  }
</style>

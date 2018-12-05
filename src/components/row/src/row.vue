<template lang="pug">
  .y-row(:style="styleObj")
    slot
</template>

<script>
export default {
  name: 'y-row',
  props: {
    gutter: [Number, String],
  },
  computed: {
    styleObj () {
      const { gutter } = this
      return { marginLeft: `${-gutter / 2}px`, marginRight: `${-gutter / 2}px` }
    },
  },
  mounted () {
    // 让col接收gutter
    this.$children.forEach(vm => {
      vm.gutter = this.gutter
    })
  },
}
</script>

<style lang="scss" scoped>
  .y-row {
    display: flex;
    flex-wrap: wrap;
  }
</style>

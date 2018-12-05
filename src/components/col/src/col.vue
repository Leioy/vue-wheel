<template lang="pug">
  .y-col(:class="[span && `col-${span}`,offset && `offset-${offset}`]" :style="styleObj")
    div(style="border: 1px solid green;height:100px;")
      slot
</template>

<script>
export default {
  name: 'y-col',
  props: {
    span: [Number, String],
    offset: [Number, String],
  },
  data () {
    return {
      gutter: 0,
    }
  },
  computed: {
    styleObj () {
      const { gutter } = this
      return { paddingLeft: `${+gutter / 2}px`, paddingRight: `${+gutter / 2}px` }
    },
    // 饿了么接收gutter的方式
    // gutter () {
    //   let parent = this.$parent
    //   while (parent && parent.$options.name !== 'y-row') {
    //     parent = parent.$parent
    //   }
    //   return parent ? parent.gutter : 0
    // },
  },
}
</script>

<style lang="scss" scoped>
  .y-col {
    width: 50%;
    height: 100px;
    // background: #eee;
    // border: 1px solid red;
    $class-prefix: col-;
    @for $i from 1 through 24 {
      &.#{$class-prefix}#{$i} {
        width: ($i / 24) * 100%;
      }
    }
    $class-prefix: offset-;
    @for $i from 1 through 24 {
      &.#{$class-prefix}#{$i} {
        margin-left: ($i / 24) * 100%;
      }
    }
  }
</style>

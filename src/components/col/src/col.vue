<template lang="pug">
  .y-col(:class="[span && `col-${span}`,offset && `offset-${offset}`]")
    slot
</template>

<script>
export default {
  name: 'y-col',
  props: {
    span: [Number, String],
    offset: [Number, String],
  },
}
</script>

<style lang="scss" scoped>
  .y-col {
    width: 50%;
    height: 100px;
    background: #eee;
    border: 1px solid red;
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

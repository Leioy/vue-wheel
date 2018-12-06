<template lang="pug">
  .y-col(:class="classObj" :style="styleObj")
    slot
</template>

<script>
const validator = value => {
  let valid = true
  Object.keys(value).forEach(key => {
    if (!['offset', 'span'].includes(key)) {
      valid = false
    }
  })
  return valid
}
export default {
  name: 'y-col',
  props: {
    span: [Number, String],
    offset: [Number, String],
    ipad: {
      type: Object,
      validator,
    },
    narrowPc: {
      type: Object,
      validator,
    },
    pc: {
      type: Object,
      validator,
    },
    widePc: {
      type: Object,
      validator,
    },
  },
  computed: {
    styleObj () {
      const { gutter } = this
      return { paddingLeft: `${+gutter / 2}px`, paddingRight: `${+gutter / 2}px` }
    },
    classObj () {
      const { span, offset, ipad, narrowPc, pc, widePc } = this
      const createClass = this.createClass
      return [
        ...createClass({ span, offset }),
        ...createClass(ipad, 'ipad-'),
        ...createClass(narrowPc, 'narrowPc-'),
        ...createClass(pc, 'pc-'),
        ...createClass(widePc, 'widePc-'),
      ]
    },
    // 饿了么接收gutter的方式
    gutter () {
      let parent = this.$parent
      while (parent && parent.$options.name !== 'y-row') {
        parent = parent.$parent
      }
      return parent ? parent.gutter : 0
    },
  },
  methods: {
    createClass (obj, str = '') {
      if (!obj) { return [] }
      let array = []
      if (obj.span) {
        array.push(`col-${str}${obj.span}`)
      }
      if (obj.offset) {
        array.push(`offset-${str}${obj.offset}`)
      }
      return array
    },
  },
}
</script>

<style lang="scss" scoped>
  .y-col {
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
    @media (min-width: 577px) {
      $class-prefix: col-ipad-;
      @for $i from 1 through 24 {
        &.#{$class-prefix}#{$i} {
          width: ($i / 24) * 100%;
        }
      }
      $class-prefix: offset-ipad-;
      @for $i from 1 through 24 {
        &.#{$class-prefix}#{$i} {
          margin-left: ($i / 24) * 100%;
        }
      }
    }
    @media (min-width: 769px) {
      $class-prefix: col-narrow-pc-;
      @for $i from 1 through 24 {
        &.#{$class-prefix}#{$i} {
          width: ($i / 24) * 100%;
        }
      }
      $class-prefix: offset-narrow-pc-;
      @for $i from 1 through 24 {
        &.#{$class-prefix}#{$i} {
          margin-left: ($i / 24) * 100%;
        }
      }
    }
    @media (min-width: 993px){
      $class-prefix: col-pc-;
      @for $i from 1 through 24 {
        &.#{$class-prefix}#{$i} {
          width: ($i / 24) * 100%;
        }
      }
      $class-prefix: offset-pc-;
      @for $i from 1 through 24 {
        &.#{$class-prefix}#{$i} {
          margin-left: ($i / 24) * 100%;
        }
      }
    }
    @media (min-width: 1201px){
      $class-prefix: col-wide-pc-;
      @for $i from 1 through 24 {
        &.#{$class-prefix}#{$i} {
          width: ($i / 24) * 100%;
        }
      }
      $class-prefix: offset-wide-pc-;
      @for $i from 1 through 24 {
        &.#{$class-prefix}#{$i} {
          margin-left: ($i / 24) * 100%;
        }
      }
    }
  }
</style>

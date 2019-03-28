<template>
  <div class="y-col" :class="classObj" :style="styleObj">
    <slot></slot>
  </div>
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
      return { marginLeft: `${+gutter / 2}px`, marginRight: `${+gutter / 2}px` }
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

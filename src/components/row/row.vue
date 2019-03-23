<template>
  <div class="y-row" :class="classObj" :style="styleObj">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'y-row',
  props: {
    gutter: [Number, String],
    justify: {
      type: String,
    },
  },
  computed: {
    styleObj () {
      const { gutter } = this
      return { marginLeft: `${-gutter / 2}px`, marginRight: `${-gutter / 2}px` }
    },
    classObj () {
      return [this.justify && `justify-${this.justify}`]
    },
  },
}
</script>

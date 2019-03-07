<template>
  <div :class="`${prefix}-wrapper`">
    <div :class="classObj" :style="styleObj" ref="sticky">
      <slot></slot>
    </div>
    <div v-show="slot" :style="slotStyleObj"></div>
  </div>
</template>

<script>
const prefix = 'y-sticky'

function getWindowScroll (top) {
  const prop = top ? 'pageYOffset' : 'pageXOffset'
  const method = top ? 'scrollTop' : 'scrollLeft'
  let ret = window[prop]

  // 考虑不兼容pageYoffset的情况
  if (typeof ret !== 'number') {
    ret = document.documentElement[method]
  }
  return ret
}

function getComputedOffset (el) {
  const rect = el.getBoundingClientRect()
  const scrollTop = getWindowScroll(true)
  const scrollLeft = getWindowScroll()
  const docEl = document.body

  return {
    top: rect.top + scrollTop - docEl.clientTop,
    left: rect.left + scrollLeft - docEl.clientLeft,
  }
}
export default {
  name: prefix,
  props: {
    offset: {
      type: Number,
      default: 0,
    },
  },
  data () {
    return {
      prefix,
      sticky: false,
      slot: false,
      styleObj: {},
      slotStyleObj: {},
    }
  },
  computed: {
    classObj () {
      return [
        `${prefix}`,
        {
          [`${prefix}-active`]: this.sticky,
        },
      ]
    },
  },
  mounted () {
    window.addEventListener('scroll', this.scrollHandler)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.scrollHandler)
  },
  methods: {
    scrollHandler () {
      const scrollTop = getWindowScroll(true)
      const elOffset = getComputedOffset(this.$el)
      if (elOffset.top - this.offset < scrollTop) {
        this.sticky = true
        this.slot = true
        this.slotStyleObj = {
          width: this.$refs.sticky.clientWidth + 'px',
          height: this.$refs.sticky.clientHeight + 'px',
        }
        this.styleObj = {
          top: `${this.offset}px`,
          left: `${elOffset.left}px`,
          width: `${this.$el.offsetWidth}px`,
        }
      } else {
        this.sticky = false
        this.slot = false
        this.styleObj = {}
        this.slotStyleObj = {}
      }
    },
  },
}
</script>

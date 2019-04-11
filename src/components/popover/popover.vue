<template>
  <div :class="`${prefix}-wrapper`" ref="popOver">
    <div :class="[`${prefix}-content`,`position-${this.position}`]" v-if="visible" ref="popOverContent" :style="styleObj">
      <slot name="content">我是popover</slot>
    </div>
    <span :class="`${prefix}-action`" ref="popOverAction">
      <slot></slot>
    </span>
  </div>
</template>

<script>
const prefix = 'y-popover'
export default {
  name: prefix,
  data () {
    return {
      visible: false,
      prefix,
    }
  },
  props: {
    position: {
      type: String,
      default: 'top',
    },
    trigger: {
      type: String,
      default: 'click',
    },
    styleObj: {
      type: Object,
      default: () => ({}),
    },
  },
  mounted () {
    if (this.trigger === 'click') {
      this.$refs.popOver.addEventListener('click', this.onClick)
    } else {
      this.$refs.popOver.addEventListener('mouseenter', () => {
        this.visible = true
        this.$nextTick(() => {
          this.resetPosition()
        })
      })
      this.$refs.popOver.addEventListener('mouseleave', (e) => {
        this.visible = false
      })
    }
  },
  beforeDestroy () {
    if (this.trigger === 'click') {
      this.$refs.popOver.removeEventListener('click', this.onClick)
    } else {
      this.$refs.popOver.removeEventListener('mouseenter', this.open)
      this.$refs.popOver.removeEventListener('mouseleave', this.close)
    }
  },
  methods: {
    eveneHandler (e) {
      if (this.$refs.popOverContent && (this.$refs.popOverContent === e.target || this.$refs.popOverContent.contains(e.target))) { return }
      if (this.$refs.popOver && (this.$refs.popOver === e.target || this.$refs.popOver.contains(e.target))) { return }
      this.close()
    },
    resetPosition () {
      const { popOverContent, popOverAction } = this.$refs
      document.body.appendChild(popOverContent)
      const { left, top, width, height } = popOverAction.getBoundingClientRect()
      const { height: hieght2 } = popOverContent.getBoundingClientRect()
      // 为什么要加scroll的值，因为相对的位置不同
      const positions = {
        top: {
          top: top + window.scrollY,
          left: left + window.scrollX,
        },
        bottom: {
          top: top + window.scrollY + height,
          left: left + window.scrollX,
        },
        left: {
          top: top + window.scrollY + (height - hieght2) / 2,
          left: left + window.scrollX,
        },
        right: {
          top: top + window.scrollY + (height - hieght2) / 2,
          left: left + window.scrollX + width,
        },
      }
      popOverContent.style.top = positions[this.position].top + 'px'
      popOverContent.style.left = positions[this.position].left + 'px'
    },
    open () {
      this.visible = true
      document.addEventListener('click', this.eveneHandler)
      this.$nextTick(() => {
        this.resetPosition()
      })
    },
    close () {
      this.visible = false
      document.removeEventListener('click', this.eveneHandler)
    },
    onClick (event) {
      if (this.$refs.popOverAction.contains(event.target)) {
        if (this.visible === true) {
          this.close()
        } else {
          this.open()
        }
      }
    },
  },
}
</script>

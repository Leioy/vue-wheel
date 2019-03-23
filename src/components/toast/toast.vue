<template lang="pug">
  .y-toast(:class="classObj")
    .y-toast__inner(ref="toast")
      div(v-if="enableHtml" v-html="$slots.default[0]")
      slot(v-else)
      .line(ref="line")
      span(v-if="closeButton" @click="handleClick" class="close") {{closeButton.text}}
</template>

<script>
export default {
  name: 'y-taost',
  props: {
    autoClose: {
      type: [Boolean, Number],
      default: 3,
      validator (val) {
        return val === false || typeof val === 'number'
      },
    },
    closeButton: {
      type: Object,
      default: () => {
        return {
          text: '关闭',
          callback: () => {},
        }
      },
    },
    enableHtml: {
      type: Boolean,
      default: false,
    },
    position: {
      type: String,
      default: 'top',
      validator (val) {
        return ['top', 'middle', 'bottom'].includes(val)
      },
    },
  },
  computed: {
    classObj () {
      return [`position-${this.position}`]
    },
  },
  mounted () {
    this.updateStyle()
    this.executeAutoClose()
  },
  methods: {
    updateStyle () {
      this.$nextTick(() => {
        this.$refs.line.style.height = this.$refs.toast.getBoundingClientRect().height + 'px'
      })
    },
    executeAutoClose () {
      if (this.autoClose) {
        setTimeout(() => {
          this.close()
        }, this.autoClose * 1000)
      }
    },
    close () {
      this.$el.remove()
      this.$emit('close')
      this.$destroy()
    },
    handleClick () {
      this.close()
      this.closeButton.callback()
    },
  },
}
</script>

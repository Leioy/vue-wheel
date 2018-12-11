<template lang="pug">
  .y-toast(ref="toast" :class="classObj")
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
      type: Boolean,
      default: false,
    },
    autoCloseDelay: {
      type: Number,
      default: 10,
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
        }, this.autoCloseDelay * 1000)
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

<style lang="scss" scoped>
@keyframes fade-in {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
@keyframes slide-up {
  0% { opacity: 0; transform: translateY(100%)}
  100% { opacity: 1; transform: translateY(0%)}
}
@keyframes slide-down {
  0% { opacity: 0; transform: translateY(-100%)}
  100% { opacity: 1; transform: translateY(0%)}
}
.y-toast {
  display: inline-flex;
  align-items: center;
  position: fixed;
  left: 50%;
  padding: 4px 16px;
  min-height: 40px;
  line-height: 1.8;
  font-size: 14px;
  color: #fff;
  background: rgba(0, 0, 0, .75);
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, .5);
  border-radius: 4px;
  &.position-top {
    top: 0;
    transform: translateX(-50%);
    animation: slide-down 1s;
  }
  &.position-middle {
    top: 50%;
    transform: translate(-50%,-50%);
    animation: fade-in 1s;
  }
  &.position-bottom {
    bottom: 0;
    transform: translateX(-50%);
    animation: slide-up 1s;
  }
  .close {
    flex-shrink: 0;
  }
  .line {
    height: 100%;
    border-left: 1px solid #666;
    margin: 0 16px;
  }
}
</style>

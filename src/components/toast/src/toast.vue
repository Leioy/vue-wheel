<template lang="pug">
  .y-toast(ref="toast")
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
      default: true,
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
.y-toast {
  display: inline-flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 50%;
  padding: 4px 16px;
  min-height: 40px;
  line-height: 1.8;
  transform: translateX(-50%);
  font-size: 14px;
  color: #fff;
  background: rgba(0, 0, 0, .75);
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, .5);
  border-radius: 4px;
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

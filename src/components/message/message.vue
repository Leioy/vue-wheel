<template>
  <transition name="slide-message">
    <div :class="`${prefix}-wrapper`" v-show="visible">
      <div :class="[`${prefix}`,`${prefix}-${options.type}`]">
        <div :class="`${prefix}-left`">
          <y-icon :name="options.type" :class="`${prefix}-icon`"></y-icon>
          <span :class="`${prefix}-content`">{{options.message}}</span>
        </div>
        <span :class="`${prefix}-button-close`" v-if="options.closeable" @click="close">
          <y-icon name="close"></y-icon>
        </span>
      </div>
    </div>
  </transition>
</template>

<script>
import YIcon from '../icon/icon'
const prefix = 'y-message'
export default {
  name: prefix,
  components: {
    YIcon,
  },
  props: {
    options: {
      type: Object,
      default: () => {
        return {
          type: '',
          message: '',
          duration: 2000,
          closeable: false,
        }
      },
    },
  },
  data () {
    return {
      prefix,
      timer: null,
      visible: false,
    }
  },
  methods: {
    autoClose () {
      this.timer = setTimeout(() => {
        this.close()
      }, this.options.duration)
    },
    close () {
      this.visible = false
      this.$el.addEventListener('transitionend', this.destroyEle)
    },
    destroyEle () {
      this.$el.removeEventListener('transitionend', this.destroyEle)
      this.$destroy()
    },
  },
  mounted () {
    !this.options.closeable && this.autoClose()
  },
  beforeDestroy () {
    this.timer ? clearTimeout(this.timer) : ''
    this.$el.remove()
  },
}
</script>

<style lang="scss" scoped>
.slide-message-enter-active,.slide-message-leave-active {
  transition: transform .3s ease-in-out, opacity .3s ease-in-out;
}
.slide-message-enter-to,.slide-message-leave {
  transform: translateY(0) translateX(-50%);
  opacity: 1;
}
.slide-message-enter,.slide-message-leave-to {
  transform: translateY(-100%) translateX(-50%);
  opacity: 0;
}
</style>

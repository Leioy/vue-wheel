<template>
  <div :class="[`${prefix}`,{active:isActive}]">
    <div :class="`${prefix}-header`" @click="toggle">{{title}}</div>
    <collapse-transition>
      <div :class="`${prefix}-content`" v-show="isActive">
        <div :class="`${prefix}-content-box`">
          <slot name="content"></slot>
        </div>
      </div>
    </collapse-transition>
  </div>
</template>

<script>
import CollapseTransition from '../base/collapse-transition.js'
const prefix = 'y-collapse-item'
export default {
  name: prefix,
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  components: {
    CollapseTransition,
  },
  data () {
    return {
      index: 0,
      isActive: false,
      prefix,
    }
  },
  methods: {
    toggle () {
      this.$parent.toggle({
        name: this.title,
        isActive: this.isActive,
      })
    },
  },
}
</script>

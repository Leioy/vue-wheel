<template>

  <div class="y-collapse-item" :class="{active:isActive}" @click="toggle">
    <div class="y-collapse-header">{{title}}</div>
    <div class="y-collapse-content" v-show="isActive">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'y-collapse-item',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
      index: 0,
      isActive: false,
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

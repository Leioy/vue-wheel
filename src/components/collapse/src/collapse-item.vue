<template lang="pug">
  .y-collapse-item(:class="{active:isActive}" @click="toggle")
    .y-collapse-header {{title}}
    .y-collapse-content(v-show="isActive")
      slot
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

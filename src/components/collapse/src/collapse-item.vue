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

<style lang="scss" scoped>
.y-collapse {
  &-item {
    border-top: 1px solid #dcdee2;
    &:first-child {
      border-top: none;
    }
    &:last-child {
      .y-collapse-content {
        border-radius: 0 0 4px 4px;
      }
    }
    &.active {
      .y-collapse-header {
        border-bottom: 1px solid #dcdee2;
      }
    }
  }
  &-header {
    min-height: 32px;
    display: flex;
    align-items: center;
    padding: 0 8px;
  }
  &-content {
    padding-top: 16px;
    padding-bottom: 16px;
  }
}
</style>

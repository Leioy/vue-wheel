<template lang="pug">
  .y-collapse
    slot
</template>

<script>
export default {
  name: 'y-collapse',
  props: {
    value: {
      type: [Array, String],
    },
    accordion: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      currentValue: this.value,
    }
  },
  watch: {
    currentValue () {
      this.setActive()
    },
  },
  mounted () {
    this.setActive()
  },
  methods: {
    setActive () {
      const activeKey = this.getActiveKey()
      this.$children.forEach((child, index) => {
        child.isActive = activeKey.includes(child.title)
        child.index = index
      })
    },
    getActiveKey () {
      let activeKey = this.currentValue || []
      if (!Array.isArray(activeKey)) {
        activeKey = [activeKey]
      }
      if (this.accordion && activeKey.length > 1) {
        activeKey = [activeKey[0]]
      }
      return activeKey
    },
    toggle (data) {
      let newActiveKey = []
      if (this.accordion) {
        if (!data.isActive) {
          newActiveKey.push(data.name)
        }
      } else {
        const activeKey = this.getActiveKey()
        const index = activeKey.indexOf(data.name)
        if (index > -1) {
          activeKey.splice(index, 1)
        } else {
          activeKey.push(data.name)
        }
        newActiveKey = activeKey
      }
      this.currentValue = newActiveKey
      this.$emit('input', newActiveKey)
    },
  },
}
</script>

<style lang="scss" scoped>
  .y-collapse {
    border: 1px solid #dcdee2;
    border-radius: 4px;
  }
</style>

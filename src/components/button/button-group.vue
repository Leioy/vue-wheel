<template>
  <div class="y-button-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'y-button-group',
  mounted () {
    for (const node of this.$el.children) {
      if (node.nodeName.toLocaleLowerCase() !== 'button') {
        console.warn(`y-button-group的子元素应全为button，但你的写的是${node.nodeName}`)
      }
    }
  },
}
</script>

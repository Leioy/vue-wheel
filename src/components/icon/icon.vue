<template lang="pug">
  svg.y-icon
    use(:xlink:href="`#i-${name}`")
</template>

<script>
export default {
  name: 'y-icon',
  props: {
    name: {
      type: String,
    },
  },
}
</script>

<style lang="scss" scoped>
  .y-icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    transition: all ease .3s;
  }
</style>

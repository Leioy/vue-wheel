<template lang="pug">
  .y-row
    slot
</template>

<script>
export default {
  name: 'y-row',
}
</script>

<style lang="scss" scoped>
  .y-row {
    display: flex;
    flex-wrap: wrap;
  }
</style>

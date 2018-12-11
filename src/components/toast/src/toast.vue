<template lang="pug">
  .y-toast
    slot
</template>

<script>
export default {
  name: 'y-taost',
}
</script>

<style lang="scss" scoped>
.y-toast {
  display: inline-flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 50%;
  padding: 0 16px;
  height: 40px;
  line-height: 1.8;
  transform: translateX(-50%);
  font-size: 14px;
  color: #fff;
  background: rgba(0, 0, 0, .75);
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, .5);
  border-radius: 4px;
}
</style>

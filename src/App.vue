<template lang="pug">
  #app
    y-button(icon="settings") 按钮
    y-button(:loading="true") 按钮
    y-button-group
      y-button(icon="left") 上一页
      y-button(icon="right" iconPosition="right") 下一页
</template>

<script>
import YIcon from './components/icon/src/icon'
import YButton from './components/button/src/button'
import YButtonGroup from './components/button/src/button-group'
export default {
  name: 'app',
  components: {
    YIcon,
    YButton,
    YButtonGroup,
  },
}
</script>

<style lang="scss">
#app {
  margin: 30px;
}
</style>

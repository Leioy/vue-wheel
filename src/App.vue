<template lang="pug">
  #app
    y-button(icon="settings") 按钮
    y-button(:loading="true") 按钮
    y-button-group
      y-button(icon="left") 上一页
      y-button(icon="right" iconPosition="right") 下一页
    y-row
      y-col(span="2")
      y-col(span="20" offset="2")
</template>

<script>
import YIcon from './components/icon/src/icon'
import YButton from './components/button/src/button'
import YButtonGroup from './components/button/src/button-group'
import YRow from './components/row/src/row'
import YCol from './components/col/src/col'
export default {
  name: 'app',
  components: {
    YIcon,
    YButton,
    YButtonGroup,
    YRow,
    YCol,
  },
}
</script>

<style lang="scss">
#app {
  margin: 30px;
}
</style>

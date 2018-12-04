<template lang="pug">
  #app
    y-icon(name="settings")
    y-button(:loading="true") 按钮
    y-button(iconPosition="right" icon="settings") 按钮
</template>

<script>
import YIcon from './components/icon/src/icon'
import YButton from './components/button/src/button'
export default {
  name: 'app',
  components: {
    YIcon,
    YButton,
  },
}
</script>

<style lang="scss">
#app {
  margin: 30px;
}
</style>

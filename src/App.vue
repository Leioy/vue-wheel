<template lang="pug">
  #app
    y-icon(name="settings")
</template>

<script>
import YIcon from './components/icon/src/icon'
export default {
  name: 'app',
  components: {
    YIcon,
  },
}
</script>

<style lang="scss">
#app {
  margin: 30px;
}
</style>

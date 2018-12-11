<template lang="pug">
  #app
    y-button(icon="settings") 按钮
    y-button(:loading="true") 按钮
    y-button-group
      y-button(icon="left") 上一页
      y-button(icon="right" iconPosition="right") 下一页
    y-row
      y-col(span="2") 1
      y-col(span="20" offset="2") 2
    y-row(gutter="20")
      y-col(span="2") 1
      y-col(span="22") 2
    y-row(justify="between")
      y-col(span="6")
        div(style="border:1px solid red;height:50px;") 1
      y-col(span="6")
        div(style="border:1px solid red;height:50px;") 2
      y-col(span="6")
        div(style="border:1px solid red;height:50px;") 3
    y-row
      y-col(span="2" :pc="{span:2,offset:2}")
        div(style="border:1px solid red") 1
      y-col(span="22")
        div(style="border:1px solid red") 2
    button(@click="handleClick") click
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
  methods: {
    handleClick () {
      this.$toast('文字', {
        closeButton: {
          text: '知道了',
          callback: () => {
            console.log('用户说他知道了')
          },
        },
      })
    },
  },
}
</script>

<style lang="scss">
#app {
  margin: 30px;
  border: 1px solid #000;
}
</style>

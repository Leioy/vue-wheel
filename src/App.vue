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
    y-collapse(style="marginTop:20px")
      y-collapse-item(title="标题1") 内容1
      y-collapse-item(title="标题2") 内容2
      y-collapse-item(title="标题3") 内容3
</template>

<script>
import YIcon from './components/icon/src/icon'
import YButton from './components/button/src/button'
import YButtonGroup from './components/button/src/button-group'
import YRow from './components/row/src/row'
import YCol from './components/col/src/col'
import YCollapse from './components/collapse/src/collapse'
import YCollapseItem from './components/collapse/src/collapse-item'
export default {
  name: 'app',
  components: {
    YIcon,
    YButton,
    YButtonGroup,
    YRow,
    YCol,
    YCollapse,
    YCollapseItem,
  },
  methods: {
    handleClick () {
      this.$toast(`文字${parseInt(Math.random() * 100)}`, {
        closeButton: {
          text: '知道了',
          callback: () => {
            console.log('用户说他知道了')
          },
        },
        position: 'bottom',
      })
    },
  },
}
</script>

<style lang="scss">
#app {
  margin: 30px;
}
</style>

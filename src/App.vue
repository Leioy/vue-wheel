<template lang="pug">
  #app
    //- y-button(icon="settings") 按钮
    //- y-button(:loading="true") 按钮
    //- y-button-group
    //-   y-button(icon="left") 上一页
    //-   y-button(icon="right" iconPosition="right") 下一页
    //- y-row
    //-   y-col(span="2") 1
    //-   y-col(span="20" offset="2") 2
    //- y-row(gutter="20")
    //-   y-col(span="2") 1
    //-   y-col(span="22") 2
    //- y-row(justify="between")
    //-   y-col(span="6")
    //-     div(style="border:1px solid red;height:50px;") 1
    //-   y-col(span="6")
    //-     div(style="border:1px solid red;height:50px;") 2
    //-   y-col(span="6")
    //-     div(style="border:1px solid red;height:50px;") 3
    //- y-row
    //-   y-col(span="2" :pc="{span:2,offset:2}")
    //-     div(style="border:1px solid red") 1
    //-   y-col(span="22")
    //-     div(style="border:1px solid red") 2
    //- button(@click="handleClick") click
    //- y-collapse(style="marginTop:20px" v-model="value")
    //-   y-collapse-item(title="1") 内容1
    //-   y-collapse-item(title="2") 内容2
    //-   y-collapse-item(title="3") 内容3
    //- y-tabs(value="name1")
    //-   y-tab-pane(label="标题1" name="name1")  标签1的内容
    //-   y-tab-pane(label="标题2" name="name2")  标签2的内容
    //-   y-tab-pane(label="标题3" name="name3")  标签3的内容
    //- p {{selected}}
    //- y-cascader(:data="source" v-model="selected" @on-change="fn")
    y-menu(active-name="article" @on-select="handleMenuSelect" mode="vertical" accordion :open-names="['user','statistics']")
      y-menu-item(name="ddd")
        y-icon(name="settings")
        | ddd
      y-sub-menu(name="content")
        template(slot="title")
          y-icon(name="settings")
          | 内容管理
        y-menu-item(name="article") 文章管理
        y-menu-item(name="comment")  评论管理
        y-menu-item(name="report")  举报管理
      y-sub-menu(name="user")
        template(slot="title") 用户管理
        y-menu-item(name="userAdd") 新增用户
        y-menu-item(name="userActive")  活跃用户
      y-sub-menu(name="statistics")
        template(slot="title") 统计分析
        y-menu-item(name="userKeep") 用户留存
        y-menu-item(name="userLeave")  流失用户
</template>

<script>
import YIcon from './components/icon/src/icon'
import YButton from './components/button/src/button'
import YButtonGroup from './components/button/src/button-group'
import YRow from './components/row/src/row'
import YCol from './components/col/src/col'
import YCollapse from './components/collapse/src/collapse'
import YCollapseItem from './components/collapse/src/collapse-item'
import YTabs from './components/tabs/src/tabs'
import YTabPane from './components/tabs/src/pane'
import YCascader from './components/cascader/src/cascader'
import YMenu from './components/menu/src/menu'
import YMenuItem from './components/menu/src/menu-item'
import YSubMenu from './components/menu/src/sub-menu'
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
    YTabs,
    YTabPane,
    YCascader,
    YMenu,
    YMenuItem,
    YSubMenu,
  },
  data () {
    return {
      value: [1, 2],
      // value: '标题1',
      source: [
        {
          value: 'beijing',
          label: '北京',
          children: [
            {
              value: 'gugong',
              label: '故宫',
            },
            {
              value: 'tiantan',
              label: '天坛',
            },
            {
              value: 'wangfujing',
              label: '王府井',
            },
          ],
        }, {
          value: 'jiangsu',
          label: '江苏',
          children: [
            {
              value: 'nanjing',
              label: '南京',
              children: [
                {
                  value: 'fuzimiao',
                  label: '夫子庙',
                },
              ],
            },
            {
              value: 'suzhou',
              label: '苏州',
              children: [
                {
                  value: 'zhuozhengyuan',
                  label: '拙政园',
                },
                {
                  value: 'shizilin',
                  label: '狮子林',
                },
              ],
            },
          ],
        },
      ],
      selected: ['beijing', 'gugong'],
    }
  },
  methods: {
    handleMenuSelect (val) {
      console.log('val', val)
    },
    fn (val, val2) {
      console.log(val)
      console.log(val2)
    },
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

<template>
  <div id="app">
    <YIcon name="settings"></YIcon>
  </div>
</template>

<script>
import YIcon from './components/icon/icon'
export default {
  name: 'app',
  components: {
    YIcon,
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

<template lang="pug">
  div(:class="classes")
    div(:class="`${prefix}-bar`")
      div(:class="`${prefix}-nav-scroll`")
        div(:class="`${prefix}-nav`" ref="nav")
          div(:class="barClass")
          div(:class="tabClass(tab)" v-for="(tab,index) in navList" :key="index" @click="handleTabChange(tab)") {{tab.label}}
    div(:class="contentClass" :style="contentStyle")
      slot
</template>

<script>
const prefix = 'y-tabs'
export default {
  name: 'y-tabs',
  props: {
    value: {
      type: [String, Number],
    },
    animated: {
      type: Boolean,
      default: true,
    },
  },
  data () {
    return {
      prefix,
      navList: [],
      activeKey: this.value,
      barOffset: 0,
    }
  },
  computed: {
    classes () {
      return [`${prefix}`]
    },
    barClass () {
      return [
        `${prefix}-underline`,
        {
          [`${prefix}-underline-animated`]: this.animated,
        },
      ]
    },
    contentClass () {
      return [
        `${prefix}-content`,
        {
          [`${prefix}-content-animated`]: this.animated,
          [`${prefix}-content-no-animated`]: !this.animated,
        },
      ]
    },
    contentStyle () {
      const index = this.getTabIndex(this.activeKey)
      const p = index === 0 ? 0 : `-${index}00%`
      let style
      if (index > -1) {
        style = {
          transform: `translateX(${p})`,
        }
      }
      return style
    },
  },
  mounted () {
    this.navList = this.getNavList()
    this.updateNav()
  },
  watch: {
    activeKey () {
      this.updateNav()
    },
    value (val) {
      this.activeKey = val
    },
  },
  methods: {
    getNavList () {
      return this.$children.filter(child => child.$options.name === 'y-tab-pane')
    },
    getTabIndex (name) {
      return this.navList.findIndex(nav => nav.name === name)
    },
    /** 设置激活的tab */
    updateBar () {
      const index = this.getTabIndex(this.activeKey)
      this.$nextTick(() => {
        const tabs = this.$refs.nav.querySelectorAll(`.${prefix}-tab`)
        const underline = this.$refs.nav.querySelector(`.${prefix}-underline`)
        const tab = tabs[index]
        const width = tab ? tab.getBoundingClientRect().width : 0
        const gutter = 16
        underline.style.width = width + 'px'
        if (index > 0) {
          let offset = 0
          for (let i = 0; i < index; i++) {
            offset += tabs[i].getBoundingClientRect().width + gutter
          }
          this.barOffset = offset
        } else {
          this.barOffset = 0
        }
        underline.style.transform = `translateX(${this.barOffset}px)`
      })
    },
    /** 设置激活的content */
    updateContent () {
      const tabs = this.getNavList()
      tabs.forEach(tab => {
        tab.show = (this.activeKey === tab.name) || this.animated
      })
    },
    updateNav () {
      this.updateBar()
      this.updateContent()
    },
    handleTabChange (item) {
      this.activeKey = item.name
      this.$emit('input', item.name)
      this.$emit('on-change', item.name)
    },
    tabClass (item) {
      return [
        `${prefix}-tab`,
        {
          [`${prefix}-tab-active`]: item.name === this.activeKey,
        },
      ]
    },
  },
}
</script>

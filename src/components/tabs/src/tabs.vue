<template lang="pug">
  div(:class="classes")
    div(:class="`${prefix}-bar`")
      div(:class="`${prefix}-nav-scroll`")
        div(:class="`${prefix}-nav`" ref="nav")
          div(:class="`${prefix}-underline`")
          div(:class="tabClass(tab)" v-for="(tab,index) in navList" :key="index" @click="handleTabChange(tab)") {{tab.label}}
    div(:class="`${prefix}-content`")
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
  },
  mounted () {
    this.navList = this.getNavList()
    this.updateNav()
  },
  watch: {
    activeKey () {
      this.updateNav()
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
        tab.show = this.activeKey === tab.currentName
      })
    },
    updateNav () {
      this.updateBar()
      this.updateContent()
    },
    handleTabChange (item) {
      this.activeKey = item.name
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

<style lang="scss" scoped>
.y-tabs {
  &-bar {
    border-bottom: 1px solid #dcdee2;
    margin-bottom: 16px;
  }
  &-nav {
    display: inline-flex;
    position: relative;
  }
  &-underline {
    position: absolute;
    height: 2px;
    width: 100%;
    background: #2d8cf0;
    bottom: -1px;
  }
  &-tab {
    padding: 8px 16px;
    margin-right: 16px;
    cursor: pointer;
    color: #515a6e;
    &.y-tabs-tab-active {
      color: #2d8cf0;
    }
  }
  &-content {
    display: flex;
    overflow: hidden;
  }
}

</style>

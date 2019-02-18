<template>
  <div :class="`${prefix}`">
    <span :class="jumpPrevClass" @click="onClickItem(currentPage - 1)">
      <y-icon name="left"></y-icon>
    </span>
    <template v-for="(page,index) in pages">
      <span v-if="page === '...'" :key="index" :class="`${prefix}-separator`">{{page}}</span>
      <span v-else :key="index" :class="classObj(page)" @click="onClickItem(page)">{{page}}</span>
    </template>
    <span :class="jumpNextClass" @click="onClickItem(currentPage + 1)">
      <y-icon name="right"></y-icon>
    </span>
  </div>
</template>

<script>
import YIcon from '../icon/src/icon'
const prefix = 'y-pager'
function uniqueArray (arr) {
  const obj = {}
  arr.forEach(number => {
    obj[number] = true
  })
  return Object.keys(obj).map(s => parseInt(s, 10))
}
export default {
  name: prefix,
  components: {
    YIcon,
  },
  props: {
    totalPage: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    hideIfOnePage: {
      type: Boolean,
      default: true,
    },
  },
  data () {
    return {
      prefix,
    }
  },
  computed: {
    pages () {
      let pages = [1, this.totalPage, this.currentPage, this.currentPage - 1, this.currentPage - 2, this.currentPage + 1, this.currentPage + 2]
      const temp = uniqueArray(pages.sort((a, b) => a - b)).filter(page => page >= 1 && page <= this.totalPage)
      const newPages = temp.reduce((prev, current, index) => {
        prev.push(current)
        temp[index + 1] && temp[index + 1] - temp[index] > 1 && prev.push('...')
        return prev
      }, [])
      return newPages
    },
    jumpPrevClass () {
      return [
        `${this.prefix}-jump-prev`,
        { [`${this.prefix}-jump-disabled`]: this.currentPage === 1 },
      ]
    },
    jumpNextClass () {
      return [
        `${this.prefix}-jump-next`,
        { [`${this.prefix}-jump-disabled`]: this.currentPage === this.totalPage },
      ]
    },
  },
  methods: {
    onClickItem (page) {
      if (page >= 1 && page <= this.totalPage) {
        this.$emit('update:currentPage', page)
        this.$emit('on-change', page)
      }
    },
    classObj (page) {
      return [
        `${this.prefix}-item`,
        {
          [`${this.prefix}-item-active`]: page === this.currentPage,
        },
      ]
    },
  },
}
</script>

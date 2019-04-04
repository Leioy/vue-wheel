<template>
  <div style="border: 1px solid red">
    <y-popover position="bottom">
      <y-input></y-input>
      <template slot="content">
        <div :class="`${prefix}-pop`">
          <div :class="`${prefix}-nav`">
            <span><y-icon name="fast-forward"></y-icon></span>
            <span><y-icon name="left"></y-icon></span>
            <span @click="onClickYear">2012年</span>
            <span @click="onClickMonth">月</span>
            <span><y-icon name="right"></y-icon></span>
            <span><y-icon name="fast-back"></y-icon></span>
          </div>
          <div :class="`${prefix}-panels`">
            <div v-if="mode === 'years'" :class="`${prefix}-content`">年</div>
            <div v-else-if="mode === 'months'" :class="`${prefix}-content`">月</div>
            <div v-else :class="`${prefix}-content`">
              <!-- <div v-for="(day,index) in visibleDays.splice(0,7)" :key="index">{{day.getDate()}}</div> -->
              <div :class="`${prefix}-weekdays`">
                <span v-for="(week,index) in weekdays" :key="index">{{week}}</span>
              </div>
              <div :class="`${prefix}-row`" v-for="i in [1,2,3,4,5,6]" :key="i">
                <span :class="`${prefix}-col`" v-for="j in [1,2,3,4,5,6,7]" :key="j">
                  {{visibleDays[(i - 1) * 7 + j - 1].getDate()}}
                </span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </y-popover>
  </div>
</template>

<script>
import YInput from '../input/input'
import YPopover from '../popover/popover'
import helper from './helper.js'
const prefix = 'y-date-picker'
export default {
  name: prefix,
  components: {
    YInput,
    YPopover,
  },
  data () {
    return {
      prefix,
      mode: 'days',
      value: new Date(),
      weekdays: ['日', '一', '二', '三', '四', '五', '六'],
    }
  },
  mounted () {
  },
  computed: {
    visibleDays () {
      const date = this.value
      const first = helper.firstDayOfMonth(date)
      const last = helper.lastDayOfMonth(date)
      const array = []
      const [year, month] = helper.getYearMonthDate(date)
      for (let i = first.getDate(); i <= last.getDate(); i++) {
        array.push(new Date(year, month, i))
      }
      // first.getDay() 表示星期几 范围是0-6，0表示星期天
      const n = first.getDay() === 0 ? 6 : first.getDay() - 1
      let array2 = []
      for (let i = 0; i <= n; i++) {
        array2.push(new Date(year, month, -i))
      }
      array2 = array2.reverse()
      const m = 42 - array.length - array2.length
      const array3 = []
      for (let i = 1; i <= m; i++) {
        array3.push(new Date(year, month + 1, i))
      }
      const array4 = [...array2, ...array, ...array3]
      console.log(array4)
      return array4
    },
  },
  methods: {
    onClickYear () {
      this.mode = 'years'
    },
    onClickMonth () {
      this.mode = 'months'
    },
  },
}
</script>

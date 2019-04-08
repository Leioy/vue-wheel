<template>
  <div :class="`${prefix}`" style="border: 1px solid red">
    <y-popover position="bottom" :styleObj="styleObj">
      <y-input :value="formatedDay"></y-input>
      <template slot="content">
        <div :class="`${prefix}-pop`">
          <div :class="`${prefix}-nav`">
            <span :class="[`${prefix}-forward`,`${prefix}-button`]" @click="onClickPrevYear"><y-icon name="fast-forward"></y-icon></span>
            <span :class="[`${prefix}-left`,`${prefix}-button`]" @click="onClickPrevMonth"><y-icon name="left"></y-icon></span>
            <span >
              <span :class="`${prefix}-button`" @click="onClickYear">{{display.year}}年</span>
              <span :class="`${prefix}-button`" @click="onClickMonth">{{display.month + 1}}月</span>
            </span>
            <span :class="[`${prefix}-back`,`${prefix}-button`]" @click="onClickNextYear"><y-icon name="fast-back"></y-icon></span>
            <span :class="[`${prefix}-right`,`${prefix}-button`]" @click="onClickNextMonth"><y-icon name="right"></y-icon></span>
          </div>
          <div :class="`${prefix}-panels`">
            <div v-if="mode === 'years'" :class="`${prefix}-content`">年</div>
            <div v-else-if="mode === 'months'" :class="`${prefix}-content`">月</div>
            <div v-else :class="`${prefix}-content`">
              <!-- <div v-for="(day,index) in visibleDate.splice(0,7)" :key="index">{{day.getDate()}}</div> -->
              <div :class="`${prefix}-weekdays`">
                <span v-for="(week,index) in weekdays" :key="index">{{week}}</span>
              </div>
              <div :class="`${prefix}-row`" v-for="i in [1,2,3,4,5,6]" :key="i">
                <span :class="[`${prefix}-cell`,{current:isDayOfCurrentMonth(visibleDay(i,j))}]" v-for="j in [1,2,3,4,5,6,7]" :key="j" @click="onClickCell(visibleDay(i,j))">
                  {{visibleDay(i,j).getDate()}}
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
    const [year, month] = helper.getYearMonthDate(this.value)
    return {
      prefix,
      mode: 'days',
      weekdays: ['日', '一', '二', '三', '四', '五', '六'],
      display: { year, month },
    }
  },
  props: {
    value: {
      type: Date,
      default: () => new Date(),
    },
  },
  mounted () {
  },
  computed: {
    styleObj () {
      return {
        padding: 0,
      }
    },
    visibleDate () {
      // const date = this.value
      const date = new Date(this.display.year, this.display.month, 1)
      const first = helper.firstDayOfMonth(date)
      const array = []
      const n = first.getDay()
      const x = first - n * 3600 * 24 * 1000
      for (let i = 0; i < 42; i++) {
        array.push(new Date(x + i * 3600 * 24 * 1000))
      }
      return array
    },
    formatedDay () {
      const [year, month, day] = helper.getYearMonthDate(this.value)
      return `${year}-${month + 1}-${day}`
    },
  },
  methods: {
    onClickYear () {
      this.mode = 'years'
    },
    onClickMonth () {
      this.mode = 'months'
    },
    visibleDay (row, col) {
      return this.visibleDate[(row - 1) * 7 + col - 1]
    },
    onClickCell (date) {
      this.$emit('input', date)
      this.display.month = date.getMonth()
      this.display.year = date.getFullYear()
      console.log(new Date(date))
    },
    // 判断是否属于当前月份
    isDayOfCurrentMonth (date) {
      const [year1, month1] = helper.getYearMonthDate(date)
      return year1 === this.display.year && month1 === this.display.month
    },
    onClickPrevYear () {
      const oldDate = new Date(this.display.year, this.display.month)
      const newDate = helper.addYear(oldDate, -1)
      const [year, month] = helper.getYearMonthDate(newDate)
      this.display = { year, month }
    },
    onClickPrevMonth () {
      const oldDate = new Date(this.display.year, this.display.month)
      const newDate = helper.addMonth(oldDate, -1)
      const [year, month] = helper.getYearMonthDate(newDate)
      this.display = { year, month }
    },
    onClickNextMonth () {
      const oldDate = new Date(this.display.year, this.display.month)
      const newDate = helper.addMonth(oldDate, 1)
      const [year, month] = helper.getYearMonthDate(newDate)
      this.display = { year, month }
    },
    onClickNextYear () {
      const oldDate = new Date(this.display.year, this.display.month)
      const newDate = helper.addYear(oldDate, 1)
      const [year, month] = helper.getYearMonthDate(newDate)
      this.display = { year, month }
    },
  },
}
</script>

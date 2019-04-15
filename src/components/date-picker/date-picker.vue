<template>
  <div :class="`${prefix}`" v-click-outside="close">
    <div :class="classObj">
      <input type="text" :class="`${prefix}-input`" :value="formatedValue" @click="onClickInput" placeholder="select date">
      <span :class="`${prefix}-icon`">
        <y-icon name="date"></y-icon>
        <y-icon name="delete" v-show="closeVisible" @click.native="onClickClose"></y-icon>
      </span>
    </div>
    <div :class="`${prefix}-pop`" v-show="dateVisible">
      <div :class="`${prefix}-nav`">
            <span :class="[`${prefix}-forward`,`${prefix}-button`]" @click="onClickPrevYear"><y-icon name="fast-forward"></y-icon></span>
            <span :class="[`${prefix}-left`,`${prefix}-button`]" @click="onClickPrevMonth" v-show="mode === 'days'"><y-icon name="left"></y-icon></span>
            <span>
              <span :class="`${prefix}-button`" @click="onClickYear" v-show="mode === 'days'">{{display.year}}年</span>
              <span :class="`${prefix}-button`"  v-show="mode ==='year'">{{yearList[0]}}年- {{yearList[yearList.length-1]}}年</span>
              <span :class="`${prefix}-button`" @click="onClickMonth" v-show="mode === 'days'">{{display.month + 1}}月</span>
              <span :class="`${prefix}-button`"  v-show="mode === 'month'" @click="mode = 'year'">{{displayCopy.year}}年</span>
            </span>
            <span :class="[`${prefix}-back`,`${prefix}-button`]" @click="onClickNextYear"><y-icon name="fast-back"></y-icon></span>
            <span :class="[`${prefix}-right`,`${prefix}-button`]" @click="onClickNextMonth" v-show="mode === 'days'"><y-icon name="right"></y-icon></span>
          </div>
          <div :class="`${prefix}-panels`">
            <div :class="`${prefix}-content`">
              <template v-if="mode === 'year'">
                <span :class="`${prefix}-cell-year`" v-for="(year,index) in yearList" :key="index" @click="onSelectYear(year)">{{year}}</span>
              </template>
              <template v-else-if="mode === 'month'">
                <span :class="`${prefix}-cell-month`" v-for="(month,index) in [0,1,2,3,4,5,6,7,8,9,10,11]" :key="index" @click="onSelectMonth(month)">{{monthList[month]}}</span>
              </template>
              <template v-else>
                <div :class="`${prefix}-weekdays`">
                  <span v-for="(week,index) in weekdays" :key="index">{{week}}</span>
                </div>
                <div :class="`${prefix}-row`" v-for="i in [1,2,3,4,5,6]" :key="i">
                  <span :class="[`${prefix}-cell`,{current:isDayOfCurrentMonth(visibleDay(i,j)),selected:isSelected(visibleDay(i,j)),focusd:isFocus(visibleDay(i,j)),today:isToday(visibleDay(i,j))}]" v-for="j in [1,2,3,4,5,6,7]" :key="j" @click="onClickCell(visibleDay(i,j))">
                    {{visibleDay(i,j).getDate()}}
                  </span>
                </div>
                <div :class="`${prefix}-action`">
                  <span @click="onClickToday">Today</span>
                </div>
              </template>
            </div>
          </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from '@/directives/click-outside'
import helper from './helper.js'
const prefix = 'y-date-picker'
export default {
  name: prefix,
  components: {
  },
  directives: { ClickOutside },
  data () {
    const date = this.value ? new Date(this.value) : new Date()
    const [year, month] = helper.getYearMonthDate(date)
    return {
      prefix,
      mode: 'days',
      weekdays: ['日', '一', '二', '三', '四', '五', '六'],
      display: { year, month },
      displayCopy: { year, month },
      yearBase: 0,
      monthList: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      dateVisible: false,
      timeout: null,
      formatedValue: '',
      selectedDate: '',
      focusdValue: '',
    }
  },
  props: {
    value: {
      type: String,
    },
  },
  computed: {
    classObj () {
      return [
        `${this.prefix}-wrapper`,
        { [`${prefix}-show-clear`]: this.closeVisible },
      ]
    },
    closeVisible () {
      return !!this.formatedValue
    },
    yearList () {
      const arr = []
      for (let i = 0; i < 12; i++) {
        arr.unshift(this.display.year - i + this.yearBase)
      }
      return arr
    },
    styleObj () {
      return {
        padding: 0,
      }
    },
    visibleDate () {
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
  },
  created () {
    if (this.value) {
      const [y, m, d] = helper.getYearMonthDate(new Date(this.value))
      this.formatedValue = `${y}-${m + 1}-${d}`
      this.selectedDate = new Date(this.value)
    }
  },
  methods: {
    onClickClose () {
      this.formatedValue = ''
      this.selectedDate = ''
      this.dateVisible = false
      const [year, month] = helper.getYearMonthDate(new Date())
      this.display = { year, month }
    },
    close () {
      this.dateVisible = false
    },
    onClickInput () {
      this.dateVisible = true
      this.mode = 'days'
    },
    onClickYear () {
      this.mode = 'year'
      this.yearBase = 0
    },
    onClickMonth () {
      this.mode = 'month'
      this.displayCopy = { ...this.display }
    },
    visibleDay (row, col) {
      return this.visibleDate[(row - 1) * 7 + col - 1]
    },
    onClickCell (date) {
      this.selectedDate = date
      this.focusdValue = date
      const value = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      this.formatedValue = value
      this.$emit('on-change', date, value)
      this.$emit('input', value)
      this.display.month = date.getMonth()
      this.display.year = date.getFullYear()
      this.dateVisible = false
    },
    // 判断是否属于当前月份
    isDayOfCurrentMonth (date) {
      const [year1, month1] = helper.getYearMonthDate(date)
      return year1 === this.display.year && month1 === this.display.month
    },
    isSelected (date) {
      if (!this.selectedDate) {
        return false
      }
      const [y, m, d] = helper.getYearMonthDate(date)
      const [y2, m2, d2] = helper.getYearMonthDate(this.selectedDate)
      return y === y2 && m === m2 && d === d2
    },
    isFocus (date) {
      if (!this.focusdValue) {
        return false
      }
      const [y, m, d] = helper.getYearMonthDate(date)
      const [y2, m2, d2] = helper.getYearMonthDate(this.focusdValue)
      return y === y2 && m === m2 && d === d2
    },
    isToday (date) {
      const [y, m, d] = helper.getYearMonthDate(date)
      const [y2, m2, d2] = helper.getYearMonthDate(new Date())
      return y === y2 && m === m2 && d === d2
    },
    onClickPrevYear () {
      if (this.mode === 'days') {
        const oldDate = new Date(this.display.year, this.display.month)
        const newDate = helper.addYear(oldDate, -1)
        const [year, month] = helper.getYearMonthDate(newDate)
        this.display = { year, month }
      } else if (this.mode === 'month') {
        const oldDate = new Date(this.displayCopy.year, this.displayCopy.month)
        const newDate = helper.addYear(oldDate, -1)
        const [year, month] = helper.getYearMonthDate(newDate)
        this.displayCopy = { year, month }
      } else {
        this.yearBase -= 10
      }
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
      if (this.mode === 'days') {
        const oldDate = new Date(this.display.year, this.display.month)
        const newDate = helper.addYear(oldDate, 1)
        const [year, month] = helper.getYearMonthDate(newDate)
        this.display = { year, month }
      } else if (this.mode === 'month') {
        const oldDate = new Date(this.displayCopy.year, this.displayCopy.month)
        const newDate = helper.addYear(oldDate, 1)
        const [year, month] = helper.getYearMonthDate(newDate)
        this.displayCopy = { year, month }
      } else {
        this.yearBase += 10
      }
    },
    onSelectYear (year) {
      this.display.year = year
      this.mode = 'days'
    },
    onSelectMonth (month) {
      this.display.month = month
      this.display.year = this.displayCopy.year
      this.mode = 'days'
    },
    onClickToday () {
      this.selectedDate = new Date()
      this.focusdValue = new Date()
      const [year, month, day] = helper.getYearMonthDate(new Date())
      this.display = { year, month }
      const value = `${year}-${month + 1}-${day}`
      this.formatedValue = value
      this.$emit('input', value)
      this.dateVisible = false
    },
  },
}
</script>

<template>
  <div :class="`${prefix}`" style="border: 1px solid red">
    <y-popover position="bottom" :styleObj="styleObj">
      <y-input></y-input>
      <template slot="content">
        <div :class="`${prefix}-pop`">
          <div :class="`${prefix}-nav`">
            <span :class="[`${prefix}-forward`,`${prefix}-button`]"><y-icon name="fast-forward"></y-icon></span>
            <span :class="[`${prefix}-left`,`${prefix}-button`]"><y-icon name="left"></y-icon></span>
            <span >
              <span :class="`${prefix}-button`" @click="onClickYear">2012年</span>
              <span :class="`${prefix}-button`" @click="onClickMonth">9月</span>
            </span>
            <span :class="[`${prefix}-right`,`${prefix}-button`]"><y-icon name="right"></y-icon></span>
            <span :class="[`${prefix}-back`,`${prefix}-button`]"><y-icon name="fast-back"></y-icon></span>
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
    styleObj () {
      return {
        padding: 0,
      }
    },
    visibleDays () {
      const date = this.value
      const first = helper.firstDayOfMonth(date)
      const array = []
      const n = first.getDay()
      const x = first - (n === 0 ? 6 : n) * 3600 * 24 * 1000
      for (let i = 0; i < 42; i++) {
        array.push(new Date(x + i * 3600 * 24 * 1000))
      }
      return array
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

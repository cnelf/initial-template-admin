<template>
  <div class="lunar-calendar">
    <div class="turn-date">
      <i class="el-icon-d-arrow-left icon" @click="handlePreviousYear"></i>
      <i class="el-icon-arrow-left icon" @click="handlePreviousMonth"></i>
      <div class="y-m">{{ currentTime | formatTime('YYYY 年 MM 月') }}</div>
      <i class="el-icon-arrow-right icon" @click="handleNextMonth"></i>
      <i class="el-icon-d-arrow-right icon" @click="handleNextYear"></i>
    </div>
    <div class="calendar-content">
      <div class="calendar-week">
        <span v-for="(item, index) in weekText" :key="index" class="week-text">{{ item }}</span>
      </div>
      <div class="panel-list">
        <template v-for="(day, index) in calendarList">
          <el-tooltip
            :key="index"
            effect="light"
            placement="top"
            :content="isSpecialDay(day.time)[0] && isSpecialDay(day.time)[0].eventName"
            :disabled="!(isSpecialDay(day.time).length > 0 && isSpecialDay(day.time)[0].eventName.length > 4)"
          >
            <div class="common-day" :style="setDayStyle(day.time)">
              <div :class="getDayClass(day.time)" class="mt-8px">{{ day.lunar.cDay }}</div>
              <template v-if="isSpecialDay(day.time).length > 0">
                <div
                  v-if="isSpecialDay(day.time)[0].type === 0"
                  :style="specialBg(isSpecialDay(day.time)[0])"
                  class="special-toast common-toast"
                >
                  {{ isSpecialDay(day.time)[0].eventName }}
                </div>
                <div v-else class="special-dot" :style="specialBg(isSpecialDay(day.time)[0])"></div>
              </template>
              <template v-else-if="isSameYMD(day.time, nowTime)">
                <div class="now-date common-toast">今天</div>
              </template>
              <template v-else>
                <div class="lunar">{{ day.lunar.festival || day.lunar.IDayCn }}</div>
              </template>
            </div>
          </el-tooltip>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import { calendar } from '@/vendor/lunar';
  import { SPECIAL_DAY_LIST } from './constants';
  import { getYearMonthDay, isSameYM, isSameYMD, getPointDay } from '@/utils';

  export default {
    name: 'LunarCalendar',

    props: {
      specialDayList: {
        type: Array,
        default: () => SPECIAL_DAY_LIST
      },
      nowTime: {
        type: Date,
        default: () => new Date()
      }
    },

    data() {
      return {
        currentTime: '',
        weekText: ['一', '二', '三', '四', '五', '六', '日']
      };
    },

    computed: {
      calendarList() {
        const { y, m } = getYearMonthDay(this.currentTime);
        const currentMonthFirstDay = getPointDay(y, m - 1, 1);
        const currentDayWeek = new Date(currentMonthFirstDay).getDay() || 7;
        const panelFirstDay = new Date(currentMonthFirstDay) - (currentDayWeek - 1) * 86400000;
        const dayList = [];
        for (let i = 0; i < 42; i++) {
          const time = new Date(panelFirstDay).getTime() + i * 86400000;
          const { y, m, d } = getYearMonthDay(time);
          const params = { time: new Date(time).getTime(), lunar: calendar.solar2lunar(y, m, d) };
          dayList.push(params);
        }
        return dayList;
      }
    },

    created() {
      this.currentTime = this.nowTime;
    },

    methods: {
      isSameYMD,

      randomColor() {
        return `#${`00000${((Math.random() * 0x1000000) << 0).toString(16)}`.substr(-6)}`;
      },

      // 设置特定背景颜色
      specialBg(day) {
        const color = this.randomColor();
        return { background: day.bgColor ? day.bgColor : color };
      },

      // 设置特定上边框
      setDayStyle(date) {
        const day = this.isSpecialDay(date);
        if (day.length > 0) {
          const c = this.randomColor();
          const color = day[0].bgColor ? day[0].bgColor : c;
          return {
            'border-top': `1px solid ${color}`,
            cursor: day[0].eventName.length > 4 ? 'pointer' : ''
          };
        }
        if (isSameYMD(date, this.nowTime)) {
          return { 'border-top': '1px solid var(--color-primary)' };
        }
        return '';
      },

      // 设置日期文本颜色
      getDayClass(date) {
        if (isSameYMD(date, this.nowTime)) {
          return 't-theme';
        }
        if (isSameYM(date, this.currentTime)) {
          return '';
        }
        return 'previous-date';
      },

      // 是否是特定假日
      isSpecialDay(date) {
        const day = this.specialDayList.filter((item) => {
          const y = item.eventTime.toString().slice(0, 4);
          const m = item.eventTime.toString().slice(4, 6);
          const d = item.eventTime.toString().slice(6, 8);
          const time = new Date(y, m - 1, d).getTime();
          return time === date;
        });
        return day;
      },

      // 上一年
      handlePreviousYear() {
        const { y, m } = getYearMonthDay(this.currentTime);
        const d = getPointDay(y, m - 1, 1);
        d.setFullYear(d.getFullYear() - 1);
        this.currentTime = d;
        this.$emit('changeYear', this.currentTime);
      },

      // 上一月
      handlePreviousMonth() {
        const { y, m } = getYearMonthDay(this.currentTime);
        const d = getPointDay(y, m - 1, 1);
        d.setMonth(d.getMonth() - 1);
        this.currentTime = d;
      },

      // 下一月
      handleNextMonth() {
        const { y, m } = getYearMonthDay(this.currentTime);
        const d = getPointDay(y, m - 1, 1);
        d.setMonth(d.getMonth() + 1);
        this.currentTime = d;
      },

      // 下一年
      handleNextYear() {
        const { y, m } = getYearMonthDay(this.currentTime);
        const d = getPointDay(y, m - 1, 1);
        d.setFullYear(d.getFullYear() + 1);
        this.currentTime = d;
        this.$emit('changeYear', this.currentTime);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .lunar-calendar {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 24px;
    width: 544px;
    background: #fff;

    .turn-date {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 8px;
      height: 30px;

      .icon {
        margin-left: 5px;
        color: #999;
        cursor: pointer;

        &:hover {
          color: var(--color-primary);
        }
      }

      .y-m {
        margin-left: 10px;
        font-size: 18px;
        font-weight: 400;
        line-height: 18px;
        color: #999;
      }
    }

    .calendar-content {
      display: flex;
      flex: 1;
      flex-direction: column;
      width: 100%;

      .calendar-week {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 50px;

        .week-text {
          display: flex;
          flex: 1;
          justify-content: center;
          align-items: center;
          height: 100%;
          font-size: 18px;
          font-weight: bold;
          color: var(--color-primary);
        }
      }

      .panel-list {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-gap: 0 8px;
        width: 100%;

        .common-day {
          display: flex;
          flex-direction: column;
          align-items: center;
          box-sizing: border-box;
          border-top: 1px solid #eee;
          padding-bottom: 6px;
        }

        .common-date {
          font-size: 14px;
          font-weight: 400;
          color: #333;
        }

        .previous-date {
          color: #cecece;
        }

        .common-toast {
          margin-top: 8px;
          border-radius: 8px 8px 8px 8px;
          font-size: 12px;
          font-weight: 400;
          word-break: break-all;
          color: #fff;
        }

        .special-toast {
          display: block;
          flex-shrink: 0;
          overflow: hidden;
          box-sizing: border-box;
          padding: 0 5px;
          width: 100%;
          height: 16px;
          line-height: 16px;
          text-align: center;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .special-dot {
          margin-top: 14px;
          border-radius: 50%;
          width: 8px;
          height: 8px;
        }

        .now-date {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 48px;
          height: 16px;
          background: var(--color-primary);
        }

        .lunar {
          margin-top: 10px;
          font-size: 12px;
          font-weight: 400;
          color: #cecece;
        }
      }
    }
  }
</style>

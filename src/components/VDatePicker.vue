<template>
  <div class="v_date_picker">
    <div class="date_picker_header">
      <VIcon name="arrow-back" @click="step(-1)" class="date_picker_arrow"/>
      {{ months[date.month] }}
      {{ date.year }}
      <VIcon name="arrow-forward" @click="step(+1)" class="date_picker_arrow"/>
    </div>
    <table>
      <thead>
        <tr>
          <th v-for="weekday in weekdays" :key="weekday" class="date_picker_weekday">{{ weekday }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="week in Array.from({ length: weekNumber }, (_, index) => index)" :key="week">
          <td
            v-for="day in Array.from({ length: 7 }, (_, index) => week * 7 + index)"
            :key="day"
            :class="['date_picker_cell', { marked: isMarked(day), selected: isSelected(day), disabled: isOutOfMonth(day) || !isAllowedDate(day) }]"
            @click="select(day)"
          >
            {{ indexToDate(day) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import VIcon from './VIcon'

export default {
  name: 'VDatePicker',
  components: {
    VIcon
  },
  props: {
    allowedDates: {
      type: Function,
      default: null
    },
    markedDates: {
      type: Function,
      default: null
    }
  },
  data () {
    const current = new Date()
    return {
      weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      date: {
        year: current.getFullYear(),
        month: current.getMonth()
      },
      selected: {},
      offset: 0,
      limit: 0,
      prevLimit: 0
    }
  },
  computed: {
    weekNumber () {
      return Math.ceil((this.offset + this.limit) / 7)
    }
  },
  watch: {
    date: {
      immediate: true,
      deep: true,
      handler () {
        const firstDay = new Date(this.date.year, this.date.month)
        this.offset = firstDay.getDay()
        const lastDay = new Date(this.date.year, this.date.month + 1, 0)
        this.limit = lastDay.getDate()
        const prevLastDay = new Date(this.date.year, this.date.month, 0)
        this.prevLimit = prevLastDay.getDate()
      }
    }
  },
  methods: {
    indexToDate (index) {
      const date = index - this.offset + 1
      if (date < 1) {
        return date + this.prevLimit
      } else if (date > this.limit) {
        return date - this.limit
      } else {
        return date
      }
    },
    indexToMonth (index) {
      if (this.isBeforeMonth(index)) {
        return (this.date.month - 1 + 12) % 12
      } else if (this.isAfterMonth(index)) {
        return (this.date.month + 1) % 12
      } else {
        return this.date.month
      }
    },
    indexToYear (index) {
      if (this.isBeforeMonth(index) && this.date.month === 0) {
        return this.date.year - 1
      } else if (this.isAfterMonth(index) && this.date.month === 11) {
        return this.date.year + 1
      } else {
        return this.date.year
      }
    },
    step (step) {
      this.date.year = this.date.year + Math.floor((this.date.month + step) / 12)
      this.date.month = (this.date.month + step + 12) % 12
    },
    select (index) {
      if (!this.isOutOfMonth(index) && this.isAllowedDate(index)) {
        this.selected = {
          year: this.date.year,
          month: this.date.month,
          day: index - this.offset + 1
        }
        this.$emit('input', this.selected)
      }
    },
    isMarked (index) {
      if (this.markedDates) {
        return this.markedDates({ year: this.indexToYear(index), month: this.indexToMonth(index), day: this.indexToDate(index) })
      } else {
        return false
      }
    },
    isAllowedDate (index) {
      if (this.allowedDates) {
        return this.allowedDates({ year: this.indexToYear(index), month: this.indexToMonth(index), day: index - this.offset + 1 })
      } else {
        return true
      }
    },
    isBeforeMonth (index) {
      return index < this.offset
    },
    isAfterMonth (index) {
      return index >= this.limit + this.offset
    },
    isOutOfMonth (index) {
      return this.isBeforeMonth(index) || this.isAfterMonth(index)
    },
    isSelected (index) {
      const date = index - this.offset + 1
      return this.indexToYear(index) === this.selected.year && this.indexToMonth(index) === this.selected.month && date === this.selected.day
    }
  }
}
</script>

<style scoped>
.v_date_picker {
  display: inline-block;
}
.date_picker_arrow {
  fill: #d34827;
  width: 24px;
  height: 24px;
}
.date_picker_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.date_picker_weekday {
  padding: 3px;
}
.date_picker_cell {
  position: relative;
  text-align: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
}
.date_picker_cell.selected {
  background-color: #d34827;
  border-radius: 50%;
  color: white;
}
.date_picker_cell.disabled {
  color: grey;
}
.date_picker_cell.marked::before {
  content: '';
  position: absolute;
  bottom: 3px;
  left: calc(50% - 5px / 2);
  display: block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #d34827;
}
.date_picker_cell.selected.marked::before {
  background-color: white;
}
</style>

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
        <tr v-for="week in [0, 1, 2, 3, 4, 5]" :key="week">
          <td
            v-for="day in [0, 1, 2, 3, 4, 5, 6]"
            :key="day"
            :class="['date_picker_cell', { selected: isSelected(week * 7 + day), disabled: week * 7 + day < offset || week * 7 + day >= limit + offset }]"
            @click="select(week * 7 + day)"
          >
            {{ indexToDate(week * 7 + day) }}
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
    step (step) {
      this.date.year = this.date.year + Math.floor((this.date.month + step) / 12)
      this.date.month = (this.date.month + step + 12) % 12
    },
    select (index) {
      const date = index - this.offset + 1
      if (date >= 1 && date <= this.limit) {
        this.selected = {
          year: this.date.year,
          month: this.date.month,
          day: date
        }
        this.$emit('input', this.selected)
      }
    },
    isSelected (index) {
      const date = index - this.offset + 1
      return this.date.year === this.selected.year && this.date.month === this.selected.month && date === this.selected.day
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
</style>

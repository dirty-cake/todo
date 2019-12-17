<template>
  <div class="v_date_picker">
    <div>
      <button @click="prev">prev</button>
      {{ months[date.month] }}
      {{ date.year }}
      <button @click="next">next</button>
    </div>
    <table>
      <thead>
        <tr>
          <th v-for="weekday in weekdays" :key="weekday">{{ weekday }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="week in [0, 1, 2, 3, 4, 5]" :key="week">
          <td v-for="day in [0, 1, 2, 3, 4, 5, 6]" :key="day">{{ indexToDate(week * 7 + day)  }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'VDatePicker',
  data () {
    const current = new Date()
    return {
      weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      current,
      date: {
        year: current.getFullYear(),
        month: current.getMonth()
      },
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
    next () {
      this.current.setMonth(this.current.getMonth() + 1)
      this.date.year = this.current.getFullYear()
      this.date.month = this.current.getMonth()
    },
    prev () {
      this.current.setMonth(this.current.getMonth() - 1)
      this.date.year = this.current.getFullYear()
      this.date.month = this.current.getMonth()
    }
  }
}
</script>

<style scoped>

</style>

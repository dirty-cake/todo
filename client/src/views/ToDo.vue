<template>
  <div>
    <h3 class="heading">Welcome {{ $persistance.name }}!!!</h3>
    <ul class="list">
      <transition-group name="flip-list">
        <li v-for="(item, index) in todos" :key="item.key" class="list_item">
          <VCollapse>
            <template #header>
              <div class="list_item_header">
                <div class="list_item_content">
                  <input type="checkbox" :value="index" class="checkbox" @change="done(index)">
                  {{ item.name }}
                </div>
                <div class="list_item_controls">
                  <VButton @click="deleteMe(item.key)" theme="red">Delete me</VButton>
                </div>
              </div>
            </template>
            <template #default>
              <div>
                {{ item.description ? item.description : 'No description' }}
              </div>
              <div>
                {{ item.date.day }}
                {{ months[item.date.month] }}
                {{ item.date.year }}
              </div>
            </template>
          </VCollapse>
        </li>
        <li v-for="(item, index) in dones" :key="item.key" class="list_item">
          <VCollapse>
            <template #header>
              <div class="list_item_header">
                <div class="list_item_content">
                  <input type="checkbox" :value="index" class="checkbox" @change="undone(index)" checked>
                  <span class="strike">{{ item.name }}</span>
                </div>
                <div class="list_item_controls">
                  <VButton @click="deleteMe(item.key)" theme="red">Delete me</VButton>
                </div>
              </div>
            </template>
            <template #default>
              {{ item.description ? item.description : 'No description' }}
            </template>
          </VCollapse>
        </li>
      </transition-group>
      <li class="list_item">
        <div v-if="showInput" class="list_item_header">
          <div class="list_item_content">
            <VInput v-model="item.name" theme="black" placeholder="Name" @keyup.enter="addToList"/>
            <VInput v-model="item.description" theme="black" placeholder="Description" @keyup.enter="addToList"/>
            <VDatePicker v-model="item.date" :allowed-dates="isAllowedDate" :marked-dates="isMarkedDate"/>
          </div>
          <div class="list_item_controls">
            <VButton @click="addToList" icon="add">Add task</VButton>
          </div>
        </div>
        <VButton v-else @click="showInput = true" icon="add">Add task</VButton>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      items: [
        { name: 'buy coffee', done: false, key: 1, date: { year: 2019, month: 11, day: 24 } },
        { name: 'buy tea', done: false, key: 2, date: { year: 2019, month: 11, day: 13 } }
      ],
      showInput: false,
      search: '',
      item: {
        name: '',
        description: '',
        date: {}
      },
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    }
  },
  computed: {
    todos () {
      return this.filtered.filter(item => {
        return item.done === false
      })
    },
    dones () {
      return this.filtered.filter(item => {
        return item.done === true
      })
    },
    filtered () {
      return this.items.filter(item => {
        return item.name.search(this.search) !== -1
      })
    }
  },
  methods: {
    addToList () {
      if (this.item.name !== '') {
        this.items.push({ name: this.item.name, done: false, key: Date.now(), description: this.item.description, date: this.item.date })
        this.item.name = ''
        this.item.description = ''
        this.showInput = false
        this.date = {}
      }
    },
    deleteMe (key) {
      const index = this.items.findIndex(item => {
        return key === item.key
      })
      this.items.splice(index, 1)
    },
    done (index) {
      this.todos[index].done = true
    },
    undone (index) {
      this.dones[index].done = false
    },
    isAllowedDate (date) {
      const today = new Date()
      if (today.getFullYear() !== date.year) {
        return (today.getFullYear() < date.year)
      } else if (today.getMonth() !== date.month) {
        return (today.getMonth() < date.month)
      } else if (today.getDate() !== date.day) {
        return (today.getDate() < date.day)
      } else {
        return true
      }
    },
    isMarkedDate (date) {
      return this.items.some((item) => {
        return (item.date.year === date.year) && (item.date.month === date.month) && (item.date.day === date.day)
      })
    }
  }
}
</script>

<style scoped>
.input {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid black;
}
.list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.lists {
  display: grid;
  grid-template-columns: 50% 50%;
}
.heading {
  margin-bottom: 10px;
  margin-top: 0;
}
.strike {
  text-decoration: line-through;
}
.list_item {
  border-bottom: 1px solid #ccc;
  padding: 7px 0;
}
.list_item_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.flip-list-move {
  transition: transform .5s ease-in-out;
}
</style>
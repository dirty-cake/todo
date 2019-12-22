<template>
  <div id="app">
    <header class="header">
      <div class="header_content">
        <VInput v-model="search" icon="search" placeholder="Quik find"/>
      </div>
    </header>
    <main class="main">
      <h3 class="heading">ToDo</h3>
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
              <VDatePicker v-model="item.date" :allowed-dates="(date) => date.day % 2 === 0 " :marked-dates="(date) => date.day % 3 === 0 && date.month === 11"/>
            </div>
            <div class="list_item_controls">
              <VButton @click="addToList" icon="add">Add task</VButton>
            </div>
          </div>
          <VButton v-else @click="showInput = true" icon="add">Add task</VButton>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
import VInput from './components/VInput.vue'
import VButton from './components/VButton.vue'
import VCollapse from './components/VCollapse.vue'
import VDatePicker from './components/VDatePicker.vue'

export default {
  components: {
    VInput, VButton, VCollapse, VDatePicker
  },
  data: function () {
    return {
      items: [{ name: 'buy coffee', done: false, key: 1 }, { name: 'buy tea', done: false, key: 2 }],
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
    }
  }
}
</script>

<style>
html, body {
  padding: o;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
.main {
  max-width: 1080px;
  margin: 0 auto;
  padding: 20px 10px;
}
.input {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid black;
}
.header > *{
  margin-right: 10px;
}
.header {
  background-color: #d34827;
  padding: 10px;
}
.header_content {
  max-width: 1080px;
  margin: 0 auto;
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

<template>
  <div>
    <h3 class="heading">Welcome {{ $persistance.name }}!!!</h3>
    <ul class="list">
      <transition-group name="flip-list">
        <li v-for="(item, index) in todos" :key="item.id" class="list_item">
          <VCollapse>
            <template #header>
              <div class="list_item_header">
                <div class="list_item_content">
                  <input type="checkbox" :value="index" class="checkbox" @change="changeDone(item.id, true)">
                  {{ item.name }}
                </div>
                <div class="list_item_controls">
                  <VButton @click="deleteMe(item.id)" theme="red">Delete me</VButton>
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
        <li v-for="(item, index) in dones" :key="item.id" class="list_item">
          <VCollapse>
            <template #header>
              <div class="list_item_header">
                <div class="list_item_content">
                  <input type="checkbox" :value="index" class="checkbox" @change="changeDone(item.id, false)" checked>
                  <span class="strike">{{ item.name }}</span>
                </div>
                <div class="list_item_controls">
                  <VButton @click="deleteMe(item.id)" theme="red">Delete me</VButton>
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
    <div class="pagination">
      <VButton theme="red" @click="pagination.offset -= pagination.limit, getList()">Back</VButton>
      <span>{{ pagination.offset / pagination.limit + 1 }}</span>
      <VButton theme="red" @click="pagination.offset += pagination.limit, getList()">Next</VButton>
    </div>
    <br>
    {{ Math.ceil(count / pagination.limit) }}
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [],
      count: 0,
      pagination: { offset: 0, limit: 10 },
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
  async created () {
    this.getList()
  },
  methods: {
    async getList () {
      try {
        const todos = await this.$fetch(`/todos?offset=${this.pagination.offset}&limit=${this.pagination.limit}`, {
          method: 'GET'
        })
        this.count = todos.count
        this.items = todos.rows
      } catch (error) {
        alert(error.message)
      }
    },
    async addToList () {
      if (this.item.name !== '') {
        try {
          const item = await this.$fetch('/todos', {
            method: 'POST',
            body: { name: this.item.name, description: this.item.description, date: this.item.date }
          })
          this.items.push(item)
          this.item.name = ''
          this.item.description = ''
          this.showInput = false
          this.date = {}
        } catch (error) {
          alert(error.message)
        }
      }
    },
    async deleteMe (todoId) {
      try {
        await this.$fetch(`/todos/${todoId}`, {
          method: 'DELETE'
        })
        const index = this.items.findIndex(item => {
          return todoId === item.id
        })
        this.items.splice(index, 1)
      } catch (error) {
        alert(error.message)
      }
    },
    async changeDone (todoId, done) {
      try {
        const updatedTodo = await this.$fetch(`/todos/${todoId}`, {
          method: 'PATCH',
          body: { done }
        })
        const index = this.items.findIndex(item => item.id === todoId)
        this.$set(this.items, index, updatedTodo)
      } catch (error) {
        alert(error.message)
      }
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
.pagination {
  display: flex;
  justify-content: center;
}
.pagination > * {
  margin-right: 10px
}

</style>

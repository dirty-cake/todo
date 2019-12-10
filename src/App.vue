<template>
  <div id="app">
    <div class="header">
      <input v-model="item" @keyup.enter="addToList" class="input">
      <button @click="addToList" class="button blue">Put on me</button>
      <button @click="deleteMe" class="button red">Delete me</button>
      <button @click="done" class="button">Done</button>
    </div>
    <div class="lists">
      <h3 class="heading">ToDo</h3>
      <h3 class="heading">Done</h3>
      <ul class="list">
        <li v-for="(item, index) in mass" :key="index" class="list_item">
          <input type="checkbox" v-model="selectedElem" :value="index" class="checkbox">
          {{ item }}
        </li>
      </ul>
      <ul class="list">
        <li v-for="(item, index) in doneList" :key="index" class="list_item strike">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      item: '',
      mass: [],
      selectedElem: [],
      doneList: []
    }
  },
  methods: {
    addToList () {
      if (this.item !== '') {
        this.mass.push(this.item)
        this.item = ''
      }
    },
    deleteMe () {
      this.selectedElem.sort().forEach((index, step) => {
        this.mass.splice(index - step, 1)
      })
      this.selectedElem = []
    },
    done () {
      this.selectedElem.sort().forEach((index, step) => {
        const deleted = this.mass.splice(index - step, 1)
        this.doneList.push(...deleted)
      })
      this.selectedElem = []
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
.button {
  background-color: grey;
  border: 1px solid black;
  padding: 10px;
  border-radius: 5px;
}
.button.blue {
  background-color: rgb(46, 233, 240);
}
.button.red {
  background-color: rgb(238, 97, 97);
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
  margin-bottom: 20px;
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
.list_item.strike {
  text-decoration: line-through;
}
</style>

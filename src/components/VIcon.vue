<template>
  <component :is="name" v-on="$listeners"/>
</template>

<script>
import add from '../assets/icons/add.svg'
import search from '../assets/icons/search.svg'
import down from '../assets/icons/down.svg'
export default {
  name: 'VIcon',
  components: {
    add, search, down
  },
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>

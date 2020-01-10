<template>
  <component :is="name" v-on="$listeners"/>
</template>

<script>
import add from '../assets/icons/add.svg'
import search from '../assets/icons/search.svg'
import down from '../assets/icons/down.svg'
import arrowBack from '../assets/icons/arrow_back.svg'
import arrowForward from '../assets/icons/arrow_forward.svg'

export default {
  name: 'VIcon',
  components: {
    add, search, down, arrowBack, arrowForward
  },
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>

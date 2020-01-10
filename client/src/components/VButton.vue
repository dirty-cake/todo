<template>
  <button v-on="$listeners" :class="['button', theme]">
    <VIcon v-if="icon" :name="icon" class="button_icon"/>
    <slot/>
  </button>
</template>

<script>
import VIcon from './VIcon.vue'
export default {
  name: 'VButton',
  props: {
    icon: {
      type: String,
      default: ''
    },
    theme: {
      type: String,
      default: ''
    }
  },
  components: {
    VIcon
  }
}
</script>

<style scoped>
.button {
  display: flex;
  align-items: center;
  color: #d34827;
  background-color: transparent;
  border: none;
  padding: 5px 0;
  outline: none;
  cursor: pointer;
}
.button_icon {
  fill: #d34827;
  height: 26px;
  width: 26px;
  margin-right: 5px;
}
.button.red {
  background-color: #d34827;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
}
.button.red > .button_icon {
  fill: white;
}

</style>

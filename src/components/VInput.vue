<template>
  <div :class="['input_wrapper', theme]">
    <VIcon v-if="icon" :name="icon" class="input_icon"/>
    <input v-on="$listeners" :placeholder="placeholder" v-model="proxy" type="text" class="input">
  </div>
</template>

<script>
import VIcon from './VIcon.vue'

export default {
  name: 'VInput',
  model: {
    event: 'update'
  },
  components: {
    VIcon
  },
  props: {
    icon: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    theme: {
      type: String,
      dafault: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  computed: {
    proxy: {
      get () {
        return this.value
      },
      set (input) {
        this.$emit('update', input)
      }
    }
  }
}
</script>

<style scoped>
.input_wrapper {
  display: flex;
  align-items: center;
}
.input {
  background: transparent;
  border: none;
  outline: none;
  color: white;
}
.input::placeholder {
  color: whitesmoke;
}
.input_icon {
  fill: white;
  width: 20px;
  height: 20px;
}
.input_wrapper.black > .input_icon {
  fill: black;
}
.input_wrapper.black > .input {
  color: black;
}
.input_wrapper.black > .input::placeholder {
  color: black;
}
</style>

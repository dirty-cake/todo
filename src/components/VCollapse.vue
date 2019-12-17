<template>
  <div class="collapse">
    <div class="collapse_header">
      <div>
        <slot name="header"/>
      </div>
      <VIcon @click="showContent = !showContent" name="down" :class="['collapse_icon', { open: showContent }]"/>
    </div>
    <div v-if="showContent" class="collapse_content">
      <slot/>
    </div>
  </div>
</template>

<script>
import VIcon from './VIcon.vue'
export default {
  name: 'VCollapse',
  components: {
    VIcon
  },
  data () {
    return {
      showContent: false
    }
  }
}
</script>

<style scoped>
.collapse {
  width: 100%;
}
.collapse_icon {
  width: 24px;
  height: 24px;
  fill: #d34827;
  transition: transform .3s linear;
}
.collapse_header {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
}
.collapse_icon.open {
  transform: rotate(180deg);
}
</style>

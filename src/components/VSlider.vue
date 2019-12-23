<template>
  <div class="v_slider" @mousedown="start">
    <div class="v_slider_point" :style="{ left: `${position}px` }"/>
  </div>
</template>

<script>
export default {
  name: 'VSlider',
  data () {
    return {
      sliderStartX: 0,
      sliderEndX: 0,
      startX: -1,
      position: 0,
      startPosition: 0
    }
  },
  mounted () {
    const rect = this.$el.getBoundingClientRect()
    this.sliderStartX = rect.x
    this.sliderEndX = rect.x + rect.width
  },
  methods: {
    start (event) {
      console.log(event, this.$el)
      this.position = event.clientX - this.sliderStartX
      this.startX = event.clientX
      this.startPosition = this.position
      document.addEventListener('mousemove', this.move)
      document.addEventListener('mouseup', this.finish)
    },
    move (event) {
      console.log(event.clientX)
      if (this.sliderStartX < event.clientX && this.sliderEndX > event.clientX) {
        this.position = event.clientX - this.startX + this.startPosition
      }
    },
    finish () {
      document.removeEventListener('mousemove', this.move)
      document.removeEventListener('mouseup', this.finish)
    }
  }
}
</script>

<style scoped>
.v_slider {
  position: relative;
  background-color: #dd755c;
  width: 100%;
  height: 2px;
  cursor: pointer;
}
.v_slider_point {
  position: absolute;
  top: -9px;
  background-color: #d34827;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  transform: translateX(-50%)
}
</style>

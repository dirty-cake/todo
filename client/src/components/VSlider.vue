<template>
  <div class="v_slider" @mousedown="start">
    <div class="v_slider_track">
      <div class="v_slider_selected_track" :style="{ width: `${position}px` }"/>
    </div>
    <div class="v_slider_point" :style="{ left: `${position}px` }"/>
  </div>
</template>

<script>
export default {
  name: 'VSlider',
  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    value: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      sliderStartX: 0,
      sliderEndX: 0,
      startX: -1,
      position: 0,
      startPosition: 0
    }
  },
  watch: {
    position () {
      this.$emit('input', Math.round((this.position / (this.sliderEndX - this.sliderStartX)) * (this.max - this.min) + this.min))
    }
  },
  mounted () {
    const rect = this.$el.getBoundingClientRect()
    this.sliderStartX = rect.x
    this.sliderEndX = rect.x + rect.width
    this.position = ((this.value - this.min) / (this.max - this.min)) * rect.width
  },
  methods: {
    start (event) {
      this.position = event.clientX - this.sliderStartX
      this.startX = event.clientX
      this.startPosition = this.position
      document.addEventListener('mousemove', this.move)
      document.addEventListener('mouseup', this.finish)
    },
    move (event) {
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
  cursor: pointer;
  padding: 5px 0;
}
.v_slider_point {
  position: absolute;
  top: 50%;
  background-color: #d34827;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  transform: translate(-50%, -50%)
}
.v_slider_selected_track {
  background-color:  #d34827;
  height: 2px;
}
.v_slider_track {
  background-color: #c29d94;
  width: 100%;
  height: 2px;
}
</style>

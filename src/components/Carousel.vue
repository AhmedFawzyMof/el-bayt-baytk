<template>
  <div class="carousel">
    <div
      class="slides"
      :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
    >
      <div class="slide" v-for="(slide, index) in slides" :key="index">
        <p>{{ slide }}</p>
      </div>
    </div>
  </div>
  <button @click="previousSlide">Previous</button>
  <button @click="nextSlide">Next</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Carousel",
  props: {
    autoplay: Boolean,
    interval: Number,
  },
  data() {
    return {
      slides: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      currentSlide: 0,
      slideInterval: null as NodeJS.Timeout | null,
    };
  },
  computed: {
    currentSlideItem() {
      return this.slides[this.currentSlide];
    },
  },
  methods: {
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    },
    previousSlide() {
      this.currentSlide =
        (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    },
    startSlideShow() {
      this.slideInterval = setInterval(this.nextSlide, this.interval);
    },
    stopSlideShow() {
      clearInterval(this.slideInterval as unknown as number);
    },
  },
  mounted() {
    if (this.autoplay) {
      this.startSlideShow();
    }
  },
});
</script>
<style scoped>
.carousel {
  width: 100%;
  overflow: hidden;
}

.slides {
  display: flex;
  transition: transform 0.3s ease-in-out;
}

.slide {
  flex: 0 0 100%;
  text-align: center;
}
</style>

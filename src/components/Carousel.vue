<template>
  <div class="carousel">
    <div
      class="slides"
      :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
    >
      <div class="slide" v-for="slide in slides" :key="slide.id">
        <img
          :src="'https://h-a-stroe-backend.onrender.comassets' + slide.image"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { IonIcon } from "@ionic/vue";
import { defineComponent } from "vue";

interface Slide {
  id: number;
  image: string;
}

export default defineComponent({
  name: "Carousel",
  props: {
    autoplay: Boolean,
    interval: Number,
  },
  components: {
    IonIcon,
  },
  data() {
    return {
      slides: [] as Slide[],
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
    async GetOffers() {
      let response = await fetch(
        "https://h-a-stroe-backend.onrender.comoffers"
      );
      let dataOffer = await response.json();
      this.slides = dataOffer.Offers;
      console.log(dataOffer);
    },
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
    this.GetOffers();
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
  margin: 15px 0;
}

.slide {
  flex: 0 0 100%;
  text-align: center;
  height: 175px;
  overflow: hidden;
}

.slide img {
  height: 100%;
  width: 95%;
  border-radius: 10px;
}
</style>

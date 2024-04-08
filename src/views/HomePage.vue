<template>
  <ion-page>
    <ion-alert
      :is-open="isOpen"
      header="Error While Geting Data"
      sub-header="Please Wait"
      message="Please Wait For A Moment and Try Again"
      :buttons="alertButtons"
    ></ion-alert>
    <Header pagename="El Bayt Baytk"></Header>
    <ion-content class="homePage">
      <div class="carousel">
        <div
          class="slides"
          :style="{ transform: `translateX(-${state.currentSlide * 100}%)` }"
        >
          <div class="slide" v-for="slide in state.Carousel" :key="slide.id">
            <img :src="slide.image" />
          </div>
        </div>
        <button @click="nextSlide()" class="nextBtn">
          <i class="bx bx-chevron-right"></i>
        </button>
        <button @click="prevSlide()" class="prevBtn">
          <i class="bx bx-chevron-left"></i>
        </button>
      </div>
      <div class="OfferDiv">
        <div class="Offer">
          <ion-card v-for="offer in state.Offers" :key="offer.id">
            <p>{{ offer.name }}</p>
            <ion-img :src="offer.image" :alt="offer.name"></ion-img>
          </ion-card>
        </div>
      </div>
      <div class="subcategories">
        <div class="subcategory" v-for="category in state.Categories">
          <ion-card>
            <ion-card-header>
              <h2 style="font-size: 17px">
                {{ category.name }}
              </h2>
            </ion-card-header>
            <ion-card-content
              style="
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 10px;
                place-items: center;
                padding-right: 10px;
                padding-left: 10px;
              "
            >
              <div
                class="subcategorydiv"
                v-for="subcategory in category.subcategories"
                :key="subcategory.id"
                @click="GoTo(`/subcategory/${subcategory.id}`)"
                style="cursor: pointer"
              >
                <ion-img
                  :src="subcategory.image"
                  :alt="subcategory.name"
                  style="border-radius: 5px; overflow: hidden; max-width: 325px"
                >
                </ion-img>
                <p style="font-size: 12px">{{ subcategory.name }}</p>
              </div>
            </ion-card-content>
            <ion-button
              @click="GoTo(`/categories/${category.id}`)"
              style="
                cursor: pointer;
                margin-left: 20px;
                width: 120px;
                margin-bottom: 10px;
              "
            >
              View All
            </ion-button>
          </ion-card>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonAlert,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonContent,
  IonPage,
  IonImg,
  IonButton,
} from "@ionic/vue";
import axios from "axios";

import Header from "@/components/Header.vue";

import { reactive, ref } from "vue";
import router from "@/router";

const alertButtons = ["OK"];
const isOpen = ref(false);

interface Slide {
  id: number;
  image: string;
  product: object;
}

interface Offer {
  id: number;
  name: string;
  image: string;
  subcategory: number;
}

interface SubCategory {
  id: number;
  name: string;
  image: string;
  category_id: number;
  category_name: string;
  category_name_ar: string;
  name_ar: string;
}

interface Category {
  id: number;
  name: string;
  name_ar: string;
  subcategories: SubCategory[];
}

const state = reactive({
  Offers: [] as Offer[],
  Categories: [] as Category[],
  Carousel: [] as Slide[],
  currentSlide: 0,
  slideInterval: null as NodeJS.Timeout | null,
});

async function GetData() {
  try {
    let response = await axios.get("http://localhost:5500/api/home");
    state.Offers = response.data.Offers;
    state.Carousel = response.data.Carousels;
    let categories: Category[] = [];
    let subcategories: SubCategory[] = response.data.SubCategories;

    for (let i = 0; i < subcategories.length; i++) {
      const subcategory = subcategories[i];

      let category = categories.find((sub: any) => {
        return subcategory.category_name == sub.name;
      });

      if (!category) {
        categories.push({
          id: subcategory.category_id,
          name: subcategory.category_name,
          name_ar: subcategory.category_name_ar,
          subcategories: [subcategory],
        });
      } else {
        category.subcategories.push(subcategory);
      }
    }

    state.Categories = categories;
  } catch (err) {
    isOpen.value = true;
  }
}

function GoTo(url: string) {
  router.push({ path: url });
}

function nextSlide() {
  state.currentSlide = (state.currentSlide + 1) % state.Carousel.length;

  stopSlideShow();

  setTimeout(() => {
    state.slideInterval = setInterval(nextSlide, 3000);
  }, 2000);
}
function prevSlide() {
  state.currentSlide =
    (state.currentSlide - 1 + state.Carousel.length) % state.Carousel.length;

  stopSlideShow();

  setTimeout(() => {
    state.slideInterval = setInterval(nextSlide, 3000);
  }, 2000);
}
function startSlideShow() {
  state.slideInterval = setInterval(nextSlide, 3000);
}
function stopSlideShow() {
  clearInterval(state.slideInterval as unknown as number);
}

GetData();
startSlideShow();
</script>

<style scoped>
.OfferDiv {
  width: 95%;
  overflow: scroll;
  position: relative;
  margin: 0 auto;
}

.OfferDiv p {
  position: absolute;
  color: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  font-weight: bold;
}

.Offer {
  display: flex;
  transition: transform 0.3s ease-in-out;
  margin: 15px 0;
}

.Offer ion-card {
  flex: 0 0 120px;
  text-align: center;
  height: 120px;
  overflow: hidden;
}

.homePage {
  background-color: var(--ion-color-bg);
}

.carousel {
  width: 100%;
  overflow: hidden;
  position: relative;
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

.nextBtn {
  position: absolute;
  top: 50%;
  right: 10px;
  z-index: 99;
  font-size: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: 0 0 2px #33333368;
  transform: translateY(-50%);
  color: var(--ion-color-primary);
  background: none;
}
.prevBtn {
  position: absolute;
  top: 50%;
  left: 10px;
  z-index: 99;
  font-size: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: 0 0 2px #33333368;
  transform: translateY(-50%);
  color: var(--ion-color-primary);
  background: none;
}

@media (min-width: 768px) {
  .subcategories {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  .slide {
    height: 275px;
  }
}

@media (min-width: 1024px) {
  .subcategories {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  .OfferDiv {
    overflow: hidden;
  }
  .Offer {
    align-items: center;
    justify-content: center;
  }
}

@media (min-width: 1300px) {
  .subcategories {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>

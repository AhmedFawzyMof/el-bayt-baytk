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
    <ion-content :fullscreen="true">
      <Carousel :autoplay="true" :interval="2000"></Carousel>
      <div class="categories">
        <ion-card v-for="category in state.Categories">
          <ion-card-header>
            <ion-img
              :src="'http://localhost:5500/assets' + category.img"
              class="categoryImg"
            ></ion-img>
            <ion-card-subtitle>{{ category.name }}</ion-card-subtitle>
          </ion-card-header>
        </ion-card>
      </div>
      <h1 style="padding-left: 10px">Most Popular</h1>
      <div class="product-container">
        <Product
          v-for="product in state.slicedProducts"
          :product="product"
        ></Product>

        <ion-buttons v-if="!state.noMore">
          <ion-button @click="GetMore(4)" color="primary">Show More</ion-button>
        </ion-buttons>
      </div>
      <!-- <div id="container">
        <strong>Ready to create an app?</strong>
        <p>
          Start with Ionic
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://ionicframework.com/docs/components"
            >UI Components</a
          >
        </p>
      </div> -->
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonAlert,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonContent,
  IonPage,
  IonImg,
} from "@ionic/vue";

import Header from "@/components/Header.vue";
import Carousel from "@/components/Carousel.vue";
import Product from "@/components/Product.vue";

import { reactive, ref } from "vue";

const alertButtons = ["OK"];
const isOpen = ref(false);

interface Product {
  id: number;
  slug: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  price: number;
  discount: number;
  image: string;
}

interface Category {
  name: string;
  img: string;
}

const state = reactive({
  Products: [] as Product[],
  slicedProducts: [] as Product[],
  Categories: [] as Category[],
  noMore: false,
});

async function GetData() {
  try {
    let resProduct = await fetch("http://localhost:5500/allproducts");
    let resCategory = await fetch("http://localhost:5500/allcategories");

    if (!resProduct.ok && !resCategory.ok) {
      isOpen.value = true;
    } else {
      let dataProduct = await resProduct.json();
      let dataCategory = await resCategory.json();
      state.Products = dataProduct.Products as Product[];
      state.slicedProducts = state.Products.slice(0, 4);
      state.Categories = dataCategory.Categories as Category[];
    }
  } catch (err) {
    isOpen.value = true;
  }
}

function GetMore(plus: number) {
  state.slicedProducts = state.Products.slice(
    0,
    state.slicedProducts.length + plus
  );

  if (plus !== 0) {
    if (state.slicedProducts.length === state.Products.length) {
      state.noMore = true;
    }
  }
}

GetData();

GetMore(0);
</script>

<style scoped>
.categories {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.categories ion-card-subtitle {
  text-align: center;
  font-weight: bold;
  color: #333;
}
.categoryImg {
  width: 70px;
  height: 70px;
  margin: 0 auto;
}
.product-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}
</style>

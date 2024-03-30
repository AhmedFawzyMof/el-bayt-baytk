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
      <Carousel :autoplay="true" :interval="2500"></Carousel>
      <div class="categories">
        <ion-card v-for="category in state.Categories">
          <ion-card-header>
            <ion-img
              :src="
                'https://h-a-stroe-backend.onrender.comassets' + category.img
              "
              class="categoryImg"
            ></ion-img>
            <ion-card-title>{{ category.name }}</ion-card-title>
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
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonAlert,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonPage,
  IonImg,
} from "@ionic/vue";

import axios from "axios";

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
    let resProduct = await axios.get(
      "https://h-a-stroe-backend.onrender.com/allproducts"
    );
    let resCategory = await axios.get(
      "https://h-a-stroe-backend.onrender.com/allcategories"
    );

    let dataProduct = await resProduct.data;
    let dataCategory = await resCategory.data;
    state.Products = dataProduct.Products as Product[];
    state.slicedProducts = state.Products.slice(0, 4);
    state.Categories = dataCategory.Categories as Category[];
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
  place-items: center;
  gap: 10px;
}

.categories ion-card {
  width: 100%;
  height: 100%;
}

.categories ion-card-title {
  text-align: center;
  font-size: 15px;
  text-transform: capitalize;
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

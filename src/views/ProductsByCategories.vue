<template>
  <ion-page>
    <Header :pagename="Category.name" />
    <ion-alert
      :is-open="isOpen"
      header="Sorry Please Login First"
      message="Please Login and Try Again"
      :buttons="alertButtons"
    ></ion-alert>
    <ion-content>
      <div class="subCategories">
        <div class="subCategory" v-for="subcategory in SubCategories">
          <ion-card>
            <ion-img :src="subcategory.image"></ion-img>
          </ion-card>
          <p style="margin-left: 10px">{{ subcategory.name }}</p>
        </div>
      </div>
      <div class="products">
        <div class="product" v-for="product in Products">
          <ion-card class="productCard" @click="GoTo(`/product/${product.id}`)">
            <img :alt="product!.name" :src=" product!.image" />
            <ion-card-header>
              <ion-card-title style="font-size: 17px">{{
                product!.name
              }}</ion-card-title>
            </ion-card-header>
            <p class="productPrice">L.E {{ product!.price }}</p>
            <p class="productDiscount" v-if="product.discount > 0">
              L.E {{ product!.discount + product.price }}
            </p>

            <ion-card-content>
              {{ product!.description.substring(0, 100) + "..." }}
            </ion-card-content>
          </ion-card>
          <button class="favBtn" @click="addToFav(product)">
            <i class="bx bxs-heart"></i>
          </button>
        </div>
      </div>
      <ion-infinite-scroll @ionInfinite="ionInfinite">
        <ion-infinite-scroll-content></ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonAlert,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/vue";
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";
import axios from "axios";

interface SubCategory {
  id: number;
  name: string;
  image: string;
  category_id: number;
  category_name: string;
  category_name_ar: string;
  name_ar: string;
}

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  discount: number;
  description: string;
  descriptionAr: string;
}

export default defineComponent({
  name: "ProductsByCategories",
  components: {
    Header,
    IonPage,
    IonContent,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonAlert,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
  },
  data() {
    return {
      SubCategories: [] as SubCategory[],
      Products: [] as Product[],
      Category: {},
      auth: false,
      limit: 20,
      isOpen: false,
      alertButtons: ["OK"],
    };
  },
  methods: {
    async GetCategory() {
      const id = this.$route.params.id;

      let category = await axios.get(
        `http://localhost:5500/api/category/${id}/${this.limit}`
      );
      console.log(category.data);

      this.SubCategories = category.data.SubCategories;

      this.Products = category.data.Products;
      this.Category = category.data.Category;
    },
    GoTo(url: string) {
      this.$router.push(url);
    },
    addToFav(product: Product) {
      if (!this.auth) {
        this.isOpen = true;
        return;
      }
    },
    async ionInfinite(ev: any) {
      this.limit += 20;
      let category = await axios.get(
        `http://localhost:5500/api/category/${this.$route.params.id}/${this.limit}`
      );
      this.Products = [...this.Products, ...category.data.Products];
      console.log(this.Products);
      setTimeout(() => ev.target.complete(), 500);
    },
  },
  mounted() {
    this.GetCategory();
  },
});
</script>
<style>
.subCategories {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin: 20px 0;
}

.favBtn {
  position: absolute;
  background: #fff;
  color: var(--ion-color-primary);
  font-size: 30px;
  top: 100px;
  width: 40px;
  height: 40px;
  border-radius: 5px;
  right: 10px;
  cursor: pointer;
  z-index: 100;
}

.subCategory {
  max-width: 180px;
}
.products {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  place-items: center;
  margin-bottom: 20px;
}
.productCard {
  position: relative;
  height: 100%;
  width: 95%;
}

.product {
  height: 100%;
  width: 100%;
  display: grid;
  place-items: center;
  position: relative;
}

.productCard img {
  width: 100%;
}
.productPrice {
  position: absolute;
  top: 40px;
  color: #333;
  background: #fff;
  border-radius: 0 5px 5px 0px;
  padding: 5px 10px;
  box-shadow: 0 0 2px #333333;
}
.productDiscount {
  position: absolute;
  top: 0;
  color: var(--ion-color-primary);
  text-decoration: line-through;
  background: #fff;
  border-radius: 0 5px 5px 0px;
  padding: 5px 10px;
  box-shadow: 0 0 2px #333333;
}

@media (min-width: 768px) {
  .products {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1024px) {
  .products {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>

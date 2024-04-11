<template>
  <ion-page>
    <Header pagename="Offers" />
    <ion-alert
      :is-open="isOpen"
      :header="alertHeader"
      :message="alertMessage"
      :buttons="alertButtons"
    ></ion-alert>
    <ion-content>
      <div class="filters">
        <ion-select
          placeholder="Sort By"
          style="width: 30%; margin-bottom: 20px; margin-top: 20px"
          v-model="sort"
          @ion-change="sortProducts()"
        >
          <ion-select-option value="hp">By Higher Price</ion-select-option>
          <ion-select-option value="lp">By Lower Price</ion-select-option>
        </ion-select>
        <ion-select
          placeholder="Filter By Categories"
          style="width: 180px; margin-bottom: 20px; margin-top: 20px"
          v-model="filter"
          @ion-change="filterProducts()"
        >
          <ion-select-option
            v-for="category in Categories"
            :value="category.id"
            >{{ category.name }}</ion-select-option
          >
        </ion-select>
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
  IonSelect,
  IonSelectOption,
  IonInfiniteScrollContent,
} from "@ionic/vue";
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";
import axios from "axios";
import { filter } from "ionicons/icons";

interface Category {
  id: number;
  name: string;
  nameAr: string;
}

interface Product {
  id: number;
  name: string;
  nameAr: string;
  category: number;
  image: string;
  price: number;
  discount: number;
  description: string;
  descriptionAr: string;
}

export default defineComponent({
  name: "AllProducts",
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
    IonSelect,
    IonSelectOption,
    IonInfiniteScrollContent,
  },
  data() {
    return {
      alertMessage: "",
      alertHeader: "",
      Products: [] as Product[],
      Categories: [] as Category[],
      auth: false,
      limit: 20,
      isOpen: false,
      alertButtons: ["OK"],
      sort: "",
      filter: 0,
    };
  },
  methods: {
    sortProducts(sort?: string, products?: Product[]) {
      let sortType: string | undefined = sort;
      let product: Product[] | undefined = products;

      if (!sort) {
        sortType = this.sort;
      }

      if (!products) {
        product = this.Products;
      }

      let arry = this.Products.sort((a, b) => {
        if (sortType === "hp") {
          return b.price - a.price;
        } else if (sortType === "lp") {
          return a.price - b.price;
        }
        return 0;
      });

      this.Products = arry;
    },

    filterProducts(filter?: number, products?: Product[]) {
      let filterType: number | undefined = filter;

      if (!filter) {
        filterType = this.filter;
      }

      let productsInp: Product[] | undefined = products;

      if (!products) {
        productsInp = this.Products;
      }

      let arry: any = [];

      if (productsInp) {
        arry = productsInp.filter((product) => {
          return product.category === this.filter;
        });
      }

      this.Products = arry;
    },
    async GetCategory() {
      let products = await axios.get(
        `http://localhost:5500/api/allproducts/${this.limit}`
      );

      this.Products = products.data.Products;
      this.Categories = products.data.Categories;
    },
    GoTo(url: string) {
      this.$router.push(url);
    },
    addToFav(product: Product) {
      if (!this.auth) {
        this.alertHeader = "Please Login";
        this.alertMessage = "Please Login and Try Again";
        this.isOpen = true;
        setTimeout(() => (this.isOpen = false), 1000);
        return;
      }
    },
    async ionInfinite(ev: any) {
      try {
        this.limit += 20;
        let products = await axios.get(
          `https://h-a-stroe-backend.onrender.com/api/allproducts/${this.limit}`
        );

        let Parray = [...this.Products, ...products.data.Products];
        this.Products = Parray;
        if (this.filter > 0) {
          this.filterProducts(this.filter, Parray);
        }
        this.sortProducts(this.sort, Parray);
        setTimeout(() => ev.target.complete(), 500);
      } catch (err) {
        this.alertHeader = "No More Products";
        this.alertMessage = "No More Products In This Category To Show";
        this.isOpen = true;
        setTimeout(() => (this.isOpen = false), 3000);
        return;
      }
    },
  },
  mounted() {
    this.GetCategory();
  },
});
</script>
<style>
.filters {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
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

.products {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  place-items: center;
  margin: 20px 0;
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

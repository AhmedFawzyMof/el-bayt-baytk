<template>
  <ion-page>
    <Header :pagename="Subcategory.name" />
    <ion-alert
      :is-open="isOpen"
      :header="alertHeader"
      :message="alertMessage"
      :buttons="alertButtons"
    ></ion-alert>
    <ion-content>
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
      alertMessage: "",
      alertHeader: "",
      Subcategory: {} as SubCategory,
      Products: [] as Product[],
      auth: false,
      limit: 20,
      isOpen: false,
      alertButtons: ["OK"],
    };
  },
  methods: {
    async GetCategory() {
      const id = this.$route.params.id;

      let subcategory = await axios.get(
        `http://localhost:5500/api/subcategory/${id}/${this.limit}`
      );

      console.log(subcategory);

      this.Subcategory = subcategory.data.SubCategory;
      this.Products = subcategory.data.Products;
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
        let category = await axios.get(
          `http://localhost:5500/api/subcategory/${this.$route.params.id}/${this.limit}`
        );
        this.Products = [...this.Products, ...category.data.Products];
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

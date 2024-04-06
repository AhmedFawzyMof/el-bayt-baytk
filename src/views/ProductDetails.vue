<template>
  <ion-page>
    <Header pagename="El Bayt Baytk" />
    <ion-content>
      <ion-grid style="padding: 0 10px">
        <ion-row>
          <h1>{{ Product.name }}</h1>
        </ion-row>
        <ion-row>
          <p style="color: #575757">{{ Product.descriptionAr }}</p>
        </ion-row>
        <ion-row>
          <ion-col
            style="display: flex; align-items: center; position: relative"
          >
            <p>Category:</p>
            <p class="categoryName">{{ Product.categoryName }}</p>
            <p class="categoryNameBg"></p>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-img
            class="productImg"
            :src="'http://localhost:5500/assets' + Product.image"
            :alt="Product.name"
          ></ion-img>
        </ion-row>
        <ion-row>
          <p>Price: L.E {{ Product.price }}</p>
        </ion-row>
        <ion-row>
          <div class="quantity">
            <button @click="incQuantity()"><i class="bx bx-plus"></i></button>
            <p>{{ quantity }}</p>
            <button @click="decQuantity()"><i class="bx bx-minus"></i></button>
          </div>
        </ion-row>
        <ion-row>
          <ion-button class="addToCart">Add To Cart</ion-button>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
import { IonPage, IonGrid, IonRow, IonImg } from "@ionic/vue";
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";
import axios from "axios";
import Product from "@/components/Product.vue";

interface Product {
  name: string;
  descriptionAr: string;
  categoryName: string;
  image: string;
  price: number;
}

export default defineComponent({
  name: "ProductDetails",
  components: {
    IonPage,
    IonGrid,
    IonRow,
    IonImg,
    Header,
  },
  data() {
    return {
      quantity: 1,
      Product: {} as Product,
    };
  },
  mounted() {
    this.GetProduct();
  },
  methods: {
    async GetProduct() {
      let slug = this.$route.params.slug;
      let response = await axios.get("http://localhost:5500/products/" + slug);
      console.log(response.data.Products);
      this.Product = response.data.Products;
    },
    incQuantity() {
      if (this.quantity <= 19) {
        this.quantity++;
      }
    },
    decQuantity() {
      if (this.quantity < 1 || this.quantity === 1) {
        return;
      }
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
  },
});
</script>
<style>
.categoryName {
  position: relative;
  margin-left: 20px;
  color: white;
  padding: 7px;
  border-radius: 5px;
  border: 3px solid #333;
  cursor: pointer;
}

.categoryName::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 5px;
  left: 5px;
  padding: 2.5px;
  border-radius: 5px;
  background-color: var(--ion-color-primary);
  z-index: -1;
  transition: all 0.3s ease-in-out;
}

.categoryName:hover::before {
  top: 0;
  left: 0;
  padding: 0%;
  border-radius: 0;
}

.productImg {
  max-width: 100%;
  margin: 0 auto;
}
.quantity {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 40px;
  border: #d9d9d9 1px solid;
}

.quantity button {
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
  font-size: 20px;
}

.addToCart {
  --background: var(--ion-color-primary);
  width: 100%;
  margin-top: 10px;
  margin-bottom: 40px;
  color: #fff;
  font-size: 16px;
  --cursor: pointer;
}
</style>

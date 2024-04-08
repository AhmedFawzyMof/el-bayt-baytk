<template>
  <ion-page>
    <ion-alert
      :is-open="isOpen"
      :header="alertHeader"
      :message="alertMessage"
      :buttons="alertButtons"
    ></ion-alert>
    <Header pagename="El Bayt Baytk" />
    <ion-content>
      <ion-grid style="padding: 0 10px" v-if="mobile">
        <ion-row>
          <h1>{{ Product.name }}</h1>
        </ion-row>
        <ion-row>
          <ion-img
            class="productImg"
            :src="Product.image"
            :alt="Product.name"
          ></ion-img>
        </ion-row>
        <ion-row :class="Product.discount > 0 ? 'price' : 'pricenodiscount'">
          <h2>L.E {{ Product.price }}</h2>
          <p
            v-if="Product.discount > 0"
            style="color: #575757; text-decoration: line-through"
          >
            L.E {{ Product.discount + Product.price }}
          </p>
          <ion-button v-if="Product.discount > 0">{{ OFF() }}% OFF</ion-button>
        </ion-row>
        <ion-row v-if="warranty">
          <div class="warrantyDiv">
            <p>Warranty</p>
            <div class="warranty">
              <i class="bx bxs-certification"></i>
              <p>{{ Product.warranty.String }} Years</p>
            </div>
          </div>
        </ion-row>
        <ion-row>
          <p style="color: #575757">{{ Product.descriptionAr }}</p>
        </ion-row>
        <ion-row>
          <div class="quantity">
            <button @click="incQuantity()"><i class="bx bx-plus"></i></button>
            <p>{{ quantity }}</p>
            <button @click="decQuantity()"><i class="bx bx-minus"></i></button>
          </div>
        </ion-row>
        <ion-row>
          <ion-button class="addToCart">
            Add To Cart
            <ion-icon :icon="cart" style="margin-left: 10px"></ion-icon>
          </ion-button>
        </ion-row>
        <ion-row>
          <div class="brandmaterial">
            <p>Brand</p>
            <p>{{ Product.brand }}</p>
          </div>
          <div class="brandmaterial">
            <p>Material</p>
            <p>{{ Product.material }}</p>
          </div>
        </ion-row>
        <ion-row>
          <ion-button class="addToFav" @click="addToFav(Product)">
            <ion-icon :icon="heart"></ion-icon>
          </ion-button>
        </ion-row>
      </ion-grid>
      <ion-grid v-else>
        <ion-row style="margin-top: 20px">
          <ion-col>
            <ion-row>
              <h1>{{ Product.name }}</h1>
            </ion-row>
            <ion-row
              :class="Product.discount > 0 ? 'price' : 'pricenodiscount'"
            >
              <h2>L.E {{ Product.price }}</h2>
              <p
                v-if="Product.discount > 0"
                style="color: #575757; text-decoration: line-through"
              >
                L.E {{ Product.discount + Product.price }}
              </p>
              <ion-button v-if="Product.discount > 0"
                >{{ OFF() }}% OFF</ion-button
              >
            </ion-row>
            <ion-row v-if="warranty">
              <div class="warrantyDiv">
                <p>Warranty</p>
                <div class="warranty">
                  <i class="bx bxs-certification"></i>
                  <p>{{ Product.warranty.String }} Years</p>
                </div>
              </div>
            </ion-row>
            <ion-row>
              <div class="quantity">
                <button @click="incQuantity()">
                  <i class="bx bx-plus"></i>
                </button>
                <p>{{ quantity }}</p>
                <button @click="decQuantity()">
                  <i class="bx bx-minus"></i>
                </button>
              </div>
            </ion-row>
            <ion-row>
              <ion-button class="addToCart">
                Add To Cart
                <ion-icon :icon="cart" style="margin-left: 10px"></ion-icon>
              </ion-button>
            </ion-row>
          </ion-col>

          <ion-col>
            <ion-img class="productImg" :src="Product.image"></ion-img>
          </ion-col>
        </ion-row>
        <ion-row style="padding: 0 20px">
          <p style="color: #575757">{{ Product.descriptionAr }}</p>
        </ion-row>
        <ion-row style="padding: 0 20px">
          <div class="brandmaterial">
            <p>Brand</p>
            <p>{{ Product.brand }}</p>
          </div>
          <div class="brandmaterial">
            <p>Material</p>
            <p>{{ Product.material }}</p>
          </div>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
import {
  IonPage,
  IonGrid,
  IonRow,
  IonImg,
  IonButton,
  IonIcon,
  IonAlert,
  IonCol,
} from "@ionic/vue";
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";
import axios from "axios";
import { cart, heart } from "ionicons/icons";

interface Product {
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  categoryName: string;
  image: string;
  price: number;
  discount: number;
  brand: string;
  material: string;
  warranty: {
    String: string;
    Valid: boolean;
  };
}

export default defineComponent({
  name: "ProductDetails",
  components: {
    IonPage,
    IonGrid,
    IonRow,
    IonImg,
    IonButton,
    IonIcon,
    IonAlert,
    IonCol,
    Header,
  },
  data() {
    return {
      quantity: 1,
      Product: {} as Product,
      cart,
      heart,
      alertMessage: "",
      alertHeader: "",
      isOpen: false,
      alertButtons: ["OK"],
      warranty: false,
      auth: false,
      mobile: true,
    };
  },
  mounted() {
    if (window.screen.width >= 732) {
      this.mobile = false;
    }
    this.GetProduct();
  },
  methods: {
    async GetProduct() {
      let id = this.$route.params.id;
      let response = await axios.get("http://localhost:5500/api/product/" + id);
      console.log(response.data);
      if (response.data.warranty.Valid) {
        this.warranty = true;
      }
      this.Product = response.data;
    },

    OFF() {
      let orgnalPrice = this.Product.price + this.Product.discount;
      let Difference = orgnalPrice - this.Product.price;
      let Percentage = (Difference / this.Product.price) * 100;
      return Percentage.toFixed(2);
    },
    incQuantity() {
      if (this.quantity <= 19) {
        this.quantity++;
      }
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
.brandmaterial {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
}
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

.warranty {
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  color: #575757;
  font-size: 20px;
  gap: 20px;
}

.warranty i {
  font-size: 40px;
  color: var(--ion-color-primary);
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
  width: 100%;
  margin-top: 10px;
  margin-bottom: 40px;
  color: #fff;
  font-size: 16px;
  --cursor: pointer;
}

.addToFav {
  position: absolute;
  top: 70px;
  --cursor: pointer;
}

.price {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.pricenodiscount {
  display: flex;
  align-items: start;
  justify-content: space-between;
}
</style>

<template>
  <ion-card class="productCard" @click="GoTo(product!.slug)">
    <img
      :alt="product!.name"
      :src="'https://h-a-stroe-backend.onrender.com/assets' + product!.image"
    />
    <ion-card-header>
      <ion-card-title>{{ product!.name }}</ion-card-title>
    </ion-card-header>
    <p class="productPrice">L.E {{ product!.price }}</p>
    <ion-card-content>
      {{ product!.descriptionAr }}
    </ion-card-content>
  </ion-card>
</template>
<script lang="ts">
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Product",
  props: {
    product: Object,
  },
  components: {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
  },
  data() {
    return {
      product: this.product,
    };
  },
  methods: {
    GoTo(slug: string) {
      this.$router.push("/product/" + slug);
    },
  },
});
</script>
<style>
.productCard {
  position: relative;
  height: 100%;
}

.productCard img {
  width: 100%;
}
.productPrice {
  position: absolute;
  top: 0;
  color: #333;
  background: #fff;
  border-radius: 0 5px 5px 0px;
  padding: 5px 10px;
  box-shadow: 0 0 2px #333333;
}
</style>

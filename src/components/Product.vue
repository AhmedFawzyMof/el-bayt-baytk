<template>
  <ion-card>
    <img
      :alt="product!.name"
      :src="'http://localhost:5500/assets' + product!.image"
    />
    <ion-card-header>
      <ion-card-title>{{ product!.name }}</ion-card-title>
    </ion-card-header>

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
});
</script>

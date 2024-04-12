<template>
  <ion-header :translucent="false">
    <ion-toolbar>
      <ion-router-link @click="Goto('/favorite')" slot="end" class="favorite">
        <ion-icon :icon="heart" class="FavIcon"> </ion-icon>
      </ion-router-link>
      <ion-router-link @click="Goto('/cart')" slot="end" class="cart">
        <ion-icon :icon="cart" class="CartIcon"> </ion-icon>
        <ion-badge color="primary" class="badge">2</ion-badge>
      </ion-router-link>
      <ion-title>{{ pagename }}</ion-title>
      <ion-router-link @click="Goto('/')" slot="start">
        <ion-img src="/assets/icon/logo.png" class="logoImg"></ion-img>
      </ion-router-link>
    </ion-toolbar>
  </ion-header>
</template>
<script lang="ts">
import {
  IonHeader,
  IonIcon,
  IonBadge,
  IonToolbar,
  IonImg,
  IonTitle,
} from "@ionic/vue";

import { defineComponent } from "vue";

import { cart, heart } from "ionicons/icons";

export default defineComponent({
  name: "Header",
  props: {
    pagename: String,
  },
  components: {
    IonHeader,
    IonToolbar,
    IonImg,
    IonIcon,
    IonBadge,
    IonTitle,
  },
  data() {
    return {
      heart,
      cart,
    };
  },
  methods: {
    Goto(url: string) {
      this.$router.push(url);
    },
  },
});
</script>
<style>
ion-title {
  text-align: center;
}
</style>

<template>
  <ion-app>
    <ion-header :translucent="false">
      <ion-toolbar>
        <ion-searchbar
          show-clear-button="always"
          :clear-icon="trash"
          autocapitalize="sentences"
        >
        </ion-searchbar>
        <ion-router-link href="/" slot="start">
          <ion-img src="/assets/icon/logo.png" class="logoImg"></ion-img>
        </ion-router-link>
      </ion-toolbar>
    </ion-header>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { trash } from "ionicons/icons";
</script>
<style>
.closeBtn {
  font-size: 30px;
}
.cart {
  font-size: 25px;
}
.cartBtn {
  height: 48px;
  width: 48px;
}
.badge {
  position: absolute;
  top: 5px;
  right: 5px;
}
.logoImg {
  width: 40px;
  height: 40px;
}
ion-searchbar {
  --background: var(
    --ion-color-bg
  ) !important; /* Change the background color */
  --box-shadow: 0 0 2px #3333334c !important; /* Remove the box-shadow */
  --border-radius: 50px !important; /* Change the border radius */
}
</style>

<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
</script>
<style>
.closeBtn {
  font-size: 30px;
}

.logoImg {
  width: 40px;
  height: 40px;
}
.cart {
  position: relative;
}

.badge {
  position: absolute;
  right: 5px;
  top: -5px;
}

.FavIcon {
  font-size: 30px;
  margin-right: 10px;
}
.CartIcon {
  font-size: 30px;
  margin-right: 10px;
}
ion-searchbar {
  --background: var(
    --ion-color-bg
  ) !important; /* Change the background color */
  --box-shadow: 0 0 2px #3333334c !important; /* Remove the box-shadow */
  --border-radius: 50px !important; /* Change the border radius */
}
</style>

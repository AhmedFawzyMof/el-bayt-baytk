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
</style>

<template>
  <ion-header :translucent="true">
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
</template>

<script lang="ts">
import { IonHeader, IonToolbar, IonImg, IonSearchbar } from "@ionic/vue";
import { trash } from "ionicons/icons";

export default {
  name: "Header",
  data() {
    return {
      trash: trash,
    };
  },
};
</script>
<style>
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

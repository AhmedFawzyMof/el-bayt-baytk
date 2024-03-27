<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet id="main-content"></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="menu" @click="openMenu()">
          <ion-icon :icon="menu"></ion-icon>
          <ion-label>Menu</ion-label>
        </ion-tab-button>

        <!-- <ion-tab-button tab="search" href="/search">
          <ion-icon :icon="search" />
          <ion-label>Search</ion-label>
        </ion-tab-button> -->

        <ion-tab-button tab="radio" href="/radio">
          <ion-icon :icon="heart" />
          <ion-label>Favourite</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="home" href="/home">
          <ion-icon :icon="home" />
          <ion-label>Home</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
    <ion-menu content-id="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-title>El Bayt Baytk</ion-title>
          <ion-menu-toggle slot="end"><i class="bx bx-x"></i></ion-menu-toggle>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list line="inset">
          <ion-item>
            <ion-label>Category</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>Tags</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>Contact</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>About</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>Products</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>Order History</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonIcon,
  IonMenu,
  IonMenuToggle,
  IonContent,
  IonTitle,
  IonToolbar,
  IonHeader,
  menuController,
} from "@ionic/vue";

import { home, heart, menu, close } from "ionicons/icons";

export default {
  components: {
    IonPage,
    IonTabs,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonLabel,
    IonIcon,
    IonMenu,
    IonMenuToggle,
    IonContent,
    IonTitle,
    IonToolbar,
  },
  data() {
    return {
      home,
      heart,
      menu,
      close,
    };
  },
  methods: {
    openMenu() {
      menuController.open();
    },
  },
};
</script>
<style>
ion-menu-toggle i {
  color: #dc2626;
  font-size: 30px;
}
</style>

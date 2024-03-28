<template>
  <ion-page>
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
    <ion-content :fullscreen="true">
      <div id="container">
        <strong>Ready to create an app?</strong>
        <p>
          Start with Ionic
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://ionicframework.com/docs/components"
            >UI Components</a
          >
        </p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonSearchbar,
  IonImg,
} from "@ionic/vue";
import { trash } from "ionicons/icons";
</script>

<style scoped>
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>

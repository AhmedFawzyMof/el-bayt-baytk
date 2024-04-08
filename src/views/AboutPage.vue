<template>
  <ion-page>
    <Header pagename="About Us" />
    <ion-content>
      <ion-card>
        <ion-card-header>
          <ion-card-title>Our Company</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <p>
            Our company was founded in 2024 and has been providing quality
            services ever since. Located in the heart of the city, we employ
            over 1000 dedicated professionals and serve customers worldwide.
          </p>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-title>Our Mission</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <p>
            Our mission is to provide our customers with the best service
            possible, ensuring their satisfaction and continued partnership with
            us. We strive to innovate and stay at the forefront of our industry,
            offering our customers the latest and most efficient solutions.
          </p>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/vue";
import Header from "@/components/Header.vue";
import { defineComponent } from "vue";
export default defineComponent({
  name: "AboutPage",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    Header,
  },
});
</script>

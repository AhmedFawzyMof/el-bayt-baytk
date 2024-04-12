<template>
  <ion-page>
    <Header pagename="My Cart"></Header>
    <ion-content></ion-content>
  </ion-page>
</template>
<script lang="ts">
import { IonPage, IonContent } from "@ionic/vue";
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";

export default defineComponent({
  name: "CartPage",
  components: {
    IonPage,
    IonContent,
    Header,
  },
});
</script>

<template>
  <ion-page>
    <Header pagename="El Bayt Baytk" />
  </ion-page>
</template>
<script lang="ts">
import { IonPage } from "@ionic/vue";
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";

export default defineComponent({
  name: "ProductDetails",
  components: {
    IonPage,
    Header,
  },
});
</script>

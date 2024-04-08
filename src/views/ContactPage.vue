<template>
  <ion-page>
    <Header pagename="Contact Us" />
    <ion-content>
      <div class="contact">
        <div class="contactDitail">
          <ion-list lines="none">
            <ion-item>
              <ion-label>Address</ion-label>
              <ion-text>123 Main St, Anytown, Anywhere</ion-text>
            </ion-item>
            <ion-item>
              <ion-label>Email</ion-label>
              <ion-text>info@ourcompany.com</ion-text>
            </ion-item>
            <ion-item>
              <ion-label>Phone</ion-label>
              <a href="tel:+11234567890">+1 (123) 456-7890</a>
            </ion-item>
          </ion-list>
        </div>
        <div class="contactForm" lines="none">
          <ion-list>
            <ion-item>
              <ion-label position="stacked">Name</ion-label>
              <ion-input
                style="border: 2px solid; border-radius: 5px"
                v-model="name"
              ></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">Email</ion-label>
              <ion-input
                style="border: 2px solid; border-radius: 5px"
                v-model="email"
                type="email"
              ></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">Phone</ion-label>
              <ion-input
                style="border: 2px solid; border-radius: 5px"
                v-model="phone"
                type="tel"
              ></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">Message</ion-label>
              <ion-textarea
                style="border: 2px solid; border-radius: 5px"
                v-model="message"
              ></ion-textarea>
            </ion-item>
          </ion-list>
          <ion-button expand="full" @click="submitForm">Submit</ion-button>
        </div>
      </div>
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
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonInput,
  IonTextarea,
  IonButton,
} from "@ionic/vue";
import Header from "@/components/Header.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ContactPage",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonText,
    IonInput,
    IonTextarea,
    IonButton,
    Header,
  },
});
</script>
<style>
.contact {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 30px;
}
.contactDitail {
  width: 100%;
}
.contactForm {
  width: 100%;
}

@media (min-width: 768px) {
  .contactForm {
    width: 80%;
  }
  .contactDitail {
    width: 80%;
  }
}
</style>

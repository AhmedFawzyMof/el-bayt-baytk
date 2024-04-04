<template>
  <ion-page>
    <Header pagename="Categories"></Header>
    <ion-content>
      <div class="subcategories">
        <div class="subcategory" v-for="category in Categories">
          <ion-card>
            <ion-card-header>
              <h2 style="font-size: 17px">
                {{ category.name }}
              </h2>
            </ion-card-header>
            <ion-card-content
              style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px"
            >
              <div
                class="subcategorydiv"
                v-for="subcategory in category.subcategories"
                :key="subcategory.id"
              >
                <ion-img
                  :src="subcategory.image"
                  :alt="subcategory.name"
                  style="border-radius: 5px; overflow: hidden"
                >
                </ion-img>
                <p>{{ subcategory.name }}</p>
              </div>
            </ion-card-content>
          </ion-card>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
import Header from "@/components/Header.vue";
import {
  IonPage,
  IonContent,
  IonImg,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonButton,
} from "@ionic/vue";
import axios from "axios";
import { defineComponent } from "vue";

interface SubCategory {
  id: number;
  name: string;
  image: string;
  category_id: number;
  category_name: string;
  category_name_ar: string;
  name_ar: string;
}

interface Category {
  name: string;
  name_ar: string;
  subcategories: SubCategory[];
}

export default defineComponent({
  name: "Categories",
  components: {
    Header,
    IonPage,
    IonContent,
    IonImg,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonButton,
  },
  data() {
    return {
      Categories: [] as Category[],
    };
  },
  methods: {
    Goto(url: string) {
      this.$router.push(url);
    },
    async GetCategories() {
      try {
        let response = await axios.get(
          "https://h-a-stroe-backend.onrender.com/api/categories"
        );

        let categories: Category[] = [];
        let subcategories: SubCategory[] = response.data.SubCategories;

        for (let i = 0; i < subcategories.length; i++) {
          const subcategory = subcategories[i];

          let category = categories.find((sub: any) => {
            return subcategory.category_name == sub.name;
          });

          if (!category) {
            categories.push({
              name: subcategory.category_name,
              name_ar: subcategory.category_name_ar,
              subcategories: [subcategory],
            });
          } else {
            category.subcategories.push(subcategory);
          }

          this.Categories = categories;
        }
      } catch (err) {}
    },
  },
  mounted() {
    this.GetCategories();
  },
});
</script>
<style></style>

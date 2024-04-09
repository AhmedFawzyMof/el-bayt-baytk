import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import Tabs from "../components/Tabs.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Tabs,
    children: [
      {
        path: "",
        redirect: "/home",
      },
      {
        path: "home",
        component: () => import("../views/HomePage.vue"),
      },
      {
        path: "product/:id", // Add this route for product details
        component: () => import("../views/ProductDetails.vue"),
        props: true, // This allows you to use the `slug` parameter as a prop in your component
      },
      {
        path: "categories",
        component: () => import("../views/Categories.vue"),
      },
      {
        path: "categories/:id",
        component: () => import("../views/ProductsByCategories.vue"),
      },
      {
        path: "subcategory/:id",
        component: () => import("../views/ProductsBySubCategory.vue"),
      },
      {
        path: "about",
        component: () => import("../views/AboutPage.vue"),
      },
      {
        path: "contact",
        component: () => import("../views/ContactPage.vue"),
      },
      {
        path: "offer/:id",
        component: () => import("../views/ProductsByOffer.vue"),
      },
    ],
  },
];

const router = createRouter({
  // Use: createWebHistory(process.env.BASE_URL) in your app
  history: createWebHistory(),
  routes,
});

export default router;

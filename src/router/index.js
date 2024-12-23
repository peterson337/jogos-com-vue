import { createRouter, createWebHistory } from "vue-router";
import JogoForca from "../components/JogoForca.vue";
//import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/jogo-da-forca",
      name: "Jogo da Forca",
      component: JogoForca,
    },
    {
      path: "/",
      name: "Home",
      component: () => import("../components/HomeView.vue"),
    },
  ],
});

export default router;

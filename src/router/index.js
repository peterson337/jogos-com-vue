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
    {
      path: "/snake-game",
      name: "SnakeGame",
      component: () => import("../components/snakeGame.vue"),
    },
    {
      path: "/rock-paper-scissors-game",
      name: "Rock, Paper, Scissors Game",
      component: () => import("../components/Rock-paper-scissors-game.vue"),
    },
  ],
});

export default router;

<template>
  <main>
    <h3>Pedra, papel e tesoura</h3>

    <section class="container">
      <ModalComponent
        v-if="isOpenModalEndGame"
        :content="'rock paper scissors'"
        :resultado="quemVenceu.value"
        @resetGame="reiniciarGame"
      />

      <div>
        <h4>Player</h4>
        <img
          src="/rock.png"
          alt="rock-player"
          class="image"
          @click="(e) => jogadaDoJogador(e)"
          name="rock"
        />
        <img
          src="/paper.png"
          alt="pape-player"
          class="image"
          @click="(e) => jogadaDoJogador(e)"
          name="paper"
        />
        <img
          src="/scissor.png"
          alt="scissor-player"
          class="image"
          @click="(e) => jogadaDoJogador(e)"
          name="scissor"
        />
      </div>
      <div>
        <h4>CPU</h4>
        <img src="/rock.png" alt="rock-cpu" class="cpu" name="rock" />
        <img src="/paper.png" alt="paper-cpu" class="cpu" name="paper" />
        <img src="/scissor.png" alt="scissor-cpu" class="cpu" name="scissor" />
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ModalComponent from "./ModalComponent.vue";
const choicesRPSPlayerHtml = ref("");
const choicesRPSCPUHtml = ref("");
const quemVenceu = ref("teste");
const isOpenModalEndGame = ref(false);
const opcoesCPU = ref([
  {
    name: "rock",
    img: "/rock.png",
    id: 0,
  },
  {
    name: "paper",
    img: "/paper.png",
    id: 1,
  },
  {
    name: "scissor",
    img: "/scissor.png",
    id: 2,
  },
]);

const jogadaDoJogador = (e) => {
  if (!isOpenModalEndGame.value) {
    choicesRPSPlayerHtml.value = e.target;

    choicesRPSPlayerHtml.value.style.opacity = 1;
    choicesRPSPlayerHtml.value.style.transform = "scale(1.2)";

    jogadaDoCpu();
  }
};

const validarQuemVenceu = (jogador1, jogador2) => {
  if (jogador1.name === jogador2.name) {
    alert("Empate!");
    quemVenceu.value = "Empate";
  } else if (jogador1.name === "rock" && jogador2.name === "scissor") {
    alert("Pedra quebra tesoura!");
    quemVenceu.value = "Você venceu!";
  } else if (jogador1.name === "paper" && jogador2.name === "rock") {
    alert("Papel cobre pedra!");
    quemVenceu.value = "Você venceu!";
  } else if (jogador1.name === "scissor" && jogador2.name === "paper") {
    alert("Tesoura corta papel!");
    quemVenceu.value = "Você venceu!";
  } else {
    alert("Jogador 2 venceu!");
    quemVenceu.value = "Você perdeu!";
  }
};

const jogadaDoCpu = () => {
  const random = Math.floor(Math.random() * opcoesCPU.value.length);

  //prettier-ignore
  const chooseRPSCPU = document.querySelector(`[alt=${opcoesCPU.value[random].name}-cpu]`);

  choicesRPSCPUHtml.value = chooseRPSCPU;

  chooseRPSCPU.style.opacity = 1;
  chooseRPSCPU.style.transform = "scale(1.2)";

  validarQuemVenceu(choicesRPSPlayerHtml.value, chooseRPSCPU);

  setTimeout(() => (isOpenModalEndGame.value = true), 1000);
};

const reiniciarGame = () => {
  isOpenModalEndGame.value = false;

  choicesRPSPlayerHtml.value.style.opacity = 0.7;
  choicesRPSPlayerHtml.value.style.transform = "scale(1)";

  choicesRPSCPUHtml.value.style.opacity = 0.7;
  choicesRPSCPUHtml.value.style.transform = "scale(1)";

  quemVenceu.value = "";
};
</script>

<style scoped>
.cpu:hover {
  opacity: 0.7;
  cursor: not-allowed;
}

img {
  width: 100px;
  height: 100px;
  margin: 10px;
  cursor: pointer;
  transition: transform 0.2s;
  opacity: 0.7;
}

img:hover {
  opacity: 1;
}

.container {
  display: inline-flex;
  gap: 25px;
  align-items: center;
  margin-top: 20px;
}

@media (max-width: 400px) {
  .container {
    gap: 0px;
  }
}
</style>

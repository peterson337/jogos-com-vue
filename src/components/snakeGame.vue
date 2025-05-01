<template>
  <main class="containerGame">
    <h2>Snake Game</h2>
    <section class="tela">
      <div id="snake"></div>
    </section>

    <div class="controls">
      <p style="width: 40px" class="button" @click="() => moveSnake('ArrowUp')">
        ↑
      </p>

      <div style="display: inline-flex; gap: 40px">
        <p class="button" @click="() => moveSnake('ArrowLeft')">←</p>
        <p class="button" @click="() => moveSnake('ArrowRight')">→</p>
      </div>

      <p
        style="width: 40px"
        class="button"
        @click="() => moveSnake('ArrowDown')"
      >
        ↓
      </p>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
const up = ref(0);
const down = ref(0);
const left = ref(0);
const right = ref(0);
const tela = document.querySelector(".tela");

window.addEventListener("keydown", (e) => moveSnake(e.key));

const teste = () => {
  const tela = document.querySelector(".tela");
  // const telaWidth = tela.offsetWidth;
  // const telaHeight = tela.offsetHeight;

  const comida = document.createElement("div");

  comida.classList.add("comida");

  comida.style.top = `${Math.floor(Math.random() * 100)}px`;
  comida.style.left = `${Math.floor(Math.random() * 100)}px`;

  tela.appendChild(comida);

  console.log(comida);
};

onMounted(() => teste());

const moveSnake = (e) => {
  const snake = document.getElementById("snake");

  const fimDaTela = document.querySelector(".tela").getBoundingClientRect();

  const teste = snake.getBoundingClientRect();

  console.log("snake", snake.offsetLeft);

  if (snake.offsetTop <= 2) alert("Game Over");

  if (snake.offsetLeft <= 6) alert("Game Over");

  // if (snake.offsetTop >= 845) alert("Game Over");

  if (e === "ArrowUp") {
    up.value = up.value + 10;
    snake.style.marginBottom = `${up.value}px`;
  } else if (e === "ArrowDown") {
    down.value = down.value + 10;
    snake.style.marginTop = `${down.value}px`;
  } else if (e === "ArrowLeft") {
    left.value = left.value + 10;
    snake.style.marginRight = `${left.value}px`;
  } else if (e === "ArrowRight") {
    right.value = right.value + 10;
    snake.style.marginLeft = `${right.value}px`;
  }
};
</script>

<style scoped>
.tela {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 120px);
  width: calc(70vw - 100px);
  border: 2px solid white;
  border-radius: 20px;
  position: relative;
}

#snake {
  width: 20px;
  height: 20px;
  background-color: #0bd644;
  position: absolute;
}

.controls {
  display: none;
}

.comida {
  width: 13px;
  height: 13px;
  background-color: red;
  position: absolute;
  border-radius: 50%;
}

@media (max-width: 768px) {
  .tela {
    height: calc(80vh - 100px);
    width: calc(80vw - 100px);
  }

  .containerGame {
    position: absolute;
    top: 0;
    left: 0;
  }

  .controls {
    display: flex;
    margin-top: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .button {
    background-color: #0b6ad6;
    color: white;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
  }
}
</style>

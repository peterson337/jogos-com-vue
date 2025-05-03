<template>
  <main class="containerGame">
    <section class="headerGame">
      <h2 class="titleGame">Snake Game</h2>
      <h3>Score: {{ pontos }}</h3>
    </section>

    <section class="tela">
      <div id="snake"></div>

      <div
        v-for="item in comidas"
        :key="item.id"
        class="comida"
        :style="{ top: item.top, left: item.left }"
        id="bolinha"
      ></div>
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
const tamanhoDaCobra = ref(35);
const pontos = ref(0);
const comidas = ref([
  {
    id: 1,
    top: `${Math.floor(Math.random() * 100)}px`,
    left: `${Math.floor(Math.random() * 100)}px`,
  },
]);
const tela = document.querySelector(".tela");

window.addEventListener("keydown", (e) => moveSnake(e.key));

const moveSnake = (e) => {
  const snake = document.getElementById("snake");

  const snakePosicao = document.getElementById("snake").getBoundingClientRect();

  const comida = document.getElementById("bolinha");
  const comidaPosicao = document
    .getElementById("bolinha")
    .getBoundingClientRect();

  const comidaDevoradaDireita = snakePosicao.left - comidaPosicao.left;

  const comidaDevoradaCima = snakePosicao.top - comidaPosicao.top;

  // console.log(Number(comidaDevoradaCima).toLocaleString().split(",")[0]);

  const teste2 = !Number(comidaDevoradaCima)
    .toLocaleString()
    .split(",")[0]
    .includes("-");

  const teste3 = Math.abs(comidaDevoradaCima);

  console.log(teste3);

  if (
    //prettier-ignore
    Number(comidaDevoradaDireita).toLocaleString().split(",")[0] < 15 &&
     //prettier-ignore
    !Number(comidaDevoradaDireita).toLocaleString().split(",")[0].includes("-") &&
     //prettier-ignore
    Number(teste3)  < 20
  ) {
    comida.remove();
    comidas.value.push({
      id: comidas.value.length + 1,
      top: `${Math.floor(Math.random() * 100)}px`,
      left: `${Math.floor(Math.random() * 100)}px`,
    });
    tamanhoDaCobra.value = tamanhoDaCobra.value + 5;
    snake.style.height = `${tamanhoDaCobra.value}px`;
    pontos.value = pontos.value + 1;

    // alert("comeu");
  }

  //Todo: fazer a comida sumir e aparecer em outro lugar quando a cobra encostar nela
  //   comida.remove();

  //   comidas.value.push({
  //     id: comidas.value.length + 1,
  //     top: `${Math.floor(Math.random() * 1000)}px`,
  //     left: `${Math.floor(Math.random() * 1000)}px`,
  //   });

  //   snake.style.height = "40px";

  //Todo========================================================================

  const fimDaTela = document.querySelector(".tela").getBoundingClientRect();

  const teste = snake.getBoundingClientRect();

  // if (snake.offsetTop <= 2) alert("Game Over");

  // if (snake.offsetLeft <= 6) alert("Game Over");

  // if (snake.offsetTop >= 845) alert("Game Over");

  if (e === "ArrowUp") {
    up.value = up.value + 10;
    snake.style.marginBottom = `${up.value}px`;
    snake.style.rotate = "180deg";
  } else if (e === "ArrowDown") {
    down.value = down.value + 10;
    snake.style.marginTop = `${down.value}px`;
    snake.style.rotate = "180deg";
  } else if (e === "ArrowLeft") {
    left.value = left.value + 10;
    snake.style.marginRight = `${left.value}px`;
    snake.style.rotate = "90deg";
  } else if (e === "ArrowRight") {
    right.value = right.value + 10;
    snake.style.marginLeft = `${right.value}px`;
    snake.style.rotate = "90deg";
  }
};
</script>

<style scoped>
.titleGame {
  text-align: center;
}

.headerGame {
  display: inline-flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
}

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
  height: 35px;
  background-color: #0bd644;
  position: absolute;
  border-radius: 20px;
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

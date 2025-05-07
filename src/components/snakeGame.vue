<template>
  <main class="containerGame" v-if="!isOpenModalFimDeJogo">
    <section v-if="jogoRodando">
      <h3>Snake game</h3>
      <div class="headerContainer">
        <RouterLink class="link" to="/">Voltar para a tela inicial</RouterLink>
        <h3>score: {{ score }}</h3>
      </div>
    </section>
    <section v-else>
      <button
        style="margin-bottom: 10px"
        class="btn btn-danger"
        @click="reiniciarJogo"
      >
        Recomeçar o jogo
      </button>
    </section>
    <canvas ref="gameCanvas"></canvas>

    <section class="controls">
      <button
        class="btn btn-primary"
        @click="() => changeDirection(null, 'ArrowUp')"
      >
        ↑
      </button>

      <button
        class="btn btn-primary"
        @click="() => changeDirection(null, 'ArrowLeft')"
      >
        ←
      </button>

      <button
        class="btn btn-primary"
        @click="() => changeDirection(null, 'ArrowRight')"
      >
        →
      </button>

      <button
        class="btn btn-primary"
        @click="() => changeDirection(null, 'ArrowDown')"
      >
        ↓
      </button>
    </section>
  </main>

  <div v-else>
    <Modal />
  </div>
</template>

<script>
import Modal from "./ModalComponent.vue";

export default {
  name: "SnakeGame",
  components: { Modal },
  data() {
    return {
      canvas: null,
      ctx: null,
      snake: [{ x: 250, y: 300 }],
      blockSize: 20,
      posicaoComidaX: null,
      posicaoComidaY: null,
      calcularPosicaoComida: true,
      score: 0,
      jogoRodando: true,
      isOpenModalFimDeJogo: true,
    };
  },
  methods: {
    mudarTamanhoCanvas() {
      if (window.innerWidth <= 600) {
        this.canvas.width = innerWidth / 1.5;
        this.canvas.height = innerHeight / 2;
      } else {
        this.canvas.width = 500;
        this.canvas.height = 600;
      }
      this.drawSnake();
    },

    gameOver() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      // if (window.innerWidth < 600) {
      //   this.ctx.fillStyle = "red";
      //   this.ctx.font = "20px Comic Sans MS";
      //   this.ctx.fillText("Game Over!", 150 / 3, 250 / 2);
      //   this.ctx.fillStyle = "black";
      //   this.ctx.font = "10px Comic Sans MS";
      //   this.ctx.fillText("Pressione R para jogar novamente", 90 / 3, 300 / 2);
      //   this.jogoRodando = false;
      // } else {
      //   this.ctx.fillStyle = "red";
      //   this.ctx.font = "30px Comic Sans MS";
      //   this.ctx.fillText("Game Over!", 150, 250);
      //   this.ctx.fillStyle = "black";
      //   this.ctx.font = "20px Comic Sans MS";
      //   this.ctx.fillText("Pressione R para jogar novamente", 90, 300);
      // }
      this.isOpenModalFimDeJogo = true;
      this.jogoRodando = false;
    },
    reiniciarJogo() {
      window.location.reload();
    },

    resetSnake(head) {
      this.snake.unshift(head);
      this.snake.pop();
      this.criarComida();
      this.drawSnake();
    },
    calcularPosicaoComidaMath() {
      if (this.calcularPosicaoComida) {
        //prettier-ignore
        this.posicaoComidaX = Math.floor(Math.random() * (this.canvas.width / this.blockSize)) * this.blockSize;
        //prettier-ignore
        this.posicaoComidaY = Math.floor(Math.random() * (this.canvas.height / this.blockSize)) * this.blockSize;
        this.calcularPosicaoComida = false;
      }
    },
    criarComida() {
      this.calcularPosicaoComidaMath();

      this.ctx.fillStyle = "red";
      this.ctx.fillRect(
        this.posicaoComidaX,
        this.posicaoComidaY,
        window.innerWidth <= 600 ? 25 : 30,
        window.innerWidth <= 600 ? 25 : 30
      );
    },
    drawSnake() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.snake.forEach((segment) => {
        this.ctx.fillStyle = "green";
        if (window.innerWidth <= 600) {
          this.ctx.fillRect(segment.x / 2, segment.y / 2, 25, 25);
        } else {
          this.ctx.fillRect(segment.x, segment.y, 30, 30);
        }
      });

      this.criarComida();
    },
    moveSnake() {
      const head = { ...this.snake[0] };

      if (this.direction === "ArrowUp") {
        head.y -= this.blockSize;
      }
      if (this.direction === "ArrowDown") {
        head.y += this.blockSize;
      }
      if (this.direction === "ArrowLeft") {
        head.x -= this.blockSize;
      }
      if (this.direction === "ArrowRight") {
        head.x += this.blockSize;
      }

      // console.log(this.canvas.width + head.x - head.x);

      // console.log(this.canvas.width);

      // console.log(
      //   "calculo",
      //   this.canvas.width + window.innerWidth - window.innerWidth
      // );

      if (innerWidth <= 600) {
        if (
          // head.x > this.canvas.width - 20 ||
          head.x === -30 ||
          // head.y > this.canvas.height - 10 ||
          head.y === -20
        ) {
          this.gameOver();
          return;
        }
      } else {
        if (
          head.x > this.canvas.width - 20 ||
          head.x === -30 ||
          head.y > this.canvas.height - 10 ||
          head.y === -20
        ) {
          this.gameOver();
          return;
        }
      }

      this.snake.map((item, index) => {
        //prettier-ignore
        if (head.x === item.x && head.y === item.y && index !== 0) {
          this.gameOver();
          return;
        }
      });

      if (
        //prettier-ignore
        head.y === this.posicaoComidaY && ((head.x - 10) === this.posicaoComidaX || (head.x + 10) === this.posicaoComidaX)
      ) {
        this.calcularPosicaoComida = true;
        this.snake.push({ x: 250, y: 300 });
        this.resetSnake(head);
        this.score += 1;
      }

      this.resetSnake(head);
    },
    changeDirection(event, button) {
      const key = button || event.key;
      if (this.jogoRodando && (key !== "r" || key !== "R")) {
        this.direction = key;
        this.moveSnake();
      }

      //prettier-ignore
      if (this.jogoRodando === false && (key === "r" || key === "R")) this.reiniciarJogo();

      // if (!this.jogoRodando && (key !== "r" || key !== "R")) {
      //   alert("Você perdeu! Tente novamente clicando no botão de reiniciar.");
      // }
    },
  },
  mounted() {
    this.canvas = this.$refs.gameCanvas;

    if (this.canvas) {
      this.ctx = this.canvas.getContext("2d");
      this.mudarTamanhoCanvas();
      window.addEventListener("resize", this.mudarTamanhoCanvas);
      window.addEventListener("keydown", this.changeDirection);
      this.drawSnake();
    }
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.changeDirection);
  },
};
</script>

<style scoped>
canvas {
  background-color: white;
}

.headerContainer {
  display: flex;
  flex-direction: row;
  gap: 15px;
  align-items: center;
  justify-content: space-between;
}

.link {
  color: #0bd644;
}

.link:hover {
  color: #05992f;
  background-color: #0bd644;
  padding: 7px;
  border-radius: 20px;
}

.controls {
  display: none;
  /* display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: center; */
}

@media (max-width: 600px) {
  .containerGame {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: calc(100dvw - 50px);
    height: calc(100dvh - 50px);
    transform: translate(-50%, -50%);
  }
}
@media (max-width: 400px) {
  .controls {
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: center;
  }

  canvas {
    background-color: white;
    margin-bottom: 10px;
  }

  .headerContainer {
    flex-direction: column;
    gap: 0px;
  }
}
</style>

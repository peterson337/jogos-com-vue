<template>
  <h3>Snake game</h3>
  <div class="headerContainer">
    <RouterLink class="link" to="/">Voltar para a tela inicial</RouterLink>
    <h3>score: {{ score }}</h3>
  </div>
  <canvas ref="gameCanvas" width="500" height="600"></canvas>
</template>

<script>
export default {
  name: "SnakeGame",
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
    };
  },
  methods: {
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
      //prettier-ignore
      this.ctx.fillRect(this.posicaoComidaX, this.posicaoComidaY, this.blockSize, this.blockSize);
    },
    drawSnake() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.snake.forEach((segment) => {
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(segment.x, segment.y, this.blockSize, this.blockSize);
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
    changeDirection(event) {
      const key = event.key;
      this.direction = key;
      this.moveSnake();
    },
    update() {
      this.drawSnake();
    },
  },
  mounted() {
    this.canvas = this.$refs.gameCanvas;
    this.ctx = this.canvas.getContext("2d");
    window.addEventListener("keydown", this.changeDirection);
    this.update();
    this.criarComida();
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
</style>

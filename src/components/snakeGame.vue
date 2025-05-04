<template>
  <div>
    <canvas ref="gameCanvas" width="500" height="600"></canvas>
  </div>
</template>

<script>
export default {
  name: "SnakeGame",
  data() {
    return {
      canvas: null,
      ctx: null,
      snake: [{ x: 250, y: 300 }],
      direction: "UP",
      blockSize: 20,
    };
  },
  methods: {
    drawSnake() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.snake.forEach((segment) => {
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(segment.x, segment.y, this.blockSize, this.blockSize);
      });
    },
    moveSnake() {
      const head = { ...this.snake[0] };
      if (this.direction === "UP") head.y -= this.blockSize;
      if (this.direction === "DOWN") head.y += this.blockSize;
      if (this.direction === "LEFT") head.x -= this.blockSize;
      if (this.direction === "RIGHT") head.x += this.blockSize;

      this.snake.unshift(head);
      this.snake.pop();
    },
    changeDirection(event) {
      this.gameLoop();
      const key = event.key;
      if (key === "ArrowUp" && this.direction !== "DOWN") this.direction = "UP";
      if (key === "ArrowDown" && this.direction !== "UP")
        this.direction = "DOWN";
      if (key === "ArrowLeft" && this.direction !== "RIGHT")
        this.direction = "LEFT";
      if (key === "ArrowRight" && this.direction !== "LEFT")
        this.direction = "RIGHT";
    },
    gameLoop() {
      this.moveSnake();
      this.drawSnake();
    },
  },
  mounted() {
    this.canvas = this.$refs.gameCanvas;
    this.ctx = this.canvas.getContext("2d");
    window.addEventListener("keydown", this.changeDirection);
    this.gameLoop();
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.changeDirection);
  },
};
</script>

<style>
canvas {
  background-color: white;
}
</style>

<template>
  <h2>Snake Game</h2>

  <main class="tela">
    <div id="snake"></div>
  </main>
</template>

<script setup>
window.addEventListener("keyup", (e) => {
  //   console.log(e.key);

  const snake = document.getElementById("snake");
  console.log(snake);
  if (e.key === "ArrowUp") {
    snake.style.bottom = `10px`;
  }
  //
  //  else if (e.key === "ArrowDown") {
  //     document.getElementById("snake").style.transform = `translateY(20px)`;
  //   } else if (e.key === "ArrowLeft") {
  //     document.getElementById("snake").style.transform = `translateX(-20px)`;
  //   } else if (e.key === "ArrowRight") {
  //     document.getElementById("snake").style.transform = `translateX(20px)`;
  //   }
});
</script>

<style scoped>
.tela {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 120px);
  width: calc(100vw - 100px);
  padding: 10px;
  border: 2px solid white;
  border-radius: 20px;
}

#snake {
  position: relative;
  width: 20px;
  height: 20px;
  background-color: #0bd644;
  /* border-radius: 20px; */
  /* position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
}
</style>

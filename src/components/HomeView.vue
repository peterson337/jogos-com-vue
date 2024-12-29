<template>
  <h2>Bem vindo ao Jogos feito com o vue</h2>
  <h3>Escolha abaixo algum jogo</h3>
  <nav class="nav">
    <RouterLink style="color: #0bd644" class="react" to="/jogo-da-forca"
      >Jogo da forca</RouterLink
    >

    <!-- <a href="" class="react">Jogos com react</a> -->
  </nav>
</template>

<style scoped>
.nav {
  display: flex;
  flex-direction: column;
}

.react {
  color: #61dafb;
}

.react:hover {
  text-decoration: underline;
  color: #52bbd8;
}
</style>

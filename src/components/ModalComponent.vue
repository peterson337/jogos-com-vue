<template>
  <section class="backgroundModal">
    <div class="modalContent">
      <div v-if="content === 'snakeGame'">
        <h3>Game over!</h3>
        <h4>Pressione R ou clique no botão vermelho para jogar novamente</h4>
        <button
          style="margin-bottom: 10px"
          class="btn btn-danger"
          @click="reiniciarJogo"
        >
          Recomeçar o jogo
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ModalComponent",
  props: {
    content: {
      content: String,
    },
  },

  methods: {
    reiniciarJogo() {
      window.location.reload();
    },
  },

  mounted() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "r" || e.key === "R") {
        this.reiniciarJogo();
      }
    });
  },
};
</script>

<style scoped>
.backgroundModal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modalContent {
  background: #212529;
  width: 90%;
  height: 15rem;
  max-width: 500px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.3s ease-out;
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
}
</style>

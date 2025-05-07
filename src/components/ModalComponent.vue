<template>
  <section class="backgroundModal">
    <div class="modalContent">
      <h3>Hello world!</h3>
    </div>
  </section>
</template>

<script setup></script>

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
}
</style>

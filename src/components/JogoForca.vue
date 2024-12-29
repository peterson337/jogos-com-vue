<script setup>
import { reactive, ref, onMounted } from "vue";
import JogoForcaLaout from "./JogoForcaLaout.vue";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { RouterLink, RouterView } from "vue-router";

const apiKey = import.meta.env.VITE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
// prettier-ignore
const model = genAI.getGenerativeModel({model: "gemini-1.5-flash",});

const estado = ref("");
const messageError = ref("");
const isUpdateUi = ref("inicio");
const input = ref("");

const wordsKey = reactive([
  "Nome aleatório de um personagem",
  "Nome aleatório de um filme",
  "Nome aleatório de um anime que não seja naruto",
  "Nome aleatório de um animal",
  "Nome aleatório de uma fruta",
  "Nome aleatório de um objeto",
  "Nome aleatório de uma comida",
  "Nome aleatório de um jogo de video game",
]);
const submit = async () => {
  isUpdateUi.value = "loading";

  try {
    const result = await model.generateContent(
      `Eu quero que a única coisa que você escreva seja um ${estado.value} ${input.value} e não separe o nome por espaço separe por hífen`
    );
    estado.value = result.response
      .text()
      .replace(/^-+|-+$/g, "")
      .trim();
    isUpdateUi.value = "";
    input.value = "";
  } catch (error) {
    console.log(error);
    isUpdateUi.value = "error";
    messageError.value = error.message;
  }
};

function voltarParaAtelaInicial() {
  isUpdateUi.value = "inicio";
}
</script>

<template>
  <section v-if="isUpdateUi === 'inicio'" class="container">
    <div class="teste">
      <nav>
        <RouterLink class="link" to="/">Voltar para a tela inicial</RouterLink>
      </nav>
      <h3>Jogo da forca</h3>
      <select
        class="form-select"
        aria-label="Default select example"
        v-model="estado"
        style="margin: 10px"
      >
        <option value="" selected style="display: none">
          Selecione algo...
        </option>
        <option v-for="item in wordsKey" :key="item">
          {{ item }}
        </option>
      </select>

      <input
        type="text"
        v-model="input"
        placeholder="Pesquisa por algo especifico"
        class="form-control"
      />

      <button
        style="margin-top: 10px"
        type="button"
        class="btn btn-primary"
        @click="submit"
      >
        Começar o Jogo
      </button>
    </div>
  </section>

  <!-- HTML que será carregado na tela de loading -->
  <section
    style="display: flex; flex-direction: column"
    v-else-if="isUpdateUi === 'error'"
  >
    <h2 style="margin-bottom: 30px">Não foi possível carregar jogo</h2>
    <h3>Mensagem de erro: {{ messageError }}</h3>
  </section>

  <section
    style="display: flex; flex-direction: column"
    v-else-if="isUpdateUi === 'loading'"
  >
    <h2 style="margin-bottom: 30px">Aguarde o jogo está carregando...</h2>

    <div
      class="spinner-border text-primary"
      style="width: 10rem; height: 10rem; margin: 0 auto"
      role="status"
    >
      <span class="visually-hidden">Loading...</span>
    </div>
  </section>

  <section v-else>
    <JogoForcaLaout
      :estado="estado"
      :isUpdateUi="isUpdateUi"
      @voltarParaAtelaInicial="voltarParaAtelaInicial"
    />
  </section>
</template>

<style scoped>
.link {
  color: #0bd644;
}

.link:hover {
  color: #05992f;
  background-color: #0bd644;
  padding: 7px;
  border-radius: 20px;
}

.teste {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

section {
  display: flex;
  justify-content: center;
  align-content: center;
}

.container {
  background-color: rgb(116, 116, 116);
  width: 100%;
  padding: 10rem;
  border-radius: 20px;
  height: 10rem;
}

@media (max-width: 600px) {
  .container {
    width: 100%;
    height: 15rem;
    padding: 10px;
  }
}
</style>

<script setup>
import { reactive, ref, onMounted } from "vue";
import JogoForcaLaout from "./JogoForcaLaout.vue";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { RouterLink, RouterView } from "vue-router";

const estado = ref("");
const messageError = ref("");
const isUpdateUi = ref("inicio");
const input = ref("");

const apiKey = import.meta.env.VITE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
// prettier-ignore
const model = genAI.getGenerativeModel({model: 'gemini-2.0-flash',});

// duna-parte-dois
const wordsKey = reactive([
  "um único personagem",
  "um único mangá",
  "um único filme",
  "um único animal",
  "uma única a fruta",
  "um único objeto",
  "uma única comida",
  "um único jogo de video game",
  "uma única cor",
  "uma única música",
  "uma única cidade",
  "um  único país",
  "uma única banda",
  "uma única serie",
  "um única livro",
]);

const submit = async () => {
  isUpdateUi.value = "loading";
  try {
    const result = await model.generateContent(
      `Escreva sempre apenas o nome aleatório de ${estado.value} ${input.value}, sem repetir nomes já mencionados anteriormente. Não inclua mais de um nome na mesma resposta, separe as palavras por hífen e utilize apenas letras minúsculas.`
    );
    estado.value = result.response
      .text()
      .replace(/^-+|-+$/g, "")
      .trim()
      .replace(/\s+/g, "-");
    isUpdateUi.value = "";
    input.value = "";
  } catch (error) {
    console.log(error);
    isUpdateUi.value = "error";
    messageError.value = error.message;
  }
};

const mudarValorDropdown = (e) => {
  const dropdown = document.getElementById("dropdown");
  dropdown.value = e.target.textContent;
  estado.value = e.target.textContent;
};

function voltarParaAtelaInicial() {
  isUpdateUi.value = "inicio";
}

const formatarPalavra = (value) => {
  if (value === "um único jogo de video game") {
    const palavraFormatada = value.substring(0, value.length - 13);
    return palavraFormatada + "...";
  }
  return value;
};
</script>

<template>
  <section v-if="isUpdateUi === 'inicio'" class="container">
    <div class="teste">
      <nav>
        <RouterLink class="link" to="/">Voltar para a tela inicial</RouterLink>
      </nav>
      <h3>Jogo da forca</h3>
      <div class="dropdown">
        <input
          class="dropdown-toggle form-select"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style="margin-bottom: 10px"
          value="Escolha uma palavra"
          id="dropdown"
        />

        <ul class="dropdown-menu dropdownMenu">
          <div style="height: 200px; overflow-y: scroll">
            <p
              class="itemsDropdown"
              v-for="item in wordsKey"
              :key="item"
              @click="(e) => mudarValorDropdown(e)"
            >
              {{ formatarPalavra(item) }}
            </p>
          </div>
        </ul>
      </div>

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
    <h2 style="margin-bottom: 30px">Não foi possível carregar o jogo</h2>
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
.dropdownMenu {
  padding: 10px;
  border-radius: 20px;
  /* border: 1px solid #000; */
  width: 15rem;
  outline: none;
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

.itemsDropdown {
  cursor: pointer;
  width: 95%;
  padding-right: 10px;
}

.itemsDropdown:hover {
  cursor: pointer;
  background-color: darkturquoise;
  border-radius: 20px;
  padding: 10px;
}

@media (max-width: 600px) {
  .container {
    width: 100%;
    height: 15rem;
    padding: 10px;
  }
}
</style>

<template>
  <!-- HTML que srá carregado após o jogo ser carregado -->
  <section class="containerJogoForca">
    <section class="headerContainer">
      <button
        type="button"
        class="btn btn-danger btnCancel"
        @click="alterarEstado"
      >
        Voltar
      </button>
      <p class="errroCount">erros: {{ countError }}/7</p>
    </section>
    <br />

    <div class="teste">
      <section v-for="item in arrayVersaoFinal" :key="item.id" class="palavra">
        {{ item.letra }}
      </section>
    </div>
    <br />
    <div class="flexRow">
      <button
        :id="item"
        v-for="item in botoes"
        :key="item"
        class="botoes"
        @click="enviarLetra(item)"
      >
        {{ item }}
      </button>
    </div>
    <div class="btnAndInput">
      <input
        type="text"
        class="input"
        maxlength="1"
        placeholder="Escreva uma letra"
        @keypress.enter="enviarLetra(input, `input`)"
        v-model="input"
      />
      <button
        type="button"
        class="btn btn-info"
        @click="enviarLetra(input, `input`)"
      >
        Enviar letra
      </button>
    </div>
  </section>

  <section class="backgroundModal" v-if="fimDeJogo">
    <div class="modalContent">
      <div>
        <div v-if="countError === 7">
          <h3>Você Perdeu 😞</h3>
          <h4>
            A palavra correta é:
            <strong>
              <i> {{ estado }} </i></strong
            >
          </h4>
        </div>

        <div v-else>
          <h3>Parabéns você Ganhou 😁</h3>
        </div>

        <button
          type="button"
          class="btn btn-danger"
          style="width: 140px; margin: 15px auto"
          @click="alterarEstado"
        >
          Voltar
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    estado: {
      type: Boolean,
    },
  },
  setup(props, { emit }) {
    const alterarEstado = () => emit("voltarParaAtelaInicial");
    const word = ref([]);
    const palavraFormatada = props.estado.toLowerCase();

    const validarHifen = palavraFormatada.indexOf("-");

    // alert(
    //   `${
    //     validarHifen === -1
    //       ? `A palavra que deve ser adivinhada tem ${palavraFormatada.length} letras e não possuí hífen.`
    //       : `A palavra que deve ser adivinhada tem ${palavraFormatada.length} letras e possuí hífen.`
    //   } `
    // );
    const countError = ref(0);
    const fimDeJogo = ref(false);

    const array = ref(palavraFormatada);
    const arrayVersaoFinal = ref([]);
    const input = ref("");

    const formatar = array.value.split("");

    formatar.forEach((item, index) => {
      arrayVersaoFinal.value.push({
        letra: "_",
        id: index,
      });
    });

    // arrayVersaoFinal.value.pop();

    const botoes = ref([
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      "ç",
      "ã",
      ":",
      "á",
      "é",
      "í",
      "ó",
      "ú",
      "à",
      "â",
      "ê",
      "ô",
      "ã",
      "õ",
      "!",
      "?",
      ".",
      ",",
      ";",
      ":",
      "_",
      "(",
      ")",
      "[",
      "]",
      "{",
      "}",
      "'",
      '"',
      "/",
      // "\\",
      "|",
      "@",
      "#",
      "$",
      "%",
      "&",
      "*",
      "+",
      "=",
      "<",
      ">",
      // "ü",
      // "ö",
      // "ä"
    ]);

    const enviarLetra = (letra) => {
      const letraFormatada = letra.toLowerCase();
      if (letra !== "-") {
        const btnLetra = document.getElementById(`${letraFormatada}`);
        btnLetra.classList.remove("botoes");
        btnLetra.classList.add("disable");
        btnLetra.disabled = true;
      }

      formatar.forEach((item, index) => {
        if (item === letraFormatada) {
          arrayVersaoFinal.value[index].letra = letraFormatada;
        }
      });

      const validation = palavraFormatada.indexOf(letraFormatada);

      const ifJogadorGanhou = arrayVersaoFinal.value
        .map((item) => item.letra)
        .join("");

      ifJogadorGanhou === palavraFormatada && (fimDeJogo.value = true);
      input.value = "";
      if (validation === -1 && countError.value < 7) {
        countError.value++;
        countError.value === 7 && (fimDeJogo.value = true);
      }
    };

    if (validarHifen !== -1) enviarLetra("-");

    return {
      alterarEstado,
      word,
      botoes,
      enviarLetra,
      countError,
      fimDeJogo,
      estado: props.estado,
      arrayVersaoFinal,
      input,
    };
  },
};
</script>

<style scoped>
.btnAndInput {
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin: 15px auto;
}

.btnCancel {
  width: 140px;
}

.errroCount {
  font-size: 20px;
}

.headerContainer {
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: center;
  align-content: center;
}

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

.disable {
  background-color: rgb(111, 138, 146);
  padding: 15px;
  width: 55px;
  border-radius: 15px;
  font-size: 25px;
  cursor: not-allowed;
  color: white;
  opacity: 0.3;
}

.botoes {
  background-color: deepskyblue;
  padding: 15px;
  width: 55px;
  border-radius: 15px;
  font-size: 25px;
  cursor: pointer;
  color: black;
  border: none;
  outline: none;
}

.botoes:hover {
  background-color: rgb(0, 144, 192);
  color: white;
}

.flexRow {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 15px;
  width: 80%;
  margin: auto;
  height: 30rem;
  overflow: auto;
}

.teste {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  height: 6rem;
  overflow: auto;
}
.palavra {
  display: flex;
  flex-direction: row;
  font-size: 27px;
  margin: 0px 3px;
  /* word-break: break-word; */
}

.containerJogoForca {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 50%;
  padding: 20px 0px;
  background-color: rgb(116, 116, 116);
  border-radius: 20px;
}

@media (max-width: 900px) {
  .br {
    display: none;
  }

  .teste {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: start;
    text-align: start;
    width: 100%;
    height: 8rem;
    overflow: auto;
  }

  .palavra {
    display: flex;
    flex-direction: row;
    font-size: 27px;
    margin: 0px 3px;
    /* word-break: break-word; */
    /* background-color: aqua; */
  }

  .btnCancel {
    width: auto;
  }

  .containerJogoForca {
    width: 35rem;
    padding: 20px;
  }

  .containerJogoForca {
    width: 17rem;
  }

  .flexRow {
    width: 100%;
    height: 14rem;
    overflow: auto;
    margin-top: 5px;
  }

  .btnAndInput {
    flex-direction: column;
  }

  .input {
    padding: 10px;
  }
}

@media (max-width: 400px) {
}
</style>

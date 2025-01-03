<template>
    <div>
      <h1>Asistente Virtual</h1>
      <p>{{ mensaje }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from "vue";
  import annyang from "annyang";
  import axios from "axios";
  
  const mensaje = ref("Esperando comandos de voz...");
  const keywords = ["Domi", "do mi", "domy", "dome", "domingo", "domene", "dominion"]; // Array de keywords
  
  // Función para verificar si el texto contiene alguna keyword
  const contieneKeyword = (texto) => {
    return keywords.some((keyword) => texto.toLowerCase().includes(keyword.toLowerCase()));
  };
  
  // Función para enviar comandos al backend
  const enviarComando = async (comando) => {
    try {
        console.log("Envio al back el commando: " + comando)
      //const respuesta = await axios.post("http://localhost:5000/comando", { texto: comando });
      //mensaje.value = `Backend dice: ${respuesta.data.respuesta}`;
    } catch (error) {
      console.error("Error al enviar el comando al backend:", error);
      mensaje.value = "Error al comunicarme con el backend.";
    }
  };
  
  // Configurar escucha continua con keywords
  const configurarEscucha = () => {
    if (annyang) {
      annyang.setLanguage("es-ES");
      annyang.addCallback("result", (resultados) => {
        const texto = resultados[0]; // El texto reconocido más probable
        if (contieneKeyword(texto)) {
          mensaje.value = `Comando detectado: ${texto}`;
          enviarComando(texto); // Enviar el comando al backend
        } else {
          mensaje.value = "No se detectó ninguna keyword.";
        }
      });
  
      annyang.start({ continuous: true });
      mensaje.value = "Escuchando... Di algo.";
    } else {
      console.error("El reconocimiento de voz no es compatible con este navegador.");
      mensaje.value = "Tu navegador no soporta reconocimiento de voz.";
    }
  };
  
  onMounted(() => {
    configurarEscucha();
  });
  
  onUnmounted(() => {
    if (annyang) annyang.abort();
  });
  </script>
  
  <style scoped>
  h1 {
    font-family: Arial, sans-serif;
    color: #4caf50;
  }
  
  p {
    font-size: 18px;
    color: #afafaf;
  }
  </style>
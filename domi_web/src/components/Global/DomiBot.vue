<template>
  <div>
    <!-- Domi flotante -->
    <div
      class="domi"
      :style="{ bottom: `${position.y}px`, right: `${position.x}px` }"
      @mousedown="startDrag"
      @mouseup="stopDrag"
      @mouseleave="stopDrag"
      @mousemove="drag"
    >
      <i class="fa fa-microphone"></i>
    </div>

    <!-- Mensaje de estado -->
    <div v-if="showMessage" class="domi-message">
      <p>{{ mensaje }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import annyang from "annyang";

// Estado inicial
const mensaje = ref("Esperando comandos de voz...");
const keywords = ["Domi", "do mi", "domy", "dome", "domingo", "domene", "dominion"];
const position = ref({ x: 20, y: 20 }); // Relativo a la esquina inferior derecha
const isDragging = ref(false);
const offset = ref({ x: 0, y: 0 });
const showMessage = ref(false); // Mostrar mensaje flotante

// Función para verificar palabras clave
const contieneKeyword = (texto) => {
  return keywords.some((keyword) => texto.toLowerCase().includes(keyword.toLowerCase()));
};

// Configuración de comandos y reconocimiento de voz
const configurarEscucha = () => {
  if (annyang) {
    annyang.setLanguage("es-ES");
    annyang.addCallback("result", (resultados) => {
      const texto = resultados[0];
      if (contieneKeyword(texto)) {
        mensaje.value = `Comando detectado: ${texto}`;
        enviarComando(texto);
      } else {
        mensaje.value = "No se detectó ninguna keyword.";
        showMessage.value = true;
        setTimeout(() => (showMessage.value = false), 3000); // Oculta el mensaje después de 3 segundos
      }
    });

    annyang.start({ continuous: true });
    mensaje.value = "Escuchando... Di algo.";
  } else {
    console.error("El reconocimiento de voz no es compatible con este navegador.");
    mensaje.value = "Tu navegador no soporta reconocimiento de voz.";
  }
};

// Función para enviar comandos al backend
const enviarComando = async (comando) => {
  console.log("Envio al back el comando: " + comando);
  mensaje.value = `Comando detectado: ${comando}`;
  showMessage.value = true;
  setTimeout(() => (showMessage.value = false), 3000); // Oculta el mensaje después de 3 segundos
};

// Drag-and-drop
const startDrag = (event) => {
  isDragging.value = true;
  offset.value.x = event.clientX - (window.innerWidth - position.value.x);
  offset.value.y = event.clientY - (window.innerHeight - position.value.y);
};

const stopDrag = () => {
  isDragging.value = false;
};

const drag = (event) => {
  if (isDragging.value) {
    position.value.x = window.innerWidth - (event.clientX - offset.value.x);
    position.value.y = window.innerHeight - (event.clientY - offset.value.y);

    // Limitar el movimiento dentro de los bordes de la ventana
    position.value.x = Math.max(0, Math.min(window.innerWidth - 50, position.value.x));
    position.value.y = Math.max(0, Math.min(window.innerHeight - 50, position.value.y));
  }
};

// Lifecycle hooks
onMounted(() => {
  configurarEscucha();
});

onUnmounted(() => {
  if (annyang) annyang.abort();
});
</script>

<style scoped>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

/* Domi flotante */
.domi {
  position: fixed;
  width: 50px;
  height: 50px;
  background-color: #3498db;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 20px;
  cursor: grab;
  transition: transform 0.3s ease;
}

.domi:active {
  cursor: grabbing;
}

.domi-message {
  position: fixed;
  bottom: 80px;
  right: 20px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px 15px;
  border-radius: 10px;
  font-size: 14px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
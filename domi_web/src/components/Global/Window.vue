<template>
    <div
      v-show="visible"
      :style="modalStyle"
      class="modal"
      @mousedown="startDrag"
    >
      <div class="modal-header">
        <span>{{ title }}</span>
        <div class="modal-controls">
          <button @click="toggleMinimize">_</button>
          <button @click="toggleFullscreen">[]</button>
          <button @click="closeModal">X</button>
        </div>
      </div>
      <div class="modal-content">
        <div ref="contentRef" id="contentRef"></div>
      </div>
    </div>
  </template>
  
  <script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: "Modal",
  },
  url: {
    type: String,
    default: "",
  },
  visible: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["close", "minimize"]);

const isDragging = ref(false);
const isFullscreen = ref(false);
const position = ref({ top: 100, left: 100 });
const size = ref({ width: 400, height: 300 });
const contentRef = ref(null); // Referencia al contenedor de contenido

const modalStyle = computed(() => {
  if (isFullscreen.value) {
    return {
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
    };
  }
  return {
    top: `${position.value.top}px`,
    left: `${position.value.left}px`,
    width: `${size.value.width}px`,
    height: `${size.value.height}px`,
  };
});

let unmountMicrofrontend = null; // Referencia para desmontar el microfrontend

const loadMicrofrontend = async () => {
  if (!props.url || !contentRef.value) return;

  try {
    // Cargar dinámicamente el microfrontend desde la URL
    const urlSer = 'https://192.168.1.178:80/';
    debugger;
    const module = await import(/* @vite-ignore */ 'https://192.168.1.178:80/microfrontends/domi_Scheduler/domi-scheduler-web.es.js');
    if (module.mountDomiScheduler && typeof module.mountDomiScheduler === "function") {
      unmountMicrofrontend = module.unmountDomiScheduler;
      module.mountDomiScheduler(contentRef.value);
    } else {
      console.error("El módulo no tiene funciones de montaje válidas.");
    }
  } catch (error) {
    console.error("Error al cargar el microfrontend:", error);
  }
};

const unloadMicrofrontend = () => {
  if (unmountMicrofrontend && typeof unmountMicrofrontend === "function") {
    unmountMicrofrontend(contentRef.value);
    unmountMicrofrontend = null;
  }
};

onMounted(() => {
  loadMicrofrontend();
});

onBeforeUnmount(() => {
  unloadMicrofrontend();
});

const startDrag = (event) => {
  if (isFullscreen.value) return;
  isDragging.value = true;
  const offsetX = event.clientX - position.value.left;
  const offsetY = event.clientY - position.value.top;

  const onMouseMove = (e) => {
    if (!isDragging.value) return;
    position.value.top = e.clientY - offsetY;
    position.value.left = e.clientX - offsetX;
  };

  const onMouseUp = () => {
    isDragging.value = false;
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  };

  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", onMouseUp);
};

const toggleMinimize = () => {
  emit("minimize");
};

const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value;
};

const closeModal = () => {
  emit("close");
  unloadMicrofrontend(); // Desmontar el microfrontend al cerrar el modal
};
</script>
  
  <style scoped>
  .modal {
    position: absolute;
    border: 1px solid #ccc;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    background: white;
    resize: both;
    overflow: hidden;
    z-index: 1000;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    color: black;
    padding: 5px 10px;
    cursor: move;
    border-bottom: 1px solid #ccc;
  }
  
  .modal-controls button {
    background: none;
    border: none;
    color: black;
    cursor: pointer;
    font-size: 14px;
  }
  
  .modal-content {
    padding: 10px;
    height: calc(100% - 30px);
    overflow: auto;
  }
  </style>
  
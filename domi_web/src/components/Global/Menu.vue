<template>
    <div :class="['sidebar', { collapsed: isCollapsed }]">
      <!-- Botón de colapsar/expandir -->
      <div class="toggle-button" @click="toggleSidebar">
        <i :class="isCollapsed ? 'fa fa-bars' : 'fa fa-times'"></i>
      </div>
  
      <!-- Módulos (solo visibles si no está colapsado) -->
      <div v-if="!isCollapsed" class="modules">
        <div v-for="module in modules" :key="module.name" class="module-item">
          <i :class="module.icon" class="module-icon"></i>
          <span class="module-tooltip">{{ module.name }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  // Simulación de módulos cargados
  const modules = ref([
    { name: "Inicio", icon: "fa fa-home" },
    { name: "Usuarios", icon: "fa fa-users" },
    { name: "Ajustes", icon: "fa fa-cog" },
    { name: "Estadísticas", icon: "fa fa-chart-bar" },
    { name: "Ayuda", icon: "fa fa-question-circle" },
  ]);
  
  // Estado de colapso del menú
  const isCollapsed = ref(false);
  
  // Alterna el estado de colapso
  const toggleSidebar = () => {
    isCollapsed.value = !isCollapsed.value;
  };
  </script>
  
  <style scoped>
  body {
    margin: 0;
    font-family: Arial, sans-serif;
  }
  
  .sidebar {
    position: fixed;
    top: 20px;
    left: 20px;
    width: 50px;
    height: calc(100% - 40px);
    background-color: #2c3e50;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
    border-radius: 20px;
    transition: all 0.5s ease;
    overflow: hidden;
  }
  
  .sidebar.collapsed {
    height: 50px;
    width: 50px;
    padding: 0;
    border-radius: 50%;
  }
  
  .toggle-button {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .toggle-button:hover {
    background-color: #1abc9c;
  }
  
  .toggle-button i {
    font-size: 18px;
    color: #ecf0f1;
  }
  
  .modules {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: opacity 0.5s ease;
  }
  
  /* Elementos del menú */
  .module-item {
    width: 100%;
    text-align: center;
    margin: 10px 0;
    position: relative;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .module-item:hover {
    background-color: #34495e;
    border-radius: 10px;
  }
  
  .module-icon {
    font-size: 24px;
    color: #ecf0f1;
    transition: color 0.3s ease;
  }
  
  .module-item:hover .module-icon {
    color: #1abc9c;
  }
  
  /* Tooltip (nombre del módulo) */
  .module-tooltip {
    position: absolute;
    left: 80px;
    top: 50%;
    transform: translateY(-50%);
    background-color: #34495e;
    color: #ecf0f1;
    padding: 5px 10px;
    border-radius: 5px;
    white-space: nowrap;
    font-size: 14px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  
  .module-item:hover .module-tooltip {
    opacity: 1;
    transform: translateY(-50%) translateX(10px);
  }
  
  /* Ocultar elementos cuando el menú está colapsado */
  .sidebar.collapsed .modules {
    display: none;
  }
  </style>
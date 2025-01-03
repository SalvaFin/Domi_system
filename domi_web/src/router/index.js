import { createRouter, createWebHistory } from 'vue-router';

// Componentes (puedes crear estos archivos más adelante)
import Configuracion from '../views/Configuracion.vue';

const routes = [
  { path: '/Configuracion', name: 'Configuracion', component: Configuracion },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
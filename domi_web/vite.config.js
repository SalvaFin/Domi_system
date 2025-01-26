import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
  plugins: [vue(), mkcert()],
  server: {
    https: true, // Activar HTTPS para tu servidor de desarrollo
    port: 3000, // Cambia el puerto si lo necesitas
  },
  build: {
    outDir: 'dist', // Carpeta de salida para producción
    rollupOptions: {
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  publicDir: 'microfrontends', // Incluir la carpeta microfrontends en el servidor
})
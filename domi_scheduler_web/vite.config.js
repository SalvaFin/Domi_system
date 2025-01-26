import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
console.log('Using vite.config.js for Microfrontend!');

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: './src/main.js', // El punto de entrada de tu microfrontend
      name: 'DomiScheduler', // Nombre de la librería que estás generando
      fileName: (format) => `domi-scheduler-web.${format}.js`,
      formats: ['es'], // Formato ESM
    },
    rollupOptions: {
      external: id => /^vue/.test(id), // Cualquier dependencia que empiece con "vue" será tratada como externa
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
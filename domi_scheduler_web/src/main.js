import { createApp } from 'vue';
import App from './App.vue';

export function mountDomiScheduler(element) {
    const app = createApp(App);
    app.mount(element);
}

export function unmountDomiScheduler(element) {
    const app = createApp(App);
    app.unmount(element);
}
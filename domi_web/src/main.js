import { createApp } from 'vue';
import './style.css';
import App from './Domi.vue';
import router from './router';

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

import Dialog from 'primevue/dialog';
import Button from 'primevue/button';


const app = createApp(App);

app.use(router);
app.use(PrimeVue);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

app.component('Dialog', Dialog);
app.component('Button', Button);

app.mount('#app');
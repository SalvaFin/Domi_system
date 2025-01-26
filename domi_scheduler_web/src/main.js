import { createApp } from 'vue';

import './style.css'

import store from './store';

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

import SelectButton from 'primevue/selectbutton';

import App from './App.vue';

const app = createApp(App);

app.component('SelectButton', SelectButton);

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.use(store);

app.mount('#app');

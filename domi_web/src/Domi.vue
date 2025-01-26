<template>
<div id="app">
  <router-view></router-view>
  <div v-for="module in modules" :key="module.id">
    <Window :title="module.name" :url="module.url" :visible="schedulerModule"></Window>
  </div>
  <Menu></Menu>
  <DomiBot />
</div>
</template>

<script setup>
import {ref} from 'vue';
import Menu from './components/Global/Menu.vue';
import DomiBot from './components/Global/DomiBot.vue';
import Window from './components/Global/Window.vue';

const schedulerModule = ref(true);

const modules = [
  {
    id: 1,
    url: '/microfrontends/domi_Scheduler/domi-scheduler-web.es.js',
    name: 'Scheduler'
  }
]
const visible = ref(true);
</script>

<style>
#app {
  text-align: center;
  margin-top: 2rem;
}

</style>
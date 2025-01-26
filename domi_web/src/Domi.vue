<template>
<div id="app">
  <router-view></router-view>
  <VoiceRecognitionMachine/>
</div>
</template>

<script setup>
import {ref} from 'vue';
import VoiceRecognitionMachine from './components/VoiceRecognitionMachine.vue';
const visible = ref(true);
</script>

<style>
#app {
  text-align: center;
  margin-top: 2rem;
}
</style>
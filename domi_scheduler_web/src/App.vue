
<template>
  <div class="scheduler-container">
    <div class="scheduler-header">
      <SchedulerHeader></SchedulerHeader>
    </div>
    <div class="scheduler-body">
      <div v-if="schedulerView == 'Mes'">
        <SchedulerMonth></SchedulerMonth>
      </div>
      <div v-else-if="schedulerView == 'Semana'">
        <SchedulerWeek></SchedulerWeek>
      </div>
      <div v-else>
        <SchedulerDay></SchedulerDay>
      </div>
    </div>
  </div>
</template>

<script setup>
import SchedulerHeader from './components/SchedulerHeader.vue';
import SchedulerMonth from './components/SchedulerMonth.vue';
import SchedulerWeek from './components/SchedulerWeek.vue';
import SchedulerDay from './components/SchedulerDay.vue';

import {useStore} from 'vuex';

import {computed} from 'vue';

const store = useStore();

const schedulerView = computed(() => store.getters['storeCore/getView']);
</script>

<style scoped>
.scheduler-container{
  padding: 0.5em;
  display: flex;
  flex-direction: column;
  gap:10px;
}
</style>

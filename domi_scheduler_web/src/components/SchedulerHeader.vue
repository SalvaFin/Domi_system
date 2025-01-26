<template>
    <div class="header-container">
        <SelectButton v-model="value" :options="options" @change="changeView" />
    </div>
</template>
<script setup>
import { ref } from 'vue';
import {useStore} from 'vuex';
const store = useStore();
const value = ref('Mes');
const options = ref(['Dia', 'Semana', 'Mes']);

const changeView = async () => {
    await store.dispatch('storeCore/fetchChangeSchedulerView', value.value);
}

</script>
<style scoped>
.header-container{
    display: flex;
    flex-direction: row-reverse;
}
</style>
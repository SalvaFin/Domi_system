<template>
    <div class="calendar-container">
      <div class="calendar">
        <div class="header">
          <button class="nav-button" @click="goToPreviousMonth">◀</button>
          <div class="month-label">
            {{ currentMonthLabel }}
          </div>
          <button class="nav-button" @click="goToNextMonth">▶</button>
        </div>
        <div class="weekdays">
          <div v-for="day in responsiveDaysOfWeek" :key="day" class="day-header">
            {{ day }}
          </div>
        </div>
        <div class="grid">
          <div
            v-for="(day, index) in calendarDays"
            :key="index"
            :class="['day', { 'other-month': !day.currentMonth }]"
          >
            <span class="day-number">{{ day.date.getDate() }}</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
import { ref, computed, watch } from "vue";

// Días de la semana (nombres completos e iniciales)
const fullDaysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
const shortDaysOfWeek = ["L", "M", "X", "J", "V", "S", "D"];

// Estado para determinar si estamos en móvil
const isMobile = ref(window.innerWidth <= 600);

// Días responsivos según el tamaño de la ventana
const responsiveDaysOfWeek = computed(() =>
  isMobile.value ? shortDaysOfWeek : fullDaysOfWeek
);

// Función para actualizar el estado cuando la ventana cambia de tamaño
const handleResize = () => {
  isMobile.value = window.innerWidth <= 600;
};

// Escuchar eventos de cambio de tamaño
window.addEventListener("resize", handleResize);

// Limpieza del evento (opcional si el componente se destruye)
// onUnmounted(() => {
//   window.removeEventListener("resize", handleResize);
// });

// Mes actual
const currentMonth = ref(new Date());

// Computed para mostrar el mes y año actual en el encabezado
const currentMonthLabel = computed(() =>
  currentMonth.value.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
  })
);

// Función para calcular los días del calendario
const getCalendarDays = (month) => {
  const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
  const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);

  const startDayOfWeek = (startOfMonth.getDay() + 6) % 7; // Ajusta para que empiece en Lunes
  const endDayOfWeek = (endOfMonth.getDay() + 6) % 7;

  const daysInPreviousMonth = Array.from(
    { length: startDayOfWeek },
    (_, i) => ({
      date: new Date(
        month.getFullYear(),
        month.getMonth(),
        i - startDayOfWeek + 1
      ),
      currentMonth: false,
    })
  );

  const daysInCurrentMonth = Array.from(
    { length: endOfMonth.getDate() },
    (_, i) => ({
      date: new Date(month.getFullYear(), month.getMonth(), i + 1),
      currentMonth: true,
    })
  );

  const daysInNextMonth = Array.from(
    { length: 6 - endDayOfWeek },
    (_, i) => ({
      date: new Date(
        month.getFullYear(),
        month.getMonth() + 1,
        i + 1
      ),
      currentMonth: false,
    })
  );

  return [...daysInPreviousMonth, ...daysInCurrentMonth, ...daysInNextMonth];
};

// Computed para obtener los días del calendario
const calendarDays = computed(() => getCalendarDays(currentMonth.value));

// Funciones para cambiar de mes
const goToPreviousMonth = () => {
  currentMonth.value = new Date(
    currentMonth.value.getFullYear(),
    currentMonth.value.getMonth() - 1,
    1
  );
};

const goToNextMonth = () => {
  currentMonth.value = new Date(
    currentMonth.value.getFullYear(),
    currentMonth.value.getMonth() + 1,
    1
  );
};
</script>
  
  <style scoped>
  /* Contenedor del calendario */
  .calendar-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
  }
  
  /* Calendario */
  .calendar {
    width: 100%;
    background-color: white;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  
  /* Header del calendario */
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #2dbfe4;
    color: white;
    padding: 1rem;
  }
  
  .nav-button {
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
  }
  
  .nav-button:hover {
    color: #d1c4e9;
  }
  
  .month-label {
    font-size: 1.5rem;
    font-weight: bold;
    text-transform: capitalize;
    text-align: center;
  }
  
  /* Días de la semana */
  .weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    background-color: #f3f3f3;
    text-align: center;
    font-weight: bold;
    font-size: 1rem;
    border-bottom: 1px solid #ddd;
  }
  
  .day-header {
    padding: 0.8rem;
    border: 1px solid #ddd;
  }
  
  /* Cuerpo del calendario */
  .grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    width: 100%;
  }
  
  .day {
    position: relative;
    padding: 1rem;
    border: 1px solid #ddd;
    text-align: center;
    height: 120px; /* Ajusta el tamaño */
    font-size: 1rem;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
  }
  
  .other-month {
    background-color: #f0f0f0;
    color: #888;
  }
  
  .day-number {
    position: absolute;
    top: 4px;
    right: 4px;
    font-size: 0.9rem;
    color: inherit;
  }
  
  /* Responsivo */
  @media (max-width: 600px) {
    .day {
      height: 80px;
      font-size: 0.8rem;
    }
  
    .month-label {
      font-size: 1.2rem;
    }
  }
  </style>
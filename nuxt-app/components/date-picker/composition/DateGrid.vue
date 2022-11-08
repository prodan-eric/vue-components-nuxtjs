<script lang="ts" setup>
import { PropType } from "vue";
import DateItem from "./DateItem.vue";
import GridHeader from "./GridHeader.vue";
import {SelectedDates} from '../interfaces';

const props = defineProps({
  dates: Array as PropType<Date[]>,
  side: String,
  selectedDates: {type:  Object as PropType<SelectedDates>, required: true}
})

function getCurrentMonth(){
  return props.dates![10].getMonth()
}
</script>

<template>
    <div class="date-grid">
      <GridHeader
        @go-back="$emit('go-back')"
        @go-forward="$emit('go-forward')"
        :side="side"
        :dates="dates"
      />
      <div class="grid-container">
        <p class="week-day">SU</p> <p class="week-day">MO</p> <p class="week-day">TU</p>
        <p class="week-day">WE</p> <p class="week-day">TH</p> <p class="week-day">FR</p> <p class="week-day">SA</p>
        <DateItem
          v-for="date in dates"
          :key="date.getTime()"
          :date="date"
          :month="getCurrentMonth()"
          :selectedDates="selectedDates"
          @mousedown="$emit('date-mouse-down', date)"
          @mouseup="$emit('date-mouse-up')"
          @mouseenter="$emit('date-mouse-enter', date)"
          @click="$emit('date-click', date)"
          @mouseleave="$emit('date-mouse-leave')"
        />
      </div>
    </div>
  </template>

<style>
.date-grid {
  display: grid;
  justify-content: center;
  border-radius: 4px;
}
.grid-container {
  margin: 0 20px;
  width: 300px;
  height: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: repeat(7, 60px);
}

p{
  text-align: center;
}

.week-day{
  color: var(--hardUnhighlighted);
  font-weight: bolder ;
}
</style>
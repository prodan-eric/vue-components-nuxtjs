<script lang="ts" setup>
import {ref, Ref, watch } from "vue";
import {
  getDateArray,
  getFirstSaturday,
  getLastSunday,
  getFormattedDate,
  isSameDate,
  getDateByTime
} from "../dateFunctions";
import moment from "moment";
import DateGrid from "./DateGrid.vue";
import DateFooter from "./DateFooter.vue";
import DateSideBar from './DateSideBar.vue'
let timer: number;

const props = defineProps({
  showTime: Boolean,
  showDateSideBar: Boolean
})

const showDatePicker = ref(false);
const selectedDates = ref({ from: new Date(), to: new Date() });
let dates1: Ref<Date[]> = ref([]);
let dates2: Ref<Date[]> = ref([]);
const month = ref(new Date().getMonth()-1);
const year = ref(new Date().getFullYear());
const isSelecting = ref(false);
const selectedPeriod = ref('Custom')

function setDateArrays() {
  dates1.value = getDateArray(
    getLastSunday(year.value, month.value - 1),
    getFirstSaturday(year.value, month.value + 1)
  );
  dates2.value = getDateArray(
    getLastSunday(year.value, month.value),
    getFirstSaturday(year.value, month.value + 2)
  );
}

function goBack() {month.value--}
function goForward() {month.value++}

function selectDateFrom(date: Date) {
  isSelecting.value = true;
  selectedDates.value.to = date;
  selectedDates.value.from = date;
}

function selectDate(date: Date) {
  selectedDates.value.from = date;
  selectedDates.value.to = date;
}

function selectPath(date: Date) {
  if (!isSelecting.value) return;
  if (moment(date).isSameOrAfter(selectedDates.value.from))
    selectedDates.value.to = date;
  if (moment(date).isSame(dates2.value[dates2.value.length - 1]))
    timer = window.setTimeout(() => {
      goForward();
    }, 700);
}

function stopTimer() {
  clearTimeout(timer);
}

function getDate() {
  isSelecting.value = false;
  console.log(
    `Selected from: "${selectedDates.value.from.toISOString()}" to: "${selectedDates.value.to.toISOString()}".`
  );
}

function changePeriod(event: MouseEvent){
  selectedPeriod.value = (event.target as HTMLElement).innerHTML;
}  

function setTimeFrom(event: InputEvent) {
  const date = getDateByTime((event.target as HTMLInputElement).value,  selectedDates.value, 'from' );
  selectedDates.value.from = date;
  getDate();
}

function setTimeTo(event: InputEvent) {
  const date = getDateByTime((event.target as HTMLInputElement).value,  selectedDates.value, 'from' );
  if(moment(date).isBefore(selectedDates.value.from)) return;
  selectedDates.value.to = date;
  getDate();
}

watch(month, () => {
  setDateArrays();
});

watch(selectedPeriod,()=>{
 selectedDates.value.from = new Date();
 selectedDates.value.to = new Date();
  switch(selectedPeriod.value){
    case 'Yesterday': 
     selectedDates.value.from.setDate(selectedDates.value.from.getDate()-1);
     selectedDates.value.to.setDate(selectedDates.value.to.getDate()-1);
     break;
    case 'Last 7 Days':
     selectedDates.value.from.setDate(selectedDates.value.from.getDate()-7);
     break;
    case 'Last 14 Days':
     selectedDates.value.from.setDate(selectedDates.value.from.getDate()-14);
     break;
    case 'Last 30 Days':
     selectedDates.value.from.setDate(selectedDates.value.from.getDate()-30);
     break;
    case 'Whole Period':
     selectedDates.value.from = dates1.value[0];
  }
  getDate();
})

setDateArrays();
</script>

<template>
  <div class="picker-header" @click="showDatePicker = !showDatePicker">
    <h5 v-if="isSameDate(selectedDates.from, selectedDates.to)">
      {{ `${getFormattedDate(selectedDates.from)}` }}
    </h5>
    <h5 v-else>
      {{
        `${getFormattedDate(selectedDates.from)} - ${getFormattedDate(
          selectedDates.to
        )}`
      }}
    </h5>
  </div>
  <div class="date-time-picker" v-if="showDatePicker">
  <div class="date-picker-wrapper" v-if="showDatePicker"
     :class="{disabled: selectedPeriod!=='Custom'&&showDateSideBar}">
    <div class="date-picker">
      <DateGrid
        :dates="dates1"
        :selectedDates="selectedDates"
        @go-back="goBack"
        @date-mouse-down="selectDateFrom"
        @date-mouse-up="getDate"
        @date-mouse-enter="selectPath"
        @date-click="selectDate"
        @date-mouse-leave="stopTimer"
        side="left"
      />
      <DateGrid
        :dates="dates2"
        :selectedDates="selectedDates"
        @go-forward="goForward"
        @date-mouse-down="selectDateFrom"
        @date-mouse-up="getDate"
        @date-mouse-enter="selectPath"
        @date-click="selectDate"
        @date-mouse-leave="stopTimer"
        side="right"
      />
    </div>
    <DateFooter v-if="showTime" :selectedDates="selectedDates" 
                                @time-change-from="setTimeFrom"
                                @time-change-to="setTimeTo" />
  </div>
<DateSideBar v-if="showDateSideBar" @change-period="changePeriod" :selectedPeriod="selectedPeriod"/>
</div>
</template>


<style scoped>
.date-picker-wrapper{
  display: grid;
  justify-content: space-between;
}
.date-time-picker{
  display: flex;
}
.date-picker {
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 50px;
  width: 732px;
}
.picker-header {
  display: flex;
  justify-content: center;
  width: fit-content;
  outline: solid var(--lightOutline);
  outline-width: 1px;
  padding: 5px;
  border-radius: 3px;
}

.picker-header:hover {
  cursor: pointer;
  background-color: var(--onHover);
}

h5 {
  margin: 0 5px;
}

</style>

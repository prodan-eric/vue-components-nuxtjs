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
    <div
      class="date-picker-wrapper"
      v-if="showDatePicker"
      :class="{ disabled: selectedPeriod !== 'Custom' && showDateSideBar }"
    >
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
      <DateFooter
        v-if="showTime"
        :selectedDates="selectedDates"
        @time-change-from="setTimeFrom"
        @time-change-to="setTimeTo"
      />
    </div>
    <DateSideBar
      v-if="showDateSideBar"
      @change-period="changePeriod"
      :selectedPeriod="selectedPeriod"
    />
  </div>
</template>

<script lang="ts">
import DateGrid from "./DateGrid.vue";
import DateFooter from "./DateFooter.vue";
import DateSideBar from "./DateSideBar.vue";
import {
  getDateArray,
  getFirstSaturday,
  getLastSunday,
  getDateByTime
} from "../dateFunctions";
import moment from "moment";
import { SelectedDates } from "../interfaces";
let timer: number;

export default {
  name: "DatePickerOptions",
  props: {
    showTime: Boolean,
    showDateSideBar: Boolean,
  },
  components: {
    DateGrid,
    DateFooter,
    DateSideBar,
  },
  data(): {
    showDatePicker: boolean;
    isSelecting: boolean;
    selectedDates: SelectedDates;
    dates1: Date[];
    dates2: Date[];
    month: number;
    year: number;
    selectedPeriod: string;
  } {
    return {
      showDatePicker: false,
      isSelecting: false,
      selectedDates: { from: new Date(), to: new Date() },
      dates1: [],
      dates2: [],
      month: new Date().getMonth() - 1,
      year: new Date().getFullYear(),
      selectedPeriod: "Custom",
    };
  },
  created() {
    this.setDateArrays();
  },

  watch: {
    month() {
      this.setDateArrays();
    },
    selectedPeriod() {
      this.selectedDates.from = new Date();
      this.selectedDates.to = new Date();
      switch (this.selectedPeriod) {
        case "Yesterday":
          this.selectedDates.from.setDate(
            this.selectedDates.from.getDate() - 1
          );
          this.selectedDates.to.setDate(this.selectedDates.to.getDate() - 1);
          break;
        case "Last 7 Days":
          this.selectedDates.from.setDate(
            this.selectedDates.from.getDate() - 7
          );
          break;
        case "Last 14 Days":
          this.selectedDates.from.setDate(
            this.selectedDates.from.getDate() - 14
          );
          break;
        case "Last 30 Days":
          this.selectedDates.from.setDate(
            this.selectedDates.from.getDate() - 30
          );
          break;
        case "Whole Period":
          this.selectedDates.from = this.dates1[0];
      }
      this.getDate();
    },
  },

  methods: {
    goBack() {
      this.month = this.month - 1;
    },
    goForward() {
      this.month = this.month + 1;
    },

    selectDateFrom(date: Date) {
      this.isSelecting = true;
      this.selectedDates.to = date;
      this.selectedDates.from = date;
    },
    selectDate(date: Date) {
      this.selectedDates.from = date;
      this.selectedDates.to = date;
    },

    selectPath(date: Date) {
      if (!this.isSelecting) return;
      if (moment(date).isSameOrAfter(this.selectedDates.from))
        this.selectedDates.to = date;
      if (moment(date).isSame(this.dates2[this.dates2.length - 1]))
        timer = window.setTimeout(() => {
          this.goForward();
        }, 700);
    },

    changePeriod(event: MouseEvent) {
      this.selectedPeriod = (event.target as HTMLElement).innerHTML;
    },

    setTimeFrom(event: InputEvent) {
      const date = getDateByTime( (event.target as HTMLInputElement).value, this.selectedDates, "to");
      this.selectedDates.from = date;
      this.getDate();
    },

    setTimeTo(event: InputEvent) {
      const date = getDateByTime( (event.target as HTMLInputElement).value, this.selectedDates, "from");
      if (moment(date).isBefore(this.selectedDates.from)) return;
      this.selectedDates.to = date;
      this.getDate();
    },

    stopTimer() {
      clearTimeout(timer);
    },

    getDate() {
      this.isSelecting = false;
      console.log(
        `Selected from: "${this.selectedDates.from.toISOString()}" to: "${this.selectedDates.to.toISOString()}".`
      );
    },

    setDateArrays() {
      this.dates1 = getDateArray(
        getLastSunday(this.year, this.month - 1),
        getFirstSaturday(this.year, this.month + 1)
      );
      this.dates2 = getDateArray(
        getLastSunday(this.year, this.month),
        getFirstSaturday(this.year, this.month + 2)
      );
    },
    getFormattedDate(date: Date) {
      return moment(date).format("MMM D, YYYY, HH:mm");
    },
    isSameDate(date1: Date, date2: Date) {
      return moment(date1).isSame(date2);
    },
  },
};
</script>

<style scoped>
.date-picker-wrapper{
  display: grid;
}
.date-time-picker {
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

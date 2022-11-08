<script lang="ts" setup>
import { getFormattedDate } from "../dateFunctions";
import { PropType } from "vue";
import {SelectedDates} from '../interfaces';

const props = defineProps({
  selectedDates: {type:  Object as PropType<SelectedDates>, required: true}
});

const emit = defineEmits(["time-change-from", "time-change-to"]);
</script>

<template>
  <div class="date-footer">
    <p>From: {{ getFormattedDate(selectedDates.from) }}</p>
    <div class="time-selector">
      <input type="time" value="00:00" @change="$emit('time-change-from', $event as InputEvent)" />
    </div>

    <p>&nbsp;&nbsp;To: {{ getFormattedDate(selectedDates.to) }}</p>
    <div class="time-selector">
      <input type="time" value="00:00" @change="$emit('time-change-to', $event as InputEvent)" />
    </div>
  </div>
</template>

<style scoped>
.date-footer {
  margin-top: 100px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 732px;
}

.time-selector {
  outline: solid var(--lightOutline);
  outline-width: 1px;
  display: flex;
  border-radius: 3px;
  justify-content: center;
  align-items: center;
}

p {
  color: var(--unhighlighted);
}
</style>

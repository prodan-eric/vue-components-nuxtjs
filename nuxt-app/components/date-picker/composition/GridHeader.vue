<script lang="ts" setup>
import { getMonthText } from "../dateFunctions";
import { onMounted, ref, watch, PropType } from "vue";

const props = defineProps({
  dates: Array as PropType<Date[]>,
  side: String,
})

const monthText = ref("");

function setMonthText() {
  monthText.value = `${getMonthText(
    props.dates![10]
  )} ${props.dates![10].getFullYear()}`;
}

onMounted(() => {
  setMonthText();
});

watch(()=>props.dates, () => {
  setMonthText();
});
</script>

<template>
  <div class="header-container">
    <button @click="$emit('go-back')" v-if="props.side == 'left'">&lt;</button>
    <p>{{ monthText }}</p>
    <button @click="$emit('go-forward')" v-if="props.side == 'right'">
      &gt;
    </button>
  </div>
</template>

<style scoped>
p {
  text-align: center;
}

.header-container {
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

button {
  font-size: 15px;
  padding: 10px;
  background-color: transparent;
  border-color: solid var(--textColor);
  color: var(--textColor);
  border-radius: 30%;
}
</style>

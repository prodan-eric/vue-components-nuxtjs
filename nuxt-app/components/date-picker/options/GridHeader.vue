<template>
  <div class="header-container">
    <button @click="$emit('go-back')" v-if="side == 'left'">&lt;</button>
    <p>{{ monthText }}</p>
    <button @click="$emit('go-forward')" v-if="side == 'right'">&gt;</button>
  </div>
</template>

<script lang="ts">
import { getMonthText } from "../dateFunctions";
import { PropType } from "vue";

export default {
  name: "GridHeader",
  data(): {
    monthText: String;
  } {
    return {
      monthText: "",
    };
  },
  props: {
    dates: Array as PropType<Date[]>,
    side: String,
  },
  methods: {
    setMonthText() {
      this.monthText = `${getMonthText(
        this.dates![10]
      )} ${this.dates![10].getFullYear()}`;
    },
  },
  mounted() {
    this.setMonthText();
  },
  watch: {
    dates() {
      this.setMonthText();
    },
  },
};
</script>

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

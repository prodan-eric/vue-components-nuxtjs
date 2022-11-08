<script lang="ts" setup>
import DatePickerOptions from "./options/DatePicker.vue";
import DatePickerComposition from "./composition/DatePicker.vue";
import {changeTheme} from './dateFunctions'
import { ref } from "vue";
import SliderCheckbox from "./SliderCheckbox.vue";

const showTime = ref(true);
const showDateSideBar = ref(false);
</script>

<template>
<div class="date-picker">
    <div class="switcher">
      <SliderCheckbox :text="'Light'" @check="(e: InputEvent)=>changeTheme(e)">
      <p>&nbsp;Dark</p>
      </SliderCheckbox>

      <SliderCheckbox :text="'Show Time'" @check="showTime=!showTime"/>
      <SliderCheckbox :text="'Show SideBar'" @check="showDateSideBar=!showDateSideBar"/>
  </div>

  <p class="api">Options API:</p>
  <DatePickerOptions :showTime="showTime" :showDateSideBar="showDateSideBar" />
  <p class="api">Composition API:</p>
  <DatePickerComposition :showTime="showTime" :showDateSideBar="showDateSideBar" />
</div>

</template>

<style>
@import './styles-date-picker.css';
.button-wrapper{
   display: flex;
   justify-content: center;
}

.switcher {
  display: flex;
  align-items: center;
}

.api {
  width: 170px;
}
</style>

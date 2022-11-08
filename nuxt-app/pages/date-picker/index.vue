<script lang="ts" setup>
import DatePicker from '../../components/date-picker/DatePickerConfig.vue'
useHead({
  title: 'Date Picker'
})
const goBack = () =>{
   useRouter().back()
} 
</script>

<template>
    <DatePicker style="margin-bottom: 50px"/>
    <button @click="goBack" class="component-option">Back</button>
</template>

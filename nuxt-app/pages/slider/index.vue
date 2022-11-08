<script lang="ts" setup>
import SliderConfig from '../../components/slider/SliderConfig.vue'
useHead({
  title: 'Slider'
})
const goBack = () =>{
   useRouter().back()
} 
</script>

<template>
    <SliderConfig style="margin-bottom: 50px"/>
    <button @click="goBack" class="component-option">Back</button>
</template>
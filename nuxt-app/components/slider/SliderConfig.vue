<script lang="ts" setup>
import { ref } from 'vue'
import ScaleSlider from './ScaleSlider.vue';

 const min = ref();
 const max = ref();
 const pickerWidth = ref();
 const leftBarColor = ref('black');
 const rightBarColor = ref('gray');
 const pickerColor = ref('lightblue');
 const step = ref();
</script>

<template>
    <div class="slider-wrapper">
    <ScaleSlider
     :min="min"
     :max="max"
     :pickerWidth="pickerWidth"
     :leftBarColor="leftBarColor"
     :rightBarColor="rightBarColor"
     :pickerColor="pickerColor"
     :step="step"
    />

    <div class="slider-config">
        <input placeholder="Min"          type="number" v-model="min">
        <input placeholder="Max"          type="number" v-model="max">
        <input placeholder="Step"         type="number" v-model="step">
        <input placeholder="Picker Width" type="number" v-model="pickerWidth">
        <input placeholder="Left Color"   type="text"   v-model="leftBarColor">
        <input placeholder="Right Color"  type="text"   v-model="rightBarColor">
    </div>
    </div>
</template>

<style>
.slider-config{
    width: 40px;
    display: grid;
}

.slider-wrapper{
    display: flex;
    justify-content: space-evenly;
}

.slider-config input{
    margin-bottom: 5px;
    border-radius: 5px;
    width: 120px;
}
</style>
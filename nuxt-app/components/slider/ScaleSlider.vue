<script lang="ts" setup>
import { computed } from '@vue/reactivity'
import { ref, watch } from 'vue'
const VAL_PX_RATIO = 5

const props = withDefaults(defineProps<{
  leftBarColor: string
  rightBarColor: string
  pickerColor: string
  pickerWidth: number
  min: number
  max: number
  step: number}>(),{

  min: -50,
  max: 50,
  step: 1,
  pickerWidth: 20,
  leftBarColor: 'black',
  rightBarColor: 'gray',
  pickerColor: 'lightblue',
})

const halfSlider = (props.max+props.min)*props.step/2

const selectedValue = ref((props.max+props.min)*props.step!/2)

const sliderStyle = computed(()=>{
    return { width: `${(props.max-props.min)*VAL_PX_RATIO}px` }
})

const leftBar = ref(null)
const leftBarStyle = ref({ width: `${ halfSlider!==0 ?
                                      halfSlider*VAL_PX_RATIO :
                                      (props.max-props.min)/2*VAL_PX_RATIO}px`,
                           backgroundColor: props.leftBarColor})

watch(()=>props.leftBarColor, (val: string)=>{
    leftBarStyle.value.backgroundColor = val
})

const startSliding = () =>{
  window.addEventListener('mousemove', resize)
  window.addEventListener('mouseup', stopSliding)
}
const resize = (event: MouseEvent) =>{
    const leftBarOffSetLeft = (leftBar.value! as HTMLElement).offsetLeft||0
    const selectionWidth = event.clientX-leftBarOffSetLeft
    const newValue = (Math.round(selectionWidth/VAL_PX_RATIO)+props.min)
    if(newValue>=props.min&&newValue<=props.max) updateSelectedValue(newValue*props.step)
}
const stopSliding = () =>{
    window.removeEventListener('mousemove', resize)
    window.removeEventListener('mouseup', stopSliding)
}

const updateSelectedValue = (val: number) =>{
    selectedValue.value = val
    leftBarStyle.value.width = `${(selectedValue.value-props.min)/props.step*VAL_PX_RATIO}px`
}
</script>

<template>
  <div class="slider-wrapper">
    <div class="scale-slider" :style="sliderStyle">
        <div class="left-bar" :style="leftBarStyle" ref="leftBar"></div>
         <span @mousedown="startSliding" class="picker" :style="{width: `${pickerWidth}px`}"></span>
        <div class="right-bar" :style="{backgroundColor: rightBarColor}"></div>
    </div>
    <div class="display-value">
      <input type="number" class="percentage-input"  
             :value="selectedValue"
             @input="(e) => updateSelectedValue(Number((e.target as HTMLInputElement).value))"
             :min="props.min!*props.step!"
             :max="props.max!*props.step!"/>
    </div>
  </div>
</template>

<style scoped>

.percentage-input{
  margin-top: 20px;
  width: 60px;
  height: 20px;
  border-radius: 5px;
}

.display-value{
  display: grid;
  justify-content: center;
  margin-left: 0;
}

.slider-wrapper{
  display: grid;
  justify-content: center;
}
.scale-slider{
  display: flex;
  align-items: center;
}

.left-bar{
  background-color: rgb(35, 35, 35);
  width: 250px;
  height: 10px;
  border-radius: 5px 0px 0px 5px;
}

.right-bar{
  background-color: darkgray;
  height: 10px;
  border-radius: 0px 5px 5px 0px;
  flex-grow: 1;
}

.picker{
  width: 20px;
  height: 50px;
  background-color: lightblue;
  border-radius: 5px;
}

.picker:hover{
  cursor: pointer;
}

</style>
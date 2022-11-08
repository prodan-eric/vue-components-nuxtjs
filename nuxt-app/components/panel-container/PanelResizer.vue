<script lang="ts" setup>
import { onMounted, Ref, ref } from 'vue';
import {CONTAINER_MAX_HEIGHT, CONTAINER_MIN_HEIGHT} from './constants'

const resizer: Ref<HTMLElement|null> = ref(null)
let container: HTMLElement

onMounted(()=>{
  container = (resizer.value!.parentElement as HTMLElement)
})

const startResizing = () => {
   window.addEventListener('mousemove', resize)
   window.addEventListener('mouseup', stopResizing)
}
const resize = (event: MouseEvent) => {
  const {y} = container.getBoundingClientRect()
  const height = event.clientY-y
  
  if(height>CONTAINER_MIN_HEIGHT&&height<CONTAINER_MAX_HEIGHT) container.style.height = `${height}px`
}
const stopResizing = () => {
    window.removeEventListener('mousemove', resize)
    window.removeEventListener('mouseup', stopResizing)
}
</script>

<template>
  <div ref="resizer" class="resizer" @mousedown="startResizing"></div>
</template>

<style scoped>
.resizer{
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--innerWidth);
    height: 10px;
    position: absolute;
    background-color: lightgray;
    background-image: url('https://cdn-icons-png.flaticon.com/512/54/54668.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    right: 0;
    bottom: 0;
    user-select: none;
}

.resizer:hover{
    cursor: row-resize;
    background-color: gray;
    user-select: none;
    -webkit-user-drag: none;
}
</style>
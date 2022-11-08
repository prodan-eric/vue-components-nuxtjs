<script lang="ts" setup>
import RenderButton from '../../components/render-button/RenderButtonConfig.vue'
useHead({
  title: 'Render Button'
})
const goBack = () =>{
   useRouter().back()
} 
</script>

<template>
    <RenderButton/>
    <button @click="goBack" class="component-option">Back</button>
</template>


<script lang="ts" setup>
import PanelContainer from '../../components/panel-container/PanelContainerConfig.vue'
useHead({
  title: 'Panel Container'
})
const goBack = () =>{
   useRouter().back()
} 
</script>

<template>
    <PanelContainer style="margin-bottom: 50px ;"/>
    <button @click="goBack" class="component-option">Back</button>
</template>

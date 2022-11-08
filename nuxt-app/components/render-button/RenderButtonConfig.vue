<script setup lang="ts">
import RenderButtonOptions from './RenderButtonOptions.vue';
import RenderButtonComposition from './RenderButtonComposition.vue';
</script>

<template>
   <div class="button-wrapper">
      <RenderButtonComposition/>
      <RenderButtonOptions/>
   </div>
</template>

<style>
.button-wrapper{
   display: flex;
   justify-content: center;
}
</style>


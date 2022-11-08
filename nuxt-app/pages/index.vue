<script lang="ts" setup>
useHead({
  title: 'Components'
})
</script>

<template>
   <h1>Vue Components</h1>
   <div style="display: grid">
   <NuxtLink class="component-option" to="date-picker">Date Picker</NuxtLink>
   <NuxtLink class="component-option" to="panel-container">Panel Container</NuxtLink>
   <NuxtLink class="component-option" to="slider">Slider</NuxtLink>
   <NuxtLink class="component-option" to="render-button">Render Button</NuxtLink>
   </div>
</template>

<style src="../assets/styles.css"/>
<script lang="ts" setup>
const props = defineProps({
    text: String
})
</script>
<template>
    <p>{{text}}&nbsp;</p> 
    <label class="switch">
      <input type="checkbox" @input="$emit('check', $event)"/>
      <span class="slider round"></span> 
     </label>
    <slot></slot>
    <p style="margin-right:20px"></p>
</template>
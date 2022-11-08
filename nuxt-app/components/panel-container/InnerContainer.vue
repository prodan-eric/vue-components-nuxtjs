<script setup lang="ts">
</script>

<template>
 <div class="inner-container">
       <div class="header">
              <slot name="header"></slot>
       </div>
       <div class="content">
              <slot name="content"></slot>
       </div>
       <div class="footer">
              <slot name="footer"></slot>
       </div>
 </div>
</template>

<style>
.inner-container{
    padding: var(--innerPadding);
    outline-width: 1px;
    position: relative;
    float:left;
    overflow: hidden;
 }

.header, .footer{
 text-align: center;
}
</style>


<script lang="ts">
import {periods} from '../interfaces';

export default {
    name: 'DateSideBar',
    props:{
        selectedPeriod: String
    },
    data(){
        return{
            periods: periods
        }
    }
}
</script>

<template>
    <div class="time-periods">
        <div id="select-by"> Select by: </div>
        <div @click="$emit('change-period', $event)" class="time-period"
        v-for="period in periods"
        :class="{'selected': period===selectedPeriod}"
        >{{period}}</div> 
    </div>
  </template>
  
  <style scoped>
  
  #select-by{
      font-size: 10px;
      color: gray;
      text-align: center;
  }
  .time-period{
     display: flex;
     justify-content: center;
     align-items: center;
  }
  .time-periods{
      display: grid;
      outline: solid var(--lightOutline);
      outline-width: 1px;
      padding: 15px;
  }
  
  .time-period:hover{
   background-color: var(--onSelectionHover);
   cursor: pointer;
  }
  
  </style>
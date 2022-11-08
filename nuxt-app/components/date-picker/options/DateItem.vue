<template>
    <div class="date-wrapper"
      :class="{ 'selected': selectedDates.to.toDateString()===date.toDateString()||
                            selectedDates.from.toDateString()===date.toDateString(),
                'light-selected': isSelected(),
                'different-month' : date.getMonth()!==month }">
        <p>{{date.getDate()}}</p>
    </div>
 </template>
 
 <script lang="ts">
import moment from 'moment';
import {PropType} from 'vue';
import {SelectedDates} from '../interfaces';

 export default {
    name: 'DateItem',
    props:{
        date: {type: Date, required: true},
        selectedDates: {type:  Object as PropType<SelectedDates>, required: true},
        month: Number
    },
    methods:{
      isSelected(){
        return moment(this.date).isBetween(this.selectedDates.from, this.selectedDates.to)
      }
    }
 }
 </script>
 
 <style scoped>
    .date-wrapper:hover{
        background-color: var(--onSelectionHover);
        cursor: pointer;
    }
    .different-month{
      color: var(--unhighlighted);
    }
    .different-month.selected{
      color: var(--onSelectionHoverText);
    }

    .different-month.light-selected{
      color: var(--innerTextColor);
    }
    
 </style>
 
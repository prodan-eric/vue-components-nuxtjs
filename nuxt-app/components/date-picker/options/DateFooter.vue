<template>
    <div class="date-footer">
        <p>From: {{getFormattedDate(selectedDates.from)}}</p>
         <div class="time-selector"> 
            <input type="time" value="00:00" @change="$emit('time-change-from', $event as InputEvent)"/>
         </div>
        <p>&nbsp;&nbsp;To: {{getFormattedDate(selectedDates.to)}}</p>
        <div class="time-selector">
            <input type="time" value="00:00" @change="$emit('time-change-to', $event as InputEvent)"/>
         </div>
    </div>
</template>

<script lang="ts">
import moment from 'moment';
import { PropType } from 'vue';
import {SelectedDates} from '../interfaces';

export default {
 name: 'DateFooter',
 props:{
   selectedDates: {type:  Object as PropType<SelectedDates>, required: true}
 },
 methods:{
    getFormattedDate(date: Date){
       return moment(date).format('LL')
    },
 }
}
</script>

<style scoped>
    .date-footer{
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        width: 732px;
    }
    .time-selector{
        outline: solid var(--lightOutline);
        outline-width: 1px;
        border-radius: 3px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    p{
        color: var(--unhighlighted);
    }


</style>
<script lang="ts">
import {h, ref} from 'vue'
const icon = h('img', {src:'src/assets/biotechnology.png'})

export default {
    setup(){
        const side = ref('right')

        return ()=> h('button', 
                 {class:'click', onClick: () => {side.value==='right'?side.value='left' : side.value='right'}},
                 [side.value==='right'?['Right',icon]:[icon,'Left']])
    }
}
</script>


<style>
.click{
    height: 70px;
    width: 300px;
    font-size: 30px;
    border-radius: 5px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: lightgreen;
}

.click:hover{
    background-color: green;
    cursor: pointer;
}
</style>
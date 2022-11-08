<script lang="ts">
import {h} from 'vue'
const icon = h('img', {src:'src/assets/biotechnology.png'})

export default {
    data(){
        return {
            side: 'right'
        }
    },
    render(){     
        return h('button', 
                 {class:'click', onClick: () => {this.side==='right'?this.side='left' : this.side='right'}},
                 [ this.side==='right'?['Right',icon]:[icon,'Left']])
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
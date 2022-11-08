<script lang="ts" setup>
import { ref, watch } from 'vue'
import InnerContainer from './InnerContainer.vue'
import PanelResizer from './PanelResizer.vue'
import { MAX_WIDTH, MIN_WIDTH } from './constants'

const side = ref('left')
const switchSide = () => side.value === 'left' ? side.value = 'right' : side.value = 'left'

const standardWidth = Number(getComputedStyle(document.documentElement).getPropertyValue('--innerWidth').split('p')[0])
const width = ref(standardWidth)

watch(width, () => {
  width.value > MIN_WIDTH && width.value < MAX_WIDTH ?
    document.documentElement.style.setProperty('--innerWidth', `${width.value}px`) :
    document.documentElement.style.setProperty('--innerWidth', `${standardWidth}px`)
})
</script>

<template>
  <div id="app">

    <div class="panel-bordering">
      <span class="side" v-if="side === 'left'"></span>
      <div class="panel-container">
        <InnerContainer>
          <template #header>
            <h3>Header</h3>
            <PanelResizer />
          </template>
        </InnerContainer>

        <InnerContainer>
          <template #content>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem consequuntur
            suscipit delectus voluptas voluptatem fuga velit porro, esse debitis doloremque
            totam qui obcaecati numquam ipsam est sit iusto quidem dolor tempore at, eveniet, perferendis
            officia? Exercitationem doloribus adipisci nemo nam?
            <PanelResizer/>
          </template>
        </InnerContainer>

        <InnerContainer>
          <template #content>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, vitae! Voluptatum,
            vero repellendus minima maiores adipisci voluptates laborum inventore accusamus odit
            id beatae nam qui tempora velit eveniet! Odit cum quidem corrupti corporis rerum error
            expedita sapiente suscipit culpa saepe.
          </template>
          <template #footer>
            Footer
          </template>
        </InnerContainer>
      </div>
      <span class="side" v-if="side === 'right'"></span>
    </div>

    <div class="config">
      <div class="config-wrapper">
        <p class="config-text">Width</p>
        <input v-model="width" class="config-input" />
      </div>
      <div class="config-wrapper">
        <p>Left&nbsp;</p>
        <label class="switch">
          <input type="checkbox" @input="switchSide" />
          <span class="slider round"></span>
        </label>
        <p>&nbsp;Right</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
#app {
  display: flex;
  justify-content: space-evenly;
}

.config{
  margin-left: 50px;
}

.side {
  background-color: black;
  width: 4px;
}

.panel-bordering {
  display: flex;
}

.panel-container {
  display: grid;
  justify-content: center;
  outline: solid black;
  width: var(--innerWidth);
  outline-width: 1px;
  margin: 0;
  overflow: visible;
}

.config-input {
  width: 50px;
}

.config-wrapper {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
</style>
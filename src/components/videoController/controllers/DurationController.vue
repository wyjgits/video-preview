<template>
  <div>
    进度条：
    <input type="range" min="0" :max="player.state.duration" step="1" v-model="currentTime">
    {{ Math.floor(currentTime / 60 ).toString().padStart(2,'0')}} : {{ Math.floor(currentTime % 60).toString().padStart(2,'0') }}
  </div>
</template>
  
<script setup lang='ts'>
import { computed } from 'vue';
import { getCurrentPlayer } from './utils';

const player = getCurrentPlayer();

const currentTime = computed({
  get() {
    return player.value.state.currentTime;
  },
  set(current) {
    player.value.handlers.setCurrentTime(current);
  }
})

</script>
  
<style>
  
</style>
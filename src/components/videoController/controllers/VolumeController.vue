<template>
  <div>
    音量
    <input type="range" max="1" min="0" step="0.1" v-model="volume" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getCurrentPlayer } from './utils';

const player = getCurrentPlayer();

const volume = computed({
  get() {
    return player.value.state.volume;
  },
  set(volume) {
    player.value.handlers.setVolume(volume);
    return true;
  },
});
</script>

<style></style>

<template>
  <button @click="playOrPause">
    {{ player.state.play ? '暂停' : '播放' }}
  </button>
</template>

<script setup lang="ts">
import { getCurrentPlayer } from './utils';

const player = getCurrentPlayer();

const playOrPause = () => {
  player.value.state.play
    ? player.value.handlers.pause?.()
    : player.value.handlers.play?.();
};
</script>

<style></style>

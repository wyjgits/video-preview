<template>
  <button @click="screenshot">截图</button>
</template>

<script setup lang="ts">
import { getCurrentPlayer } from './utils';

const player = getCurrentPlayer();

const screenshot = () => {
  player.value.handlers.screenshot();
};
</script>

<style></style>

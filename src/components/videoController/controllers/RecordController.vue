<template>
    <button @click="recording">{{ player.state.inRecording ? '结束录制' : '开始录制' }}</button>
</template>
<script setup lang='ts'>
import { getCurrentPlayer } from './utils';

const player = getCurrentPlayer();

const recording = () => {
  player.value.handlers.videotaping();
}

</script>
  
<style>
  
</style>
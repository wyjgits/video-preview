<template>
  <div class="video-wall-player">
    <video-player class="video-player" auto-play v-bind="$attrs"></video-player>
    <video-wall-player-controller
      class="player-controller"></video-wall-player-controller>
  </div>
</template>

<script setup lang="ts">
import VideoPlayer from '@/components/videoPlayer/VideoPlayer.vue';
import VideoWallPlayerController from './VideoWallPlayerController.vue';
import { PlayerKey } from '@/config/globalProvideKeys';
import { getCurrentInstance, provide } from 'vue';

const uid = getCurrentInstance()?.uid;
provide(PlayerKey, uid);
</script>

<style lang="scss">
.video-wall-player {
  position: relative;
  .video-player {
    width: 100%;
    height: 100%;
  }
  .player-controller {
    height: 40px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    gap: 10px;
    background-color: rgba(123, 123, 123, 0.8);
  }
}
</style>

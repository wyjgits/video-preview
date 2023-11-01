<template>
  <div class="video-player-page">
    <video-player class="video-view" :uid="uid"></video-player>
    <video-controller class="video-controller" :uid="uid"></video-controller>
  </div>
</template>

<script setup lang="ts">
import VideoPlayer from '@/components/videoPlayer/VideoPlayer.vue';
import VideoController from '@/components/videoController/VideoController.vue';
import { getCurrentInstance, provide } from 'vue';
import { PlayerKey } from '@/config/globalProvideKeys';
const uid = getCurrentInstance()?.uid;
provide(PlayerKey, uid);
</script>

<style lang="scss">
.video-player-page {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .video-view {
    width: 100%;
    height: 100%;
  }
  .video-controller{
    position: absolute;
    left: 60px;
    right: 60px;
    bottom: 50px;
  }
}
</style>

<template>
  <div class="video-player-page">
    <div>
      URL: <input class="url-input" v-model="url" />
      <button @click="playVideo">播放视频</button>
    </div>
    <div class="video-content">
      <video-player
        ref="videoPlayerRef"
        class="video-view"
        :uid="uid"></video-player>
      <video-controller class="video-controller" :uid="uid"></video-controller>
    </div>
  </div>
</template>

<script setup lang="ts">
import VideoPlayer from '@/components/videoPlayer/VideoPlayer.vue';
import VideoController from '@/components/videoController/VideoController.vue';
import { getCurrentInstance, provide, ref } from 'vue';
import { PlayerKey } from '@/config/globalProvideKeys';

const uid = getCurrentInstance()?.uid;
provide(PlayerKey, uid);

const videoPlayerRef = ref();

const url = ref(
  'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8'
);

const playVideo = () => videoPlayerRef.value.playVideo(url.value);
</script>

<style lang="scss">
.video-player-page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .url-input {
    width: 80%;
  }
  .video-content {
    flex: 1;
  }
  .video-view {
    width: 100%;
    height: 100%;
  }
  .video-controller {
    position: absolute;
    left: 60px;
    right: 60px;
    bottom: 50px;
  }
}
</style>

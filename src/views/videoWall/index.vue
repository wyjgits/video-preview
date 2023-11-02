<template>
  <div class="video-wall-page">
    <video-wall-player
      v-for="i of 9"
      :key="i"
      :url="urls[Math.floor(Math.random() * urls.length)]"></video-wall-player>
  </div>
</template>

<script setup lang="ts">
import VideoWallPlayer from './components/VideoWallPlayer.vue';

const urls = [
  'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8',
  'https://d2zihajmogu5jn.cloudfront.net/sintel/master.m3u8',
];
</script>

<style lang="scss">
.video-wall-page {
  display: flex;
  flex-wrap: wrap;
  > div {
    width: 33.33%;
    height: 33.33%;
  }
}
</style>

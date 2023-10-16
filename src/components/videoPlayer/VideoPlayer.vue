<template>
  <div class="video-player-container">
    <video ref="videoPlayerRef" class="video-js vjs-default-skin"></video>
  </div>
</template>

<script setup lang="ts">
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { onMounted, ref } from 'vue';

const videoPlayerRef = ref();
let player: any = null;

onMounted(()=>{
  player = videojs(videoPlayerRef.value, {
    autoplay: true,
    controls: true,
    sources: [{
      src: 'https://vjs.zencdn.net/v/oceans.mp4',
      type: 'video/mp4'
    }]
  });
})
</script>

<style></style>

<template>
    <div class="video-controller">
      <play-controller></play-controller>
      <volume-controller></volume-controller>
      <screenshot-controller></screenshot-controller>
      <record-controller></record-controller>
      <duration-controller></duration-controller>
    </div>
</template>
  
<script setup lang='ts'>
  import playController from './controllers/PlayController.vue';
  import VolumeController from './controllers/VolumeController.vue';
  import ScreenshotController from './controllers/ScreenshotController.vue';
  import RecordController from './controllers/RecordController.vue';
  import DurationController from './controllers/DurationController.vue';
</script>
  
<style>
  .video-controller{
    display: flex;
    align-items: center;
    gap: 10px;
    height: 64px;
    border-radius: 4px;
    background-color: rgba(0,0,0,.8);
    color: #fff;
  }
</style>
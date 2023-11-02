<template>
  <div class="video-wall-player-controller">
    <volume-controller></volume-controller>
    <screenshot-controller></screenshot-controller>
    <record-controller></record-controller>
  </div>
</template>

<script setup lang="ts">
import VolumeController from '@/components/videoController/controllers/VolumeController.vue';
import ScreenshotController from '@/components/videoController/controllers/ScreenshotController.vue';
import RecordController from '@/components/videoController/controllers/RecordController.vue';
</script>

<style></style>

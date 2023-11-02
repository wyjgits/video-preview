<script setup lang="ts"></script>

<template>
  <div class="video-preview-page">
    <div class="navigation-bar">
      <router-link to="/">视频播放器</router-link> |
      <router-link to="/videoWall">电视墙</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.video-preview-page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.navigation-bar {
  padding: 20px;
  text-align: center;
}
.navigation-bar + div {
  flex: 1;
}
</style>

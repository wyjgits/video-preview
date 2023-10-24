<template>
  <div class="video-player-container">
    <video ref="videoPlayerRef" class="video-js vjs-default-skin video-player"></video>
    <div>
      <button @click="play">播放</button>
      <button @click="pause">暂停</button>
      <button @click="setVolume(0)">音量0</button>
      <button @click="setVolume(1)">音量1</button>
      <button @click="screenshot">截图</button>
      <button @click="recordingHandler">录制</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';
import 'video.js/dist/video-js.css';
import fixWebmDuration from 'webm-duration-fix';
import {
  onMounted,
  ref,
  withDefaults,
  defineProps,
  onBeforeUnmount,
} from 'vue';
import { downloadFile } from '@/utils';

type VideoPropsType = {
  url?: string;
  defaultMuted?: boolean;
};
const props = withDefaults(defineProps<VideoPropsType>(), {
  url: 'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8',
  defaultMuted: true,
});

const mimeType = 'video/mp4';

const videoPlayerRef = ref<HTMLVideoElement>();
let player: Player | null = null; // 此处不可使用ref,否则会导致无法播放
let playUrl = ''; // 当前播放的url

// 录像相关
let mediaRecorder: MediaRecorder;
let recordedChunks: Blob[] = [];
const inRecording = ref(false);
let recordingResolve: null | ((value?: unknown) => void) = null;

/**
 * 开始播放
 */
const play = () => {
  player?.play();
};
/**
 * 暂停播放
 */
const pause = () => {
  player?.pause();
};
/**
 * 获取播放状态
 */
const getPlayStatus = () => {
  return !player?.paused();
};

/**
 * 设置音量
 * @param volume 音量0-1
 */
const setVolume = (volume: number) => {
  player?.volume(volume);
};

/**
 * 获取音量
 */
const getVolume = () => {
  return player?.volume();
};

/**
 * 截图
 */
const screenshot = () => {
  const videoElement = videoPlayerRef.value as HTMLVideoElement;
  const width = videoElement.videoWidth;
  const height = videoElement.videoHeight;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(videoElement, 0, 0, width, height);
  downloadFile(canvas.toDataURL('image/png'));
};

const startRecording = () => {
  if (mediaRecorder) {
    const volume = player?.volume();
    const muted = player?.muted();
    if (!volume || muted) {
      player?.muted(false);
      player?.volume(0.5);
    }
    recordedChunks = [];
    mediaRecorder?.start(10);
    inRecording.value = true;
  }
};
const endRecording = () => {
  if (mediaRecorder) {
    mediaRecorder.stop();
    inRecording.value = false;
  }
};
const recordingHandler = () => {
  if (inRecording.value) {
    endRecording();
    recordingResolve && recordingResolve();
  } else {
    const volume = player?.volume();
    const muted = player?.muted();
    if (!volume || muted) {
      alert('请打开声音');
      return;
    }
    startRecording();
    return new Promise(resolve => {
      recordingResolve = resolve;
    });
  }
};
/**
 * 下载录像
 */
const downloadRecording = () => {
  if (recordedChunks.length) {
    var blob = new Blob(recordedChunks, {
      type:mimeType,
    });
    fixWebmDuration(blob).then(blob => {
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      document.body.appendChild(a);
      a.style.display = 'none';
      a.href = url;
      a.download = 'record.' + mimeType.split('/')[1];
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
};

/**
 * 初始化录像媒体
 */
const initRecordingMedia = () => {
    mediaRecorder = new MediaRecorder(
      videoPlayerRef.value?.captureStream(),
    );

    mediaRecorder.addEventListener('dataavailable', event => {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
      }
    });
    mediaRecorder.addEventListener('stop', () => {
      downloadRecording();
    });
};

/**
 * 播放视频
 * @param url 播放地址
 */
const playVideo = (url?: string) => {
  playUrl = url || props.url;
  player?.src({
    src: playUrl,
    type: 'application/x-mpegURL',
  });
  player?.play();
};

onMounted(() => {
  player = videojs(videoPlayerRef.value!, {
    autoplay: true,
  });
  // 播放视频
  playVideo();
  // 初始化录像媒体
  initRecordingMedia();
});
onBeforeUnmount(() => {
  if (player) {
    player.dispose(); // 销毁播放器
  }
});
</script>

<style lang="scss">
.video-player-container {
  display: flex;
  flex-direction: column;
  .video-player {
    width: 100%;
    flex: 1;
  }
}
</style>

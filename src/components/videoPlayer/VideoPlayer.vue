<template>
  <div class="video-player-container">
    <video
      ref="videoPlayerRef"
      class="video-js vjs-default-skin video-player"></video>
  </div>
</template>

<script setup lang="ts">
import {
  onMounted,
  ref,
  withDefaults,
  defineProps,
  onBeforeUnmount,
  reactive,
inject,
} from 'vue';
import { usePlayersStore } from '@/stores/players';
import type { PlayerState } from '@/stores/players';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';
import 'video.js/dist/video-js.css';
import fixWebmDuration from 'webm-duration-fix';
import { downloadFile } from '@/utils';
import { PlayerKey } from '@/config/globalProvideKeys';

type VideoPropsType = {
  url?: string;
  defaultMuted?: boolean;
};
const props = withDefaults(defineProps<VideoPropsType>(), {
  url: 'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8',
  defaultMuted: true,
});

const uid = inject(PlayerKey);

const playerStore = usePlayersStore();
const playerState: PlayerState = reactive({
  play: false,
  volume: 1,
  inRecording: false,
  currentTime: 0,
  duration: 0,
});

// 视频文件类型
const mimeType = 'video/mp4';
// 视频播放器ref
const videoPlayerRef = ref<HTMLVideoElement>();
let player: Player | null = null; // 此处不可使用ref,否则会导致无法播放
let playUrl = ''; // 当前播放的url

// 录像相关
let mediaRecorder: MediaRecorder;
let recordedChunks: Blob[] = [];
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
 * 设置音量
 * @param volume 音量0-1
 */
const setVolume = (volume: number) => {
  player?.volume(volume);
};

/**
 * 设置播放进度
 */
const setCurrentTime = (current:number) => {
  player?.currentTime(current);
}

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
    recordedChunks = [];
    mediaRecorder?.start(10);
    playerState.inRecording = true;
  }
};
const endRecording = () => {
  if (mediaRecorder) {
    mediaRecorder.stop();
    playerState.inRecording = false;
  }
};
const videotaping = () => {
  if (playerState.inRecording) {
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
      (videoPlayerRef.value as any)?.captureStream(),
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

const addPlayerListener = () => {
  player?.on('play', ()=> playerState.play = true);
  player?.on('pause', ()=> playerState.play = false);
  player?.on('volumechange', ()=> playerState.volume = player!.volume() || 0);
  player?.on('timeupdate', ()=> playerState.currentTime = player!.currentTime() || 0);
  player?.on('loadedmetadata', () => {
    playerState.duration = player?.duration() || 0;
  })
}

onMounted(() => {
  player = videojs(videoPlayerRef.value!, {
    autoplay: true,
    
  });
  addPlayerListener();
  // 播放视频
  playVideo();
  // 初始化录像媒体
  initRecordingMedia();
  // 加入store
  playerStore.addPlayer(uid, playerState, {
    play,
    pause,
    setVolume,
    screenshot,
    videotaping,
    setCurrentTime,
  });
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

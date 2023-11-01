import { UidType } from '@/types/player';
import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';

export type PlayerState = {
  play: boolean;
  volume: number;
  currentTime: number;
  duration?: number;
  inRecording: boolean;
};

type PlayerHandlers = {
  play: () => void;
  pause: () => void;
  setVolume: (volume: number) => void;
  screenshot: () => void;
  videotaping: () => void;
  setCurrentTime: (current: number) => void;
};
type Player = {
  uid: UidType;
  state: PlayerState;
  handlers: PlayerHandlers;
};
const EmptyFn = () => {};
// 未生成实例时的默认状态
const defaultPlayer:Pick<Player, 'state' | 'handlers'> = Object.freeze({
  state: {
    play: false,
    volume: 1,
    currentTime: 0,
    inRecording: false,
  },
  handlers: {
    play: EmptyFn,
    pause: EmptyFn,
    setVolume: EmptyFn,
    screenshot: EmptyFn,
    videotaping: EmptyFn,
    setCurrentTime: EmptyFn,
  },
});

export const usePlayersStore = defineStore('players', () => {
  const players = reactive(new Map<string, Player>());

  /**
   * 添加播放器
   * @param uid 播放器唯一标识
   * @param state 播放器状态
   * @param handlers 播放器操作
   */
  const addPlayer = (
    uid: UidType,
    state: PlayerState,
    handlers: PlayerHandlers
  ) => {
    players.set(
      uid,
      reactive({
        uid,
        state,
        handlers,
      })
    );
  };

  /**
   * 删除播放器
   */
  const removePlayer = (uid: UidType) => {
    return players.delete(uid);
  };
  /**
   * 获取播放器
   */
  const getPlayer = (uid: UidType) => {
    return computed(() => {
      const player = players.get(uid);
      if (player) return player;
      return {
        uid,
        ...defaultPlayer,
      };
    });
  };

  return {
    addPlayer,
    removePlayer,
    getPlayer,
  };
});

import { inject } from 'vue';
import { usePlayersStore } from '@/stores/players';
import { PlayerKey } from '@/config/globalProvideKeys';
export const getCurrentPlayer = () => {
  const uid = inject(PlayerKey);
  return usePlayersStore().getPlayer(uid);
};

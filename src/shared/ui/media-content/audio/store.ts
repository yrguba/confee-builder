import { useZustand, UseZustandTypes } from 'shared/hooks';

import { AudioForPlayer } from './types';

type Store = {
    currentlyPlaying?: AudioForPlayer;
    list?: AudioForPlayer;
    type: 'audios' | 'voices';
};

const audioStore = useZustand<Store>({
    keys: ['currentlyPlaying', 'type', 'list'],
});

export type AudioStoreTypes = UseZustandTypes.StoreTypes<typeof audioStore.use>;
export default audioStore;

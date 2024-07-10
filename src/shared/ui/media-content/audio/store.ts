import { useZustand, UseZustandTypes } from 'shared/hooks';

import { AudioForPlayer } from './types';

type Store = {
    currentlyPlaying?: AudioForPlayer;
    list?: AudioForPlayer[];
    type: 'audios' | 'voices';
    repeatList: boolean;
};

const audioStore = useZustand<Store>({
    default: {
        list: [],
    },
    keys: ['currentlyPlaying', 'type', 'list', 'repeatList'],
});

export type AudioStoreTypes = UseZustandTypes.StoreTypes<typeof audioStore.use>;
export default audioStore;

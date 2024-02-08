import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useStore, UseStoreTypes } from 'shared/hooks';

import { AudioForPlayer } from './types';

type Store = {
    currentlyPlaying: UseStoreTypes.SelectorWithObj<AudioForPlayer>;
    list: UseStoreTypes.SelectorWithArr<AudioForPlayer>;
    type: UseStoreTypes.SelectorWithPrimitive<'audios' | 'voices'>;
};
const { createSelectors, generateSelectorWithObj, generateSelectorWithArr, generateSelectorWithPrimitive } = useStore<Store>();
const AudioStore = create<Store>()(
    devtools(
        immer((set, getState) => ({
            ...generateSelectorWithObj(['currentlyPlaying'], set),
            ...generateSelectorWithPrimitive(['type'], set),
            ...generateSelectorWithArr(['list'], set),
        }))
    )
);

const useAudioStore = createSelectors(AudioStore);

export default useAudioStore;

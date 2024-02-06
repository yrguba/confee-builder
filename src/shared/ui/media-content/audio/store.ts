import { RefObject } from 'react';
import { ref } from 'yup';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useStore, useCreateSelectors, UseStoreTypes } from 'shared/hooks';

import { AudioForPlayer } from './types';

type Store = {
    currentlyPlaying: UseStoreTypes.SelectorWithObj<AudioForPlayer>;
};
const { createSelectors, generateSelectorWithObj } = useStore<Store>();
const AudioStore = create<Store>()(
    devtools(
        immer((set, getState) => ({
            ...generateSelectorWithObj(['currentlyPlaying'], set),
        }))
    )
);

const useAudioStore = createSelectors(AudioStore);

export default useAudioStore;

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useStore, useCreateSelectors, UseStoreTypes } from 'shared/hooks';

type Store = {
    initialOpenChat: UseStoreTypes.SelectorWithArr<{
        id: number;
        name: string;
        src: string;
        url: string;
    }>;
    audioIdCurrentlyPlaying: UseStoreTypes.SelectorWithPrimitive<number | null>;
};
const { createSelectors, generateSelectorWithPrimitive, generateSelectorWithArr } = useStore<Store>();
const AudioStore = create<Store>()(
    devtools(
        immer((set) => ({
            ...generateSelectorWithPrimitive(['audioIdCurrentlyPlaying'], set),
        }))
    )
);

const useAudioStore = useCreateSelectors(AudioStore);

export default useAudioStore;

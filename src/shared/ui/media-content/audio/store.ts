import { RefObject } from 'react';
import { ref } from 'yup';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useStore, useCreateSelectors, UseStoreTypes } from 'shared/hooks';

type Store = {
    ref: RefObject<HTMLAudioElement> | null;
    isPlaying: boolean;
    checkIsPlaying: (src: string) => boolean;
    togglePlay: (ref: RefObject<HTMLAudioElement>) => void;
    observer: string;
};

const AudioStore = create<Store>()(
    devtools(
        immer((set, getState) => ({
            ref: null,
            isPlaying: false,
            observer: '',
            checkIsPlaying: (src) => {
                const { ref, isPlaying } = getState();
                if (ref?.current?.currentSrc === src && isPlaying) return true;
                return false;
            },
            togglePlay: (newRef) =>
                set((state) => {
                    const checkPlaying = () => {};

                    const { isPlaying, ref } = state;
                    if (state.ref) {
                        if (ref?.current?.currentSrc === newRef.current?.currentSrc) {
                            if (isPlaying) {
                                ref?.current?.pause();
                                return { isPlaying: false, observer: Date.now() };
                            }
                            ref?.current?.play();
                            return { isPlaying: true, observer: Date.now() };
                        }
                        ref?.current?.pause();
                        newRef.current?.play();
                        return { ref: newRef, isPlaying: true, observer: Date.now() };
                    }
                    newRef.current?.play();
                    return { ref: newRef, isPlaying: true, observer: Date.now() };
                }),
        }))
    )
);

const useAudioStore = useCreateSelectors(AudioStore);

export default useAudioStore;

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useStore, useCreateSelectors } from 'shared/hooks';

type Store = {};
const { createSelectors, generateSelectorWithObj } = useStore<Store>();
const meetStore = create<Store>()(
    devtools(
        immer((set) => ({
            ...generateSelectorWithObj([], set),
        }))
    )
);

const useMeetStore = useCreateSelectors(meetStore);

export default useMeetStore;

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useStore, useCreateSelectors } from 'shared/hooks';

type Store = {};
const { createSelectors, generateSelectorWithObj } = useStore<Store>();
const callsStore = create<Store>()(
    devtools(
        immer((set) => ({
            ...generateSelectorWithObj([], set),
        }))
    )
);

const useCallsStore = useCreateSelectors(callsStore);

export default useCallsStore;

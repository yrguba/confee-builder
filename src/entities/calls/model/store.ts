import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useStore } from 'shared/hooks';

type Store = {};
const { createSelectors, generateState } = useStore<Store>();
const callsStore = create<Store>()(
    devtools(
        immer((set) => ({
            ...generateState([], set),
        }))
    )
);

const useCallsStore = createSelectors(callsStore);

export default useCallsStore;

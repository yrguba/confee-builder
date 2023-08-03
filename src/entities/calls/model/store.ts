import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useCreateSelectors } from 'shared/hooks';

type Store = {};

const callsStore = create<Store>()(devtools(immer((set) => ({}))));

const useCallsStore = useCreateSelectors(callsStore);

export default useCallsStore;

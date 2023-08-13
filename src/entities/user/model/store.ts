import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useCreateSelectors } from 'shared/hooks';

type Store = {};
// const { createSelectors, createObject } = useStore();
const userStore = create<Store>()(devtools(immer((set) => ({}))));

const useUserStore = useCreateSelectors(userStore);

export default useUserStore;

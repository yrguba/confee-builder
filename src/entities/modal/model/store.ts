import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useCreateSelectors } from 'shared/hooks';

type Store = {};

const modalStore = create<Store>()(devtools(immer((set) => ({}))));

const useModalStore = useCreateSelectors(modalStore);

export default useModalStore;

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useStore } from 'shared/hooks';
import { NotificationTypes } from 'shared/ui';

const { createSelectors, createObject } = useStore();
type Store = {};

const AppStore = create<Store>()(devtools(immer((set) => ({}))));

const useAppStore = createSelectors(AppStore);

export default useAppStore;

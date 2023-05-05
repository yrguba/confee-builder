import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useCreateSelectors } from 'shared/hooks';

import { Notification } from './types';

type Store = {
    notifications: Notification[];
    setNotifications: (notifications: Omit<Notification, 'id'>) => void;
    deleteFirstNotifications: () => void;
};

const AppStore = create<Store>()(
    devtools(
        immer((set) => ({
            notifications: [],
            setNotifications: (notification) =>
                set((state) => {
                    if (notification.system) {
                        if (!state.notifications.find((i) => i.text === notification.text)) {
                            state.notifications.push({ ...notification, id: new Date().valueOf() });
                        }
                    } else {
                        state.notifications.push({ ...notification, id: new Date().valueOf() });
                    }
                }),
            deleteFirstNotifications: () =>
                set((state) => {
                    state.notifications.splice(0, 1);
                }),
        }))
    )
);

const useAppStore = useCreateSelectors(AppStore);

export default useAppStore;

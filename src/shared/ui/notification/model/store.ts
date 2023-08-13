import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useStore } from 'shared/hooks';

import { Notification } from './types';

type Store = {
    notifications: Notification[];
    setNotifications: (data: Notification) => void;
    deleteFirstNotifications: () => void;
    deleteNotificationsById: (id: number) => void;
};
const { createSelectors, createObject } = useStore();
const NotificationStore = create<Store>()(
    devtools(
        immer((set) => ({
            notifications: [],
            setNotifications: (notification) =>
                set((state) => {
                    if (notification.system) {
                        if (!state.notifications.find((i) => i.title === notification.title)) {
                            state.notifications.push(notification);
                        }
                    } else {
                        state.notifications.push(notification);
                    }
                }),
            deleteFirstNotifications: () =>
                set((state) => {
                    state.notifications.splice(0, 1);
                }),
            deleteNotificationsById: (id) =>
                set((state) => {
                    state.notifications = state.notifications.filter((i) => i.id !== id);
                }),
        }))
    )
);

const useNotificationStore = createSelectors(NotificationStore);

export default useNotificationStore;

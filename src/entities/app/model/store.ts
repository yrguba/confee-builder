import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useCreateSelectors } from 'shared/hooks';
import { NotificationTypes } from 'shared/ui';

type Store = {
    notifications: NotificationTypes.Notification[];
    setNotifications: (data: Omit<NotificationTypes.Notification, 'id'>) => void;
    deleteFirstNotifications: () => void;
    deleteNotificationsById: (id: number) => void;
};

const AppStore = create<Store>()(
    devtools(
        immer((set) => ({
            notifications: [],
            setNotifications: (notification) =>
                set((state) => {
                    if (notification.system) {
                        if (!state.notifications.find((i) => i.title === notification.title)) {
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
            deleteNotificationsById: (id) =>
                set((state) => {
                    state.notifications = state.notifications.filter((i) => i.id !== id);
                }),
        }))
    )
);

const useAppStore = useCreateSelectors(AppStore);

export default useAppStore;

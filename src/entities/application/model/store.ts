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

const ApplicationStore = create<Store>()(
    devtools(
        immer((set) => ({
            notifications: [],
            setNotifications: (notification) =>
                set((state) => {
                    state.notifications.push({ ...notification, id: new Date().valueOf() });
                }),
            deleteFirstNotifications: () =>
                set((state) => {
                    state.notifications.splice(0, 1);
                }),
        }))
    )
);

const useApplicationStore = useCreateSelectors(ApplicationStore);

export default useApplicationStore;

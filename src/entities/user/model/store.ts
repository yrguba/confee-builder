import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useCreateSelectors } from 'shared/hooks';

import { User } from './types';

type Store = {
    selectedUsers: User[];
    setSelectedUsers: (arg: User) => void;
    clearSelectedUsers: () => void;
};

const userStore = create<Store>()(
    devtools(
        immer((set) => ({
            selectedUsers: [],
            setSelectedUsers: (user) =>
                set((state) => {
                    const foundUserIndex = state.selectedUsers.findIndex((i) => i.id === user.id);
                    foundUserIndex === -1 ? state.selectedUsers.push(user) : state.selectedUsers.splice(foundUserIndex, 1);
                }),
            clearSelectedUsers: () =>
                set((state) => {
                    state.selectedUsers = [];
                }),
        }))
    )
);

const useUserStore = useCreateSelectors(userStore);

export default useUserStore;

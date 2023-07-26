import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useCreateSelectors } from 'shared/hooks';

import { User } from './types';

type Store = {
    selectedUsers: User[];
    openContactsModal: boolean;
    openAddContactsModal: boolean;
    setSelectedUsers: (arg: User) => void;
    clearSelectedUsers: () => void;
    setOpenContactsModal: (val: boolean) => void;
    setOpenAddContactsModal: (val: boolean) => void;
};

const userStore = create<Store>()(
    devtools(
        immer((set) => ({
            selectedUsers: [],
            openContactsModal: false,
            openAddContactsModal: false,
            setSelectedUsers: (user) =>
                set((state) => {
                    const foundUserIndex = state.selectedUsers.findIndex((i) => i.id === user.id);
                    foundUserIndex === -1 ? state.selectedUsers.push(user) : state.selectedUsers.splice(foundUserIndex, 1);
                }),
            clearSelectedUsers: () =>
                set((state) => {
                    state.selectedUsers = [];
                }),
            setOpenContactsModal: (val) =>
                set((state) => {
                    state.openContactsModal = val;
                }),
            setOpenAddContactsModal: (val) =>
                set((state) => {
                    state.openAddContactsModal = val;
                }),
        }))
    )
);

const useUserStore = useCreateSelectors(userStore);

export default useUserStore;

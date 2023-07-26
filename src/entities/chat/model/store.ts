import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useCreateSelectors } from 'shared/hooks';

import { ChatProxy } from './types';

type Store = {
    socketAction: string;
    selectedChats: ChatProxy[];
    visibleHeaderMenu: boolean;
    openChatInfo: { chatId: number; userId?: number | null } | null;
    setSocketAction: (action: string) => void;
    setSelectedChats: (chat: ChatProxy) => void;
    clearSelectedChats: () => void;
    setVisibleHeaderMenu: (value?: boolean) => void;
    setOpenChatInfo: (data: { chatId: number; userId?: number | null }) => void;
};

const chatStore = create<Store>()(
    devtools(
        immer((set) => ({
            socketAction: '',
            selectedChats: [],
            visibleHeaderMenu: false,
            openChatInfo: null,
            setSocketAction: (action) =>
                set((state) => {
                    state.socketAction = action;
                }),
            setSelectedChats: (chat) =>
                set((state) => {
                    const foundChatIndex = state.selectedChats.findIndex((i) => i.id === chat.id);
                    foundChatIndex === -1 ? state.selectedChats.push(chat) : state.selectedChats.splice(foundChatIndex, 1);
                }),
            clearSelectedChats: () =>
                set((state) => {
                    state.selectedChats = [];
                }),
            setVisibleHeaderMenu: (value) =>
                set((state) => {
                    if (value) {
                        state.visibleHeaderMenu = value;
                    } else {
                        state.visibleHeaderMenu = !state.visibleHeaderMenu;
                    }
                }),
            setOpenChatInfo: (data) =>
                set((state) => {
                    state.openChatInfo = data;
                }),
        }))
    )
);

const useChatStore = useCreateSelectors(chatStore);

export default useChatStore;

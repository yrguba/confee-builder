import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useCreateSelectors } from 'shared/hooks';

import { ChatProxy } from './types';

type Store = {
    socketAction: string;
    selectedChats: ChatProxy[];
    visibleHeaderMenu: boolean;
    setSocketAction: (action: string) => void;
    setSelectedChats: (chat: ChatProxy) => void;
    clearSelectedChats: () => void;
    setVisibleHeaderMenu: (value?: boolean) => void;
};

const chatStore = create<Store>()(
    devtools(
        immer((set) => ({
            socketAction: '',
            selectedChats: [],
            visibleHeaderMenu: false,
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
        }))
    )
);

const useChatStore = useCreateSelectors(chatStore);

export default useChatStore;

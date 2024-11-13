import { useZustand, UseZustandTypes } from 'shared/hooks';

type Store = {
    chatSubscription: number | null;
    initialOpenChat: boolean;
    visibleChatGpt: boolean;
};

type Methods = {
    visibleChatGpt: {
        toggle: (value: boolean) => void;
    };
};

const chatStore = useZustand<Store, Methods>({
    keys: ['chatSubscription', 'initialOpenChat', 'visibleChatGpt'],
    default: {
        visibleChatGpt: true,
    },
    methods: {
        visibleChatGpt: (use) => ({
            toggle: (value) => {
                // @ts-ignore
                const { updater } = use();
                updater({ visibleChatGpt: value });
            },
        }),
    },
    forStorage: {
        keys: ['visibleChatGpt'],
        storageName: 'chats_storage',
    },
});

export type ChatStoreTypes = UseZustandTypes.StoreTypes<typeof chatStore.use>;
export default chatStore;

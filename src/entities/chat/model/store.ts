import { useZustand } from 'shared/hooks';

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

type VisibleChatGptMethods = ReturnType<typeof chatStore.use.visibleChatGpt>;

export type { VisibleChatGptMethods };
export default chatStore;

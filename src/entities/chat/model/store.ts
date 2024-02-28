import { useZustand } from 'shared/hooks';

type Store = {
    chatSubscription: number | null;
    initialOpenChat: boolean;
};

const chatStore = useZustand<Store>({
    keys: ['chatSubscription', 'initialOpenChat'],
});

export default chatStore;

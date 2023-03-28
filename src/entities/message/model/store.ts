import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useCreateSelectors } from 'shared/hooks';

type Store = {
    subscriptionsTrigger: boolean;
    setSubscriptionsTrigger: () => void;
};

const messageStore = create<Store>()(
    devtools(
        immer((set) => ({
            subscriptionsTrigger: false,
            setSubscriptionsTrigger: () =>
                set((state) => {
                    state.subscriptionsTrigger = !state.subscriptionsTrigger;
                }),
        }))
    )
);

const useMessageStore = useCreateSelectors(messageStore);

export default useMessageStore;

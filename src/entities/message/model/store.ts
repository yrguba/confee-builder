import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useCreateSelectors } from 'shared/hooks';

type Store = {};

const messageStore = create<Store>()(
    devtools(
        immer((set) => ({
            //
        }))
    )
);

const useMessageStore = useCreateSelectors(messageStore);

export default useMessageStore;

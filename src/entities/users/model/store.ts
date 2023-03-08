import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useCreateSelectors } from 'shared/hooks';

type Store = {};

const usersStore = create<Store>()(
    devtools(
        immer((set) => ({
            //
        }))
    )
);

const useUsersStore = useCreateSelectors(usersStore);

export default useUsersStore;

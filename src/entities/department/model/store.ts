import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useCreateSelectors } from 'shared/hooks';

type Store = {};

const departmentStore = create<Store>()(
    devtools(
        immer((set) => ({
            //
        }))
    )
);

const useDepartmentStore = useCreateSelectors(departmentStore);

export default useDepartmentStore;

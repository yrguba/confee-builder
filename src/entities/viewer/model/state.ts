import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useCreateSelectors } from 'shared/hooks';

type State = {};

const viewerStore = create<State>()(
    devtools(
        immer((set) => ({
            //
        }))
    )
);

export default useCreateSelectors(viewerStore);

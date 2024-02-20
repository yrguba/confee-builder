import useZustand from 'react-use-zustand';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useStore, useCreateSelectors, useFs } from 'shared/hooks';

type Store = {
    viewer: any;
};

const viewerStore = useZustand<Store>({
    keys: ['viewer'],
});

export default viewerStore;

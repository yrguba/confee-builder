import useZustand from 'react-use-zustand';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useStore, useCreateSelectors, useFs } from 'shared/hooks';

type Store = {
    viewer: {
        user: any;
    };
};

const fs = useFs();

const viewerStore = useZustand<Store>({
    keys: ['viewer'],
    asyncDefault: {
        viewer: async (updater) => {
            return {
                user: fs.getJson({ baseDir: 'document', folder: 'cache', fileName: 'viewer' }),
            };
        },
    },
});

export default viewerStore;

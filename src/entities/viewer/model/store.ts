import { useZustand, UseZustandTypes } from 'shared/hooks';

import { Session, ViewerProxy } from './types';

type Store = {
    viewer: ViewerProxy;
    session: Session;
    tokens: {
        access_token: string;
        refresh_token: string;
    };
};

type Methods = {
    // tokens: {
    //     check: () => boolean;
    // };
};

const viewerStore = useZustand<Store, Methods>({
    keys: ['viewer', 'session', 'tokens'],
    methods: {
        // tokens: (use) => ({
        //     check: () => {
        //         const { updater, state } = use();
        //         return !!state.tokens.value?.access_token;
        //     },
        // }),
    },

    forStorage: {
        keys: ['viewer', 'session', 'tokens'],
        storageName: 'viewer_storage',
    },
});

export type ViewerStoreTypes = UseZustandTypes.StoreTypes<typeof viewerStore.use>;
export default viewerStore;

import { useZustand, UseZustandTypes } from 'shared/hooks';

import { Call } from './types';

type Store = {
    calls: Call[];
};

type Methods = {};

const meetStore = useZustand<Store, Methods>({
    keys: ['calls'],
    default: {
        calls: [],
    },
    forStorage: {
        all: true,
        storageName: 'meet_storage',
    },
});

export type MeetSoreTypes = UseZustandTypes.StoreTypes<typeof meetStore.use>;
export default meetStore;

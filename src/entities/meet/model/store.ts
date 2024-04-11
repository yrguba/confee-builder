import { useZustand, UseZustandTypes } from 'shared/hooks';

import { Call, CreateMeet } from './types';

type Store = {
    calls: Call[];
    createMeet: CreateMeet;
};

type Methods = {};

const meetStore = useZustand<Store, Methods>({
    keys: ['calls', 'createMeet'],
    default: {
        calls: [],
    },
    forStorage: {
        keys: ['calls'],
        storageName: 'meet_storage',
    },
});

export type MeetSoreTypes = UseZustandTypes.StoreTypes<typeof meetStore.use>;
export default meetStore;

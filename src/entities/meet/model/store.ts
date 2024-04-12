import { useZustand, UseZustandTypes } from 'shared/hooks';

import { Call, CreateMeet } from './types';

type Store = {
    createMeet: CreateMeet;
};

type Methods = {};

const meetStore = useZustand<Store, Methods>({
    keys: ['createMeet'],
    default: {},
    forStorage: {
        keys: [],
        storageName: 'meet_storage',
    },
});

export type MeetSoreTypes = UseZustandTypes.StoreTypes<typeof meetStore.use>;
export default meetStore;

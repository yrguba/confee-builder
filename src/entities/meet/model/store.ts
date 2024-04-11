import { useZustand, UseZustandTypes } from 'shared/hooks';

import { Call, CreateMeet } from './types';

type Store = {
    activeCalls: Call[];
    incomingCalls: Call[];
    outgoingCalls: Call;
    createMeet: CreateMeet;
};

type Methods = {};

const meetStore = useZustand<Store, Methods>({
    keys: ['activeCalls', 'createMeet', 'incomingCalls', 'outgoingCalls'],
    default: {
        activeCalls: [],
        incomingCalls: [],
    },
    forStorage: {
        keys: [],
        storageName: 'meet_storage',
    },
});

export type MeetSoreTypes = UseZustandTypes.StoreTypes<typeof meetStore.use>;
export default meetStore;

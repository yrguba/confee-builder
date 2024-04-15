import { useZustand, UseZustandTypes } from 'shared/hooks';

import { IncomingCall, CreateMeet } from './types';

type Store = {
    createMeet: CreateMeet;
    incomingCall: IncomingCall;
};

type Methods = {};

const meetStore = useZustand<Store, Methods>({
    keys: ['createMeet', 'incomingCall'],
    default: {},
});

export type MeetSoreTypes = UseZustandTypes.StoreTypes<typeof meetStore.use>;
export default meetStore;

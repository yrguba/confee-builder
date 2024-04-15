import { useZustand, UseZustandTypes } from 'shared/hooks';

import { Meet } from './types';

type Store = {
    createCall: Meet & { isGroup: boolean };
    incomingCall: Meet;
};

type Methods = {};

const meetStore = useZustand<Store, Methods>({
    keys: ['createCall', 'incomingCall'],
    default: {},
});

export type MeetSoreTypes = UseZustandTypes.StoreTypes<typeof meetStore.use>;
export default meetStore;

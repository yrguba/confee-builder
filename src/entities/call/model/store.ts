import { useZustand, UseZustandTypes } from 'shared/hooks';

import { Meet, Responses } from './types';

type Store = {
    createCall: Meet & { isGroup: boolean };
    incomingCall: Meet;
    responses: { callId: number; response: Responses }[];
};

type Methods = {};

const callStore = useZustand<Store, Methods>({
    keys: ['createCall', 'incomingCall', 'responses'],
    default: {
        responses: [],
    },
});

export type CallSoreTypes = UseZustandTypes.StoreTypes<typeof callStore.use>;
export default callStore;

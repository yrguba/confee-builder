import { useZustand, UseZustandTypes } from 'shared/hooks';

import { Meet, Responses } from './types';

type Store = {
    createCall: Meet & { isGroup: boolean };
    incomingCall: Meet;
    responses: { callId: number; response: Responses }[];
    socketReady: boolean;
};

type Methods = {};

const callStore = useZustand<Store, Methods>({
    keys: ['createCall', 'incomingCall', 'responses', 'socketReady'],
    default: {
        responses: [],
    },
});

export type CallSoreTypes = UseZustandTypes.StoreTypes<typeof callStore.use>;
export default callStore;

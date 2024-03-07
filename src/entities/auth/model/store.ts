import { useZustand, UseZustandTypes } from 'shared/hooks';

type Store = {
    invitationToConference?: {
        avatar: string;
        id: string;
        name: string;
        muted: boolean;
    };
};

type Methods = {};

const authStore = useZustand<Store, Methods>({
    keys: ['invitationToConference'],
});

export type AuthSoreTypes = UseZustandTypes.AllTypes<typeof authStore.use>;
export default authStore;

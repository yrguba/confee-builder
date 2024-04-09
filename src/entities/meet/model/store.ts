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

const meetStore = useZustand<Store, Methods>({
    keys: ['invitationToConference'],
});

export type MeetSoreTypes = UseZustandTypes.StoreTypes<typeof meetStore.use>;
export default meetStore;

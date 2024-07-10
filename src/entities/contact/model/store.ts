import { useZustand, UseZustandTypes } from 'shared/hooks';

type Store = {};

type Methods = {};

const contactStore = useZustand<Store, Methods>({
    keys: [],
});

export type ContactSoreTypes = UseZustandTypes.StoreTypes<typeof contactStore.use>;
export default contactStore;

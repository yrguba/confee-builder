import { useZustand, UseZustandTypes } from 'shared/hooks';

type Store = {};

type Methods = {};

const userStore = useZustand<Store, Methods>({
    keys: [],
});

export type UserStoreTypes = UseZustandTypes.StoreTypes<typeof userStore.use>;
export default userStore;

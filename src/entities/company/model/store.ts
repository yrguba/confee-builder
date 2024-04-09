import { useZustand, UseZustandTypes } from 'shared/hooks';

type Store = {};

type Methods = {};

const companyStore = useZustand<Store, Methods>({
    keys: [],
});

export type CompanySoreTypes = UseZustandTypes.StoreTypes<typeof companyStore.use>;
export default companyStore;

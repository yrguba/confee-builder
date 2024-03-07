import { useZustand, UseZustandTypes } from 'shared/hooks';

type Store = {};

type Methods = {};

const viewerStore = useZustand<Store, Methods>({
    keys: [],
});

export type ViewerStoreTypes = UseZustandTypes.AllTypes<typeof viewerStore.use>;
export default viewerStore;

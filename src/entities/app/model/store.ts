import { useZustand, UseZustandTypes } from 'shared/hooks';

type Store = {
    autostart: boolean;
};

type Methods = {
    autostart: {
        toggle: (value: boolean) => void;
    };
};

const appStore = useZustand<Store, Methods>({
    keys: ['autostart'],
    default: {
        autostart: false,
    },
    methods: {
        autostart: (use) => ({
            toggle: (value) => {
                const { updater } = use();
                updater({ autostart: value });
            },
        }),
    },
    forStorage: {
        keys: ['autostart'],
        storageName: 'app_storage',
    },
});

export type AppStoreTypes = UseZustandTypes.AllTypes<typeof appStore.use>;
export default appStore;

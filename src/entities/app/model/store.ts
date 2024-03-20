import { useZustand, UseZustandTypes } from 'shared/hooks';

type Store = {
    autostart: boolean;
    enableNotifications: boolean;
    enableCompanyNotifications: boolean;
};

type Methods = {};

const appStore = useZustand<Store, Methods>({
    keys: ['autostart', 'enableNotifications', 'enableCompanyNotifications'],
    default: {
        autostart: false,
        enableNotifications: true,
        enableCompanyNotifications: true,
    },
    forStorage: {
        all: true,
        storageName: 'app_storage',
    },
});

export type AppStoreTypes = UseZustandTypes.AllTypes<typeof appStore.use>;
export default appStore;

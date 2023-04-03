import { StorageObjectsNames } from 'shared/enums';
import { storages } from 'shared/lib';
import { UniversalStorage } from 'shared/services';

import { useCrypto } from '../hooks';

type Tokens = {
    access_token: string;
    refresh_token: string;
};

class TokenService {
    async checkAuth() {
        const access_token = await UniversalStorage.get(StorageObjectsNames.access_token);
        const refresh_token = await UniversalStorage.get(StorageObjectsNames.refresh_token);
        return !!(access_token && refresh_token);
    }

    async save(tokens: Tokens) {
        const accessEncoded = useCrypto(tokens.access_token, 'encode');
        const refreshEncoded = useCrypto(tokens.refresh_token, 'encode');
        await UniversalStorage.set(StorageObjectsNames.access_token, accessEncoded);
        await UniversalStorage.set(StorageObjectsNames.refresh_token, refreshEncoded);
    }

    get() {
        const getDecoded = (access_token: string, refresh_token: string) => ({
            access_token: useCrypto(access_token, 'decode'),
            refresh_token: useCrypto(refresh_token, 'decode'),
        });
        const access_token = storages.cookie.get(StorageObjectsNames.access_token);
        const refresh_token = storages.cookie.get(StorageObjectsNames.refresh_token);
        if (access_token && refresh_token) return getDecoded(access_token, refresh_token);
    }

    async getAsync() {
        const getDecoded = (access_token: string, refresh_token: string) => ({
            access_token: useCrypto(access_token, 'decode'),
            refresh_token: useCrypto(refresh_token, 'decode'),
        });
        const access_token = await UniversalStorage.get(StorageObjectsNames.access_token);
        const refresh_token = await UniversalStorage.get(StorageObjectsNames.refresh_token);
        if (access_token && refresh_token) return getDecoded(access_token, refresh_token);
    }

    async remove() {
        await UniversalStorage.remove(StorageObjectsNames.access_token);
        await UniversalStorage.remove(StorageObjectsNames.refresh_token);
    }
}

export default new TokenService();

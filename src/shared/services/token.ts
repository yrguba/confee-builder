import { StorageObjectsNames } from 'shared/enums';
import { UniversalStorage } from 'shared/services';

import { useCrypto } from '../hooks';

type Tokens = {
    access_token: string;
    refresh_token: string;
};

class TokenService {
    checkAuth() {
        const access_token = UniversalStorage.cookieGet(StorageObjectsNames.access_token);
        const refresh_token = UniversalStorage.cookieGet(StorageObjectsNames.refresh_token);
        return !!(access_token && refresh_token);
    }

    save(tokens: Tokens) {
        const accessEncoded = useCrypto(tokens.access_token, 'encode');
        const refreshEncoded = useCrypto(tokens.refresh_token, 'encode');
        UniversalStorage.cookieSet(StorageObjectsNames.access_token, accessEncoded);
        UniversalStorage.cookieSet(StorageObjectsNames.refresh_token, refreshEncoded);
    }

    get() {
        const getDecoded = (access_token: string, refresh_token: string) => ({
            access_token: useCrypto(access_token, 'decode'),
            refresh_token: useCrypto(refresh_token, 'decode'),
        });
        const access_token = UniversalStorage.cookieGet(StorageObjectsNames.access_token);
        const refresh_token = UniversalStorage.cookieGet(StorageObjectsNames.refresh_token);
        console.log(access_token);
        if (access_token && refresh_token) return getDecoded(access_token, refresh_token);
    }

    remove() {
        UniversalStorage.cookieRemove(StorageObjectsNames.access_token);
        UniversalStorage.cookieRemove(StorageObjectsNames.refresh_token);
    }
}

export default new TokenService();

import { useCrypto } from 'shared/hooks';
import { UniversalStorage } from 'shared/services';

type Tokens = {
    access_token: string;
    refresh_token: string;
};

class TokenService {
    checkAuth() {
        const access_token = UniversalStorage.cookieGet('access_token');
        const refresh_token = UniversalStorage.cookieGet('refresh_token');
        return !!(access_token && refresh_token);
    }

    save(tokens: Tokens) {
        const accessEncoded = useCrypto(tokens.access_token, 'encode');
        const refreshEncoded = useCrypto(tokens.refresh_token, 'encode');
        UniversalStorage.cookieSet('access_token', accessEncoded);
        UniversalStorage.cookieSet('refresh_token', refreshEncoded);
    }

    get() {
        const getDecoded = (access_token: string, refresh_token: string) => ({
            access_token: useCrypto(access_token, 'decode'),
            refresh_token: useCrypto(refresh_token, 'decode'),
        });
        const access_token = UniversalStorage.cookieGet('access_token');
        const refresh_token = UniversalStorage.cookieGet('refresh_token');
        if (access_token && refresh_token) return getDecoded(access_token, refresh_token);
    }

    remove() {
        UniversalStorage.cookieRemove('access_token');
        UniversalStorage.cookieRemove('refresh_token');
    }
}

export default new TokenService();

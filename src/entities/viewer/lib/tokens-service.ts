import { storage } from 'entities/app';
import { crypto } from 'shared/lib';

type Tokens = {
    access_token: string;
    refresh_token: string;
};

class TokenService {
    checkAuth() {
        const access_token = storage.cookieGet('access_token');
        const refresh_token = storage.cookieGet('refresh_token');
        return !!(access_token && refresh_token);
    }

    save(tokens: Tokens) {
        const accessEncoded = crypto(tokens.access_token, 'encode');
        const refreshEncoded = crypto(tokens.refresh_token, 'encode');
        storage.cookieSet('access_token', accessEncoded);
        storage.cookieSet('refresh_token', refreshEncoded);
    }

    get() {
        const getDecoded = (access_token: string, refresh_token: string) => ({
            access_token: crypto(access_token, 'decode'),
            refresh_token: crypto(refresh_token, 'decode'),
        });
        const access_token = storage.cookieGet('access_token');
        const refresh_token = storage.cookieGet('refresh_token');
        if (access_token && refresh_token) return getDecoded(access_token, refresh_token);
    }

    remove() {
        storage.cookieRemove('access_token');
        storage.cookieRemove('refresh_token');
    }
}

export default new TokenService();

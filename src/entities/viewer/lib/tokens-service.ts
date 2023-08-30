import { useStorage } from 'shared/hooks';
import { crypto } from 'shared/lib';

type Tokens = {
    access_token: string;
    refresh_token: string;
};

class TokenService {
    checkAuth() {
        const storage = useStorage();
        const access_token = storage.get('access_token');
        const refresh_token = storage.get('refresh_token');
        return !!(access_token && refresh_token);
    }

    save(tokens: Tokens) {
        const storage = useStorage();
        const accessEncoded = crypto(tokens.access_token, 'encode');
        const refreshEncoded = crypto(tokens.refresh_token, 'encode');
        storage.set('access_token', tokens.access_token);
        storage.set('refresh_token', tokens.refresh_token);
    }

    get() {
        const storage = useStorage();
        const getDecoded = (access_token: string, refresh_token: string) => ({
            access_token: crypto(access_token, 'decode'),
            refresh_token: crypto(refresh_token, 'decode'),
        });
        const access_token = storage.get('access_token');
        const refresh_token = storage.get('refresh_token');
        if (access_token && refresh_token) return { access_token, refresh_token };
    }

    remove() {
        const storage = useStorage();
        storage.remove('access_token');
        storage.remove('refresh_token');
    }
}

export default new TokenService();

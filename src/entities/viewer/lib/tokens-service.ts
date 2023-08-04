import { useStorage } from 'shared/hooks';
import { crypto } from 'shared/lib';

type Tokens = {
    access_token: string;
    refresh_token: string;
};

class TokenService {
    storage = useStorage();

    checkAuth() {
        const access_token = this.storage.get('access_token');
        const refresh_token = this.storage.get('refresh_token');
        return !!(access_token && refresh_token);
    }

    save(tokens: Tokens) {
        const accessEncoded = crypto(tokens.access_token, 'encode');
        const refreshEncoded = crypto(tokens.refresh_token, 'encode');
        this.storage.set('access_token', accessEncoded);
        this.storage.set('refresh_token', refreshEncoded);
    }

    get() {
        const getDecoded = (access_token: string, refresh_token: string) => ({
            access_token: crypto(access_token, 'decode'),
            refresh_token: crypto(refresh_token, 'decode'),
        });
        const access_token = this.storage.get('access_token');
        const refresh_token = this.storage.get('refresh_token');
        if (access_token && refresh_token) return getDecoded(access_token, refresh_token);
    }

    remove() {
        this.storage.remove('access_token');
        this.storage.remove('refresh_token');
    }
}

export default new TokenService();

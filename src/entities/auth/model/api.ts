import { useMutation } from '@tanstack/react-query';

import { $axios } from 'shared/configs';
import { secrets } from 'shared/constanst';

type HandleLogin = {
    username: string;
    password: string;
};

export const handleLogin = () => {
    const additional = { grant_type: 'password', scope: 'users', ...secrets.auth };
    const loginFn = (data: HandleLogin) => $axios.post('/auth/oauth/token', { ...data, ...additional });
    return useMutation(loginFn);
};

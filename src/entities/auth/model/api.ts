import { useMutation } from '@tanstack/react-query';

import { axiosClient } from 'shared/configs';
import { secrets } from 'shared/constanst';

type HandleLogin = {
    username: string;
    password: string;
};

class AuthApi {
    // handleLogin() {
    //     const additional = { grant_type: 'password', scope: 'users', ...secrets.auth };
    //     const loginFn = (data: HandleLogin) => $axios.post('/auth/oauth/token', { ...data, ...additional });
    //     return useMutation(loginFn);
    // }
    handleSendOneSignalToken() {
        return useMutation((data: { onesignal_player_id: string }) => axiosClient.post('api/v2/authorization/onesignal_token', data));
    }

    handleLogin() {
        return useMutation((data: HandleLogin) => axiosClient.post('api/v2/authorization/login', { phone: data.username, code: data.password }));
    }
}

export default new AuthApi();

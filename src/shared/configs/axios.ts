import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

import { secrets, http } from 'shared/constanst';
import { TokenService } from 'shared/services';

const config: AxiosRequestConfig = {
    baseURL: `${http.url}`,
};
console.log(http.url);
const $axios = axios.create(config);

$axios.interceptors.request.use(async (config: any) => {
    const tokens = await TokenService.get();
    if (tokens?.access_token) {
        return {
            ...config,
            headers: {
                ...config.headers,
                Accept: 'application/json',
                Authorization: `Bearer ${tokens.access_token}`,
            },
        };
    }
    return config;
});

$axios.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        const currentTokens = await TokenService.get();
        if (error.response.status === 401 && error.config && currentTokens && !error.config._isRetry) {
            originalRequest._isRetry = true;
            try {
                const additional = { grant_type: 'refresh_token', ...secrets.auth };
                const res: any = await $axios.post('/auth/oauth/token', { refresh_token: currentTokens.refresh_token, ...additional });
                if (res.data) {
                    alert('refer');
                    console.log(res);
                    const { access_token, refresh_token } = res.data;
                    await TokenService.save({ access_token, refresh_token });
                } else {
                    await TokenService.remove();
                    // window.location.reload();
                }
                return await $axios.request(originalRequest);
            } catch (err) {
                await TokenService.remove();
                // window.location.reload();
                return null;
            }
        }

        return Promise.reject(error);
    }
);

export default $axios;

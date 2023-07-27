import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';

import { AppService } from 'entities/app';
import { TokenService } from 'shared/services';

const { url } = AppService.getUrls();
const { auth } = AppService.getSecret();
const config: AxiosRequestConfig = {
    baseURL: `${url}`,
};

const axiosClient = axios.create(config);

axiosClient.interceptors.request.use(async (config: any) => {
    const tokens = TokenService.get();
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

axiosClient.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        const currentTokens = TokenService.get();
        if (error.response.status === 401 && error.config && currentTokens && !error.config._isRetry) {
            error.config._isRetry = true;
            try {
                const additional = { grant_type: 'refresh_token', ...auth };
                // const res: any = await $axios.post('/auth/oauth/token', { refresh_token: currentTokens.refresh_token, ...additional });
                const res: any = await axiosClient.post('api/v2/authorization/refresh', currentTokens);
                if (res.data.data) {
                    const { access_token, refresh_token } = res.data.data;
                    await TokenService.save({ access_token, refresh_token });
                    return await axiosClient.request(originalRequest);
                }
                await TokenService.remove();
                window.location.reload();
                return null;
            } catch (err) {
                await TokenService.remove();
                window.location.reload();
                return null;
            }
        }

        return Promise.reject(error);
    }
);

export default axiosClient;

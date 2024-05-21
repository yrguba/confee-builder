import axios, { AxiosRequestConfig, AxiosError } from 'axios';

import { appService } from 'entities/app';

import { viewerStore } from '../../entities/viewer';
import { useWebSocket } from '../hooks';

const { backBaseURL } = appService.getUrls();
const { auth } = appService.getSecret();
const config: AxiosRequestConfig = {
    baseURL: `${backBaseURL}`,
};

const axiosClient = axios.create(config);

axiosClient.interceptors.request.use(async (config: any) => {
    const tokens = viewerStore.getState().tokens.value;
    const deviceName = await appService.getDeviceName();
    console.log(deviceName);
    if (tokens?.access_token) {
        return {
            ...config,
            headers: {
                ...config.headers,
                Accept: 'application/json',
                Authorization: `Bearer ${tokens.access_token}`,
                // 'x-device-name': 'deviceName',
                // 'X-COORDS': 'w',
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
        const { tokens } = viewerStore.getState();
        const { sendMessage } = useWebSocket<any, any>();
        if (error.response.status === 401 && error.config && tokens && !error.config._isRetry) {
            error.config._isRetry = true;
            try {
                const additional = { grant_type: 'refresh_token', ...auth };
                const res: any = await axiosClient.post('api/v2/oauth/token', { refresh_token: tokens.value.refresh_token, ...additional });
                if (res.data.data) {
                    tokens.set(res.data.data);
                    sendMessage('Auth', {
                        token: res.data.data.access_token,
                    });
                    return await axiosClient.request(originalRequest);
                }
                tokens.clear();
                window.location.reload();
                return null;
            } catch (err) {
                tokens.clear();
                window.location.reload();
                return null;
            }
        }

        return Promise.reject(error);
    }
);
export type { AxiosError };
export default axiosClient;

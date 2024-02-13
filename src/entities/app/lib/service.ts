import { useNetworkState } from 'react-use';

import pjson from '../../../../package.json';
import { NetworkState } from '../model/types';

class AppService {
    // @ts-ignore
    tauriIsRunning = !!window.__TAURI__;

    isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

    getUrls(): { clientBaseURL: string; clientFullURL: string; socketUrl: string; backBaseURL: string; localSocketUrl: string } {
        return {
            clientBaseURL: window.location.origin,
            clientFullURL: window.location.href,
            backBaseURL: this.isDev ? 'https://api-develop.confee.ru' : 'https://api.confee.ru',
            socketUrl: 'wss://dev.ws.confee.ru:9003/ws',
            localSocketUrl: 'ws://localhost:3001',
        };
    }

    getDeviceId(): string {
        return `${window.location.origin}%${window.navigator.userAgent}`;
    }

    getProjectInfo(): { name: string; version: string } {
        const { name, version } = pjson;
        return { name, version };
    }

    getSecret(): { auth: { client_secret: string; client_id: string }; crypto: string } {
        return {
            auth: {
                client_secret: process.env.REACT_APP_DEV_CLIENT_SECRET || '',
                client_id: process.env.REACT_APP_DEV_CLIENT_ID || '',
            },
            crypto: process.env.REACT_APP_CRYPTO_SECRET || 'jj',
        };
    }

    getNetworkState(): NetworkState {
        const { online, effectiveType, downlink } = useNetworkState();

        const getSpeed = () => {
            if (!downlink) return 'no';
            if (downlink < 60) return 'slow';
            return 'fast';
        };

        return {
            online: !!online,
            effectiveType,
            speed: getSpeed(),
            downlink,
        };
    }
}

export default new AppService();

import { invoke } from '@tauri-apps/api';
import { useNetworkState } from 'react-use';

import pjson from '../../../../package.json';
import { NetworkState } from '../model/types';

class AppService {
    // @ts-ignore
    tauriIsRunning = !!window.__TAURI__;

    isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' || process.env.REACT_APP_DEBUG === 'true';

    prodApi = this.isDev ? localStorage.getItem('prodApi') : true;

    getUrls(): { clientBaseURL: string; clientFullURL: string; socketUrl: string; backBaseURL: string; localSocketUrl: string } {
        const backDev = 'https://api-develop.confee.ru';
        const backProd = 'https://api.confee.ru';
        const socketDev = 'wss://ws-develop.confee.ru:9003/ws';
        const socketProd = 'wss://ws.confee.ru:9001/ws';
        return {
            clientBaseURL: window.location.origin,
            clientFullURL: window.location.href,
            backBaseURL: this.getOs() === 'MacOS' ? backDev : this.isDev ? (localStorage.getItem('prodApi') ? backProd : backDev) : backProd,
            // backBaseURL: backProd,
            socketUrl: this.getOs() === 'MacOS' ? socketDev : this.isDev ? (localStorage.getItem('prodApi') ? socketProd : socketDev) : socketProd,
            localSocketUrl: 'ws://localhost:3001',
        };
    }

    getOs() {
        if (navigator.userAgent.indexOf('Mac') !== -1) return 'MacOS';
        if (navigator.userAgent.indexOf('Win') !== -1) return 'Windows';
        if (navigator.userAgent.indexOf('Linux') !== -1) return 'Linux';
    }

    async getDeviceName() {
        if (this.tauriIsRunning) {
            return invoke('get_device_name');
        }
        return this.getOs();
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
                client_secret: this.prodApi ? process.env.REACT_APP_PROD_CLIENT_SECRET || '' : process.env.REACT_APP_DEV_CLIENT_SECRET || '',
                client_id: this.prodApi ? process.env.REACT_APP_PROD_CLIENT_ID || '' : process.env.REACT_APP_DEV_CLIENT_ID || '',
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

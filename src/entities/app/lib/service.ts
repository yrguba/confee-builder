import pjson from '../../../../package.json';

class AppService {
    // @ts-ignore
    tauriIsRunning = !!window.__TAURI__;

    getUrls(): { url: string; socketUrl: string; host: string } {
        return {
            host: window.location.href.split('/')[2],
            url: 'https://dev.api.confee.ru',
            socketUrl: 'wss://dev.ws.confee.ru:9003/ws',
        };
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
}

export default new AppService();

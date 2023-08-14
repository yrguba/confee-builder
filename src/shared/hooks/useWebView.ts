import { WebviewWindow } from '@tauri-apps/api/window';
import { useEffect, useState } from 'react';

import { callsTypes } from 'entities/calls';

import { getRandomString } from '../lib';

type Paths = callsTypes.Paths;

function useWebView(path: string, title?: string): { open: () => void; close: () => void } | null {
    if (!window.__TAURI__) return null;
    const [id, setId] = useState('wda');
    const webview: any = new WebviewWindow(id, {
        url: `${window.location.origin}${path}`,
        title: title || '',
        center: true,
        visible: false,
    });

    const close = () => {
        setId(getRandomString(20));
        webview.close();
    };
    useEffect(() => {
        webview.onCloseRequested(() => {
            setId(getRandomString(20));
        });
    }, []);

    const open = () => {
        webview.show();
    };
    return { close, open };
}

export default useWebView;

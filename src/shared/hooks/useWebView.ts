import { WebviewWindow, WindowManager, appWindow, CloseRequestedEvent } from '@tauri-apps/api/window';
import { useEffect, useState } from 'react';
import { useEffectOnce } from 'react-use';

import { ValuesInStorage } from './useStorage';

import { useStorage } from './index';

function useWebView(path: string, id: string, title?: string, clearStorage?: ValuesInStorage): { open: () => void; close: () => void } | null {
    if (!window.__TAURI__) return null;
    const existedWindow = WebviewWindow.getByLabel('google-window');
    const { remove } = useStorage();

    const webview = new WebviewWindow(id, {
        url: `${window.location.origin}${path}`,
        title: title || '',
        center: true,
        visible: false,
    });

    const close = () => {
        webview.close();
    };
    webview.once('tauri://close-requested', function () {
        clearStorage && remove(clearStorage);
    });

    const open = () => {
        webview.show();
    };

    return { close, open };
}

export default useWebView;

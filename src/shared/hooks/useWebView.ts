import { WebviewWindow, WindowManager, appWindow, CloseRequestedEvent } from '@tauri-apps/api/window';
import { useEffect, useState } from 'react';
import { useEffectOnce } from 'react-use';

import { ValuesInStorage } from './useStorage';

import { useStorage } from './index';

function useWebView(path: string, id: string, title?: string, clearStorage?: ValuesInStorage) {
    if (!window.__TAURI__) return null;

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

    return { close, open, isOpen: webview.isVisible };
}

export default useWebView;

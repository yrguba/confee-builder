import { WebviewWindow } from '@tauri-apps/api/window';
import { useEffect, useState } from 'react';

function useWebView(path: string, id: string, title?: string): { open: () => void; close: () => void } | null {
    if (!window.__TAURI__) return null;

    const webview = new WebviewWindow(id, {
        url: `${window.location.origin}${path}`,
        title: title || '',
        center: true,
        visible: false,
    });

    const close = () => {
        webview.close();
    };
    useEffect(() => {
        webview.onCloseRequested(() => {});
    }, []);

    const open = () => {
        webview.show();
    };

    return { close, open };
}

export default useWebView;

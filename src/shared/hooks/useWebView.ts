import { WebviewWindow, WindowManager, appWindow, CloseRequestedEvent } from '@tauri-apps/api/window';
import { useEffect, useState } from 'react';
import { useEffectOnce } from 'react-use';

import { ValuesInStorage } from './useStorage';

import { useStorage } from './index';

type Props = {
    path: string;
    id: string;
    title?: string;
    clearStorage?: ValuesInStorage;
    disabled?: boolean;
};

function useWebView(props: Props) {
    const { path, id, title, clearStorage, disabled } = props;
    if (!window.__TAURI__ || disabled) return null;

    const { remove } = useStorage();
    console.log('tt');
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

    return webview;
}

export default useWebView;

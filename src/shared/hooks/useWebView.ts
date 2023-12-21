import { invoke, window as tauriWindow } from '@tauri-apps/api';
import { TauriEvent } from '@tauri-apps/api/event';
import { WebviewWindow, WindowManager, appWindow, CloseRequestedEvent } from '@tauri-apps/api/window';
import { useEffect, useState } from 'react';
import { useEffectOnce } from 'react-use';

import { ValuesInStorage } from './useStorage';

import { useStorage } from './index';

type Props = {
    id: string;
    title?: string;
    onClose?: () => void;
};

function useWebView(props: Props) {
    const { id, title, onClose } = props;
    if (!window.__TAURI__) return null;

    const { remove } = useStorage();

    const open = async (path: string) => {
        await invoke('open_meet', { url: `${window.location.origin}${path}`, id });

        setTimeout(() => {
            const isGet = WebviewWindow.getByLabel(id);
            isGet?.once('tauri://close-requested', function () {
                onClose && onClose();
            });
        }, 1000);
    };

    return { open };
}

export default useWebView;

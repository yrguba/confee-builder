import { invoke } from '@tauri-apps/api';
import { Event, EventName } from '@tauri-apps/api/event';
import { appWindow, WebviewWindow } from '@tauri-apps/api/window';

type WebviewProps = {
    title?: string;
    events?: {
        onClose?: () => void;
    };
};

type WebviewEvents =
    | 'resize'
    | 'move'
    | 'close-requested'
    | 'window-created'
    | 'destroyed'
    | 'focus'
    | 'blur'
    | 'scale-change'
    | 'theme-changed'
    | 'file-drop'
    | 'file-drop-hover'
    | 'file-drop-cancelled'
    | 'menu'
    | 'update'
    | 'update-available'
    | 'update-install'
    | 'update-status'
    | 'update-download-progress';

function useRustServer() {
    const rustIsRunning = !!window.__TAURI__;

    const useWebview = (label: 'main' | 'meet', webviewProps?: WebviewProps) => {
        const isOpen = () => {
            if (!rustIsRunning) return null;
            return !!WebviewWindow.getByLabel(label);
        };

        const listen = (event: WebviewEvents, callback: () => void) => {
            if (!rustIsRunning) return null;
            const view = WebviewWindow.getByLabel(label);
            if (view) {
                appWindow.listen(`tauri://${event}`, callback);
            }
        };

        const listenOnce = (event: WebviewEvents, callback: () => void) => {
            if (!rustIsRunning) return null;
            const view = WebviewWindow.getByLabel(label);
            if (view) {
                appWindow.once(`tauri://${event}`, callback);
            }
        };

        const open = async (props: { path: string; title?: string }) => {
            if (!rustIsRunning) return null;
            await invoke('open_meet', { url: `${window.location.origin}${props.path}`, label });
            const view = WebviewWindow.getByLabel(label);
            setTimeout(() => {
                view?.setTitle(props?.title || webviewProps?.title || '');
                view?.once('tauri://close-requested', function () {
                    webviewProps?.events?.onClose && webviewProps.events.onClose();
                });
            }, 100);
        };

        const close = async () => {
            if (!rustIsRunning) return null;
            const view = WebviewWindow.getByLabel(label);
            if (view) {
                await view.close();
            }
        };

        return { isOpen, open, close, listen, listenOnce };
    };

    return { rustIsRunning, useWebview };
}

export default useRustServer;

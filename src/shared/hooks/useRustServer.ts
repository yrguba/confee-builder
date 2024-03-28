import { invoke } from '@tauri-apps/api';
import { Event, EventName } from '@tauri-apps/api/event';
import { appWindow, WebviewWindow } from '@tauri-apps/api/window';

type WebviewProps = {
    title?: string;
    events?: {
        onClose?: () => void;
    };
};

type Label = 'main' | 'meet' | 'photo_video_swiper' | '';
type Options = {
    webview: WebviewProps;
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

type Socket = 'photoVideoSwiperData';

function useRustServer(label: Label, options?: Options) {
    const rustIsRunning = !!window.__TAURI__;

    const useWebview = () => {
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
                view.once(`tauri://${event}`, callback);
            }
        };

        const open = async (props: { path: string; title?: string }) => {
            if (!rustIsRunning) return null;
            await invoke('open_window', { url: `${window.location.origin}${props.path}`, label });
            const view = WebviewWindow.getByLabel(label);
            setTimeout(() => {
                view?.setTitle(props?.title || options?.webview?.title || '');
                view?.once('tauri://close-requested', function () {
                    options?.webview?.events?.onClose && options?.webview?.events.onClose();
                });
                view?.maximize();
            }, 100);
        };

        const close = async () => {
            if (!rustIsRunning) return null;
            const view = WebviewWindow.getByLabel(label);
            if (view) {
                await view.close();
            }
        };

        const view = rustIsRunning && label ? WebviewWindow.getByLabel(label) : null;

        return { isOpen, open, close, listen, listenOnce, view };
    };

    const invoker = {
        setIconCounter: async (count: string) => {
            if (!rustIsRunning) return null;
            await invoke('set_icon_counter', { count });
        },
        getDeviceName: async () => {
            if (!rustIsRunning) return null;
            return invoke('get_device_name');
        },
    };

    const socket = {
        emit: (eventName: Socket, data: any) => {
            WebviewWindow.getByLabel('main')?.emit(eventName, JSON.stringify(data));
        },
        listen: <T = any>(eventName: Socket, cb: (data: T | {}) => void) => {
            WebviewWindow.getByLabel('main')?.listen(eventName, (e) => {
                e.payload && cb(e.payload);
            });
        },
    };

    return { rustIsRunning, useWebview, invoker, socket };
}

export default useRustServer;

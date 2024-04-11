import { invoke } from '@tauri-apps/api';
import { Event, EventName } from '@tauri-apps/api/event';
import { appWindow, WebviewWindow, WindowOptions } from '@tauri-apps/api/window';

type WebviewProps = {
    title?: string;
    events?: {
        onClose?: () => void;
    };
};

type Label = 'meet' | 'photo_video_swiper' | string;

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

type Socket = 'photoVideoSwiperData' | 'forwardMessage';

function useRustServer() {
    const rustIsRunning = !!window.__TAURI__;

    const useWebview = (label: Label, webviewProps?: WebviewProps) => {
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

        const create = (props: WindowOptions, hidden?: boolean) => {
            if (!rustIsRunning) return null;
            const webview = new WebviewWindow(label, { ...props, minHeight: 600, minWidth: 600 });
            // console.log(webview);
            // if (hidden) {
            //     setTimeout(() => {
            //         webview.hide();
            //     }, 0);
            // }
        };

        const open = async (props: { path: string; title?: string }) => {
            if (!rustIsRunning) return null;
            await invoke('open_window', { url: `${window.location.origin}${props.path}`, label });
            const view = WebviewWindow.getByLabel(label);
            setTimeout(() => {
                view?.setTitle(props?.title || webviewProps?.title || '');
                view?.once('tauri://close-requested', function () {
                    webviewProps?.events?.onClose && webviewProps?.events.onClose();
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

        return { isOpen, open, close, listen, listenOnce, create, view };
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
        emit: <T = any>(label: Label, eventName: Socket, data: T | {}) => {
            if (!rustIsRunning) return null;
            WebviewWindow.getByLabel(label)?.emit(eventName, JSON.stringify(data));
        },
        listen: <T = any>(label: Label, eventName: Socket, cb: (data: T) => void) => {
            if (!rustIsRunning) return null;
            WebviewWindow.getByLabel(label)?.listen(eventName, (e) => {
                cb(JSON.parse(e.payload as any));
            });
        },
    };

    return { rustIsRunning, useWebview, invoker, socket };
}

export default useRustServer;

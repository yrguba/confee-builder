import { invoke } from '@tauri-apps/api';
import { WebviewWindow } from '@tauri-apps/api/window';

type WebviewProps = {
    title?: string;
    events?: {
        onClose: () => void;
    };
};

function useRustServer() {
    const useWebview = (label: 'main' | 'meet', webviewProps?: WebviewProps) => {
        const isOpen = () => {
            return !!WebviewWindow.getByLabel(label);
        };

        const open = async (props: { path: string; title?: string }) => {
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
            const view = WebviewWindow.getByLabel(label);
            if (view) {
                await view.close();
            }
        };

        return { isOpen, open, close };
    };

    return { isRunning: !!window.__TAURI__, useWebview };
}

export default useRustServer;

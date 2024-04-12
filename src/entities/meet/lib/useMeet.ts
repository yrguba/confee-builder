import { useRouter, useRustServer, useShell, useStorage } from '../../../shared/hooks';
import { getRandomString } from '../../../shared/lib';
import { Notification } from '../../../shared/ui';
import { appService } from '../../app';
import { chatService } from '../../chat';
import { ChatProxy } from '../../chat/model/types';
import { meetStore } from '../index';
import meetApi from '../model/api';

function useMeet() {
    const { params, navigate } = useRouter();
    const notification = Notification.use();

    const ls = useStorage();
    const { openBrowser } = useShell();
    const { mutate: handleCreateMeeting } = meetApi.handleCreateMeeting();
    const { mutate: handleLeftCall } = meetApi.handleLeftCall();

    // const calls = meetStore.use.calls();
    const createMeet = meetStore.use.createMeet();

    const { useWebview, rustIsRunning, socket } = useRustServer();

    const openCall = (id: string) => {
        const { view } = useWebview(`meet-${id}`);
        if (!view) {
            const webview = useWebview(`meet-${id}`, {
                // title: name || `Конференция`,
                events: {
                    onClose: () => {
                        // calls.set(calls.value.filter((i) => i.id !== id));
                        webview?.close();
                    },
                },
            });
            if (!webview.view) {
                if (appService.tauriIsRunning) {
                    webview.open({ path: `/meet/pre_join/${id}` }).then(() => {
                        socket.emit(`meet-${id}`, 'meetData', { r: 1 });
                    });
                } else {
                    window.open(`${appService.getUrls().clientBaseURL}/meet/pre_join/${id}`, '_blank');
                }
            }
        }
    };

    const openCreateMeet = (chat: ChatProxy | null) => {
        if (!chat) return null;
        createMeet.set({
            meetId: getRandomString(30),
            chat,
        });
    };

    const closeCall = (meetId: string) => {
        if (rustIsRunning) {
            const { view } = useWebview(`meet-${meetId}`);
            view && view.close();
        } else {
            window.close();
        }
    };

    const createRoom = (meetId: string, name: string) => {
        const { view } = useWebview(`meet-${meetId}`);
        if (!view) {
            const webview = useWebview(`meet-${meetId}`, {
                title: name || `Конференция`,
                events: {
                    onClose: () => {
                        // calls.set(calls.value.filter((i) => i.id !== meetId));
                        webview?.close();
                    },
                },
            });
            if (!webview.view) {
                if (appService.tauriIsRunning) {
                    webview.open({ path: `/meet/room/${meetId}` });
                } else {
                }
            }
        }
    };

    const goToRoom = (meetId: string) => {
        navigate(`/meet/room/${meetId}`);
    };

    return { openCreateMeet, openCall, goToRoom, createRoom, closeCall };
}

export default useMeet;

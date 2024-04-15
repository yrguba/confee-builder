import { useRouter, useRustServer, useShell, useStorage } from '../../../shared/hooks';
import { getRandomString } from '../../../shared/lib';
import { Notification } from '../../../shared/ui';
import { appService } from '../../app';
import { chatService } from '../../chat';
import { ChatProxy } from '../../chat/model/types';
import { meetStore } from '../index';
import meetApi from '../model/api';
import { CreateMeet } from '../model/types';

function useMeet() {
    const { params, navigate } = useRouter();
    const notification = Notification.use();

    const ls = useStorage();
    const { openBrowser } = useShell();
    const { mutate: handleCreateMeet } = meetApi.handleCreateMeet();
    const { mutate: handleLeftCall } = meetApi.handleLeftCall();

    // const calls = meetStore.use.calls();
    const createMeet = meetStore.use.createMeet();

    const { useWebview, rustIsRunning, socket } = useRustServer();

    const openNewWindow = (data: { meetId: string; chatId: number }) => {
        const { view } = useWebview(`meet-${data.meetId}`);
        if (!view) {
            const webview = useWebview(`meet-${data.meetId}`, {
                events: {
                    onClose: () => {
                        webview?.close();
                    },
                },
            });
            if (!webview.view) {
                const meetData = JSON.stringify(data);
                if (appService.tauriIsRunning) {
                    webview.open({ path: `/meet/pre_join/${meetData}` });
                } else {
                    window.open(`${appService.getUrls().clientBaseURL}/meet/pre_join/${meetData}`, '_blank');
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

    return { openCreateMeet, openNewWindow, goToRoom, createRoom, closeCall };
}

export default useMeet;

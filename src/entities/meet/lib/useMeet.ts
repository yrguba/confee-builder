import { useRouter, useRustServer, useShell, useStorage } from '../../../shared/hooks';
import { getRandomString } from '../../../shared/lib';
import { Notification } from '../../../shared/ui';
import { appService } from '../../app';
import { chatService } from '../../chat';
import { ChatProxy } from '../../chat/model/types';
import { meetStore } from '../index';
import meetApi from '../model/api';
import { CreateMeet, IncomingCall } from '../model/types';

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

    const createWindow = (roomId: string, path: 'pre_join' | 'room', data: any) => {
        const { view } = useWebview(roomId);
        if (!view) {
            const webview = useWebview(roomId, {
                events: {
                    onClose: () => {
                        webview?.close();
                    },
                },
            });
            if (!webview.view) {
                const meetData = JSON.stringify({ ...data, avatar: data?.avatar.split('/').join('|') });
                if (appService.tauriIsRunning) {
                    webview.open({ path: `/meet/${path}/${meetData}` });
                } else {
                    window.open(`${appService.getUrls().clientBaseURL}/meet/${path}/${meetData}`, '_blank');
                }
            }
        }
    };

    const outgoingPrivateCall = (data: { roomId: string; chatId: number; userId: number; name: string; avatar: string }) => {
        handleCreateMeet(
            {
                confee_video_room: data.roomId,
                chatId: data.chatId,
                targets_user_id: [data.userId],
            },
            {
                onSuccess: (res) => {
                    createWindow(data.roomId, 'pre_join', { ...data, callId: res.data.data.id, type: 'out' });
                },
            }
        );
    };

    const incomingPrivateCall = (data: IncomingCall) => {
        createWindow(data.roomId, 'pre_join', { ...data, type: 'in' });
    };

    const openPreJoin = (data: { meetId: number; chatId: number; initiatorId: number; name: string; avatar: string }) => {
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
                const meetData = JSON.stringify({ ...data, avatar: data.avatar.split('/').join('|') });
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
            roomId: getRandomString(30),
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

    const goToRoom = (meetId: string) => {
        navigate(`/meet/room/${meetId}`);
    };

    return { outgoingPrivateCall, openCreateMeet, openPreJoin, goToRoom, closeCall, incomingPrivateCall };
}

export default useMeet;

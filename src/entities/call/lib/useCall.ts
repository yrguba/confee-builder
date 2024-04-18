import { useRouter, useRustServer, useShell, useStorage } from '../../../shared/hooks';
import { getRandomString } from '../../../shared/lib';
import { Notification } from '../../../shared/ui';
import { appService } from '../../app';
import { chatService } from '../../chat';
import { ChatProxy } from '../../chat/model/types';
import { viewerStore } from '../../viewer';
import { callStore } from '../index';
import meetApi from '../model/api';
import { CallResponse, Meet } from '../model/types';

function useCall() {
    const { params, navigate } = useRouter();
    const { mutate: handleCreateCall } = meetApi.handleCreateCall();
    const viewer = viewerStore.use.viewer();
    const { mutate: handleLeftCall } = meetApi.handleLeftCall();
    const { mutate: handleJoinCall } = meetApi.handleJoinCall();

    const createCall = callStore.use.createCall();

    const { useWebview, rustIsRunning, socket } = useRustServer();

    const createWindow = (roomId: string, path: 'pre_join' | 'room', data: any) => {
        const { view } = useWebview(roomId);
        if (!view) {
            const webview = useWebview(roomId, {
                events: {
                    onClose: () => {
                        data.callId && handleLeftCall({ call_id: data.callId, chat_id: data.chatId });
                        webview?.close();
                    },
                },
            });
            if (!webview.view) {
                const meetData = JSON.stringify({ ...data, avatar: data?.avatar?.split('/').join('|') });
                if (appService.tauriIsRunning) {
                    webview.open({ path: `/call/${path}/${meetData}` });
                } else {
                    window.open(`${appService.getUrls().clientBaseURL}/call/${path}/${meetData}`, '_blank');
                }
            }
        }
    };

    const outgoingPrivateCall = (data: Meet, openWindows?: boolean) => {
        handleCreateCall(
            {
                confee_video_room: data.roomId,
                chatId: data.chatId,
                targets_user_id: data.users_ids,
            },
            {
                onSuccess: (res) => {
                    if (openWindows) {
                        createWindow(data.roomId, 'pre_join', { ...data, callId: res.data.data.id, type: 'out' });
                    } else {
                        navigate(`/call/pre_join/${JSON.stringify({ ...data, callId: res.data.data.id, type: 'out' })}`);
                    }
                },
            }
        );
    };

    const incomingCall = (data: Meet) => {
        createWindow(data.roomId, 'pre_join', { ...data, type: 'in' });
    };

    const createGroupCall = (data: Meet) => {
        handleCreateCall(
            {
                confee_video_room: data.roomId,
                chatId: data.chatId,
                targets_user_id: data.users_ids,
            },
            {
                onSuccess: (res) => {
                    createWindow(data.roomId, 'room', { ...data, callId: res.data.data.id, type: 'out' });
                },
            }
        );
    };

    const openCreateMeet = (chat: ChatProxy | null) => {
        if (!chat) return null;
        const { secondUser, is_group } = chat;
        createCall.set({
            roomId: getRandomString(30),
            avatar: chat.avatar || '',
            name: chat.name,
            chatId: chat.id,
            initiatorId: viewer.value.id,
            users_ids: secondUser ? [secondUser?.id] : [],
            isGroup: chat.is_group,
        });
    };

    const leftCall = (data: { roomId: string; chat_id: number; call_id: number }) => {
        handleLeftCall(data);
    };

    const closeWindow = (data: { roomId: string; chat_id: number; call_id: number }) => {
        handleLeftCall(data);
        if (rustIsRunning) {
            const { view } = useWebview(data.roomId);
            view && view.close();
        } else {
            window.close();
        }
    };

    const goToRoom = (data: Meet) => {
        if (data.callId) {
            handleJoinCall({ call_id: data.callId, chat_id: data.chatId });
            navigate(`/call/room/${JSON.stringify(data)}`);
        }
    };

    const joinCall = (data: Meet) => {
        if (data.callId) {
            createWindow(data.roomId, `room`, data);
            handleJoinCall({ call_id: data.callId, chat_id: data.chatId });
        }
    };

    const closeListener = (data: Meet) => {
        const { view } = useWebview(data.roomId);
        if (view) {
            view.onCloseRequested(() => {
                data.callId && handleLeftCall({ call_id: data.callId, chat_id: data.chatId });
                view.close();
            });
        }
    };

    return { outgoingPrivateCall, openCreateMeet, goToRoom, incomingCall, closeWindow, leftCall, createGroupCall, joinCall, closeListener };
}

export default useCall;

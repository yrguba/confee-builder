import { useRouter, useRustServer, useStorage } from '../../../shared/hooks';
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

    const { mutate: handleCreateMeeting } = meetApi.handleCreateMeeting();
    const { mutate: handleLeftCall } = meetApi.handleLeftCall();

    const calls = meetStore.use.calls();
    const createMeet = meetStore.use.createMeet();

    const { useWebview } = useRustServer();

    const open = (id: string, type: 'outgoing' | 'incoming' | 'room', chat: ChatProxy | null, openModal: () => void) => {
        if (!chat) return null;
        const webview = useWebview(`meet-${id}`, {
            title: chat.name || `Конференция`,
            events: {
                onClose: () => {
                    calls.set(calls.value.filter((i) => i.id !== id));
                    webview.close();
                },
            },
        });
        if (!webview.view) {
            const users = chatService.getMembersIdsWithoutMe(chat);
            handleCreateMeeting({ chatId: chat.id, targets_user_id: users, confee_video_room: id });
            if (appService.tauriIsRunning) {
                if (type === 'room') {
                    webview.open({ path: `/meet/room/${id}` });
                } else {
                    webview.open({ path: `/meet/${type}_call/${id}` });
                }
            } else {
                openModal();
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

    const goToRoom = (meetId: string) => {
        navigate(`/meet/room/${meetId}`);
    };

    return { openCreateMeet, open, goToRoom };
}

export default useMeet;

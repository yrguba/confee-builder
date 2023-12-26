import { useRouter, useStorage, useWebView } from '../../../shared/hooks';
import { getRandomString } from '../../../shared/lib';
import { Notification } from '../../../shared/ui';
import { appService } from '../../app';
import meetApi from '../model/api';

function useMeet() {
    const { params, navigate } = useRouter();
    const notification = Notification.use();

    const ls = useStorage();

    const { mutate: handleCreateMeeting } = meetApi.handleCreateMeeting();

    const webView = useWebView({
        id: 'meet',
        title: `Конференция`,
        onClose: () => {
            ls.remove('by_meet');
            ls.remove('join_meet_data');
            ls.remove('meet_chat_id');
        },
    });

    const createMeet = async (chatId?: number, users?: number[]) => {
        ls.set('by_meet', true);
        ls.set('meet_chat_id', chatId);
        const meetId = getRandomString(30);
        if (webView?.isOpen() || params.meet_id || ls.get('join_meet_data' || ls.get('by_meet'))) {
            notification.info({ title: 'Сначала покиньте текущую конференцию', system: true });
        } else if (chatId && users?.length) {
            handleCreateMeeting({ chatId, confee_video_room: meetId, targets_user_id: users });
            if (appService.tauriIsRunning) {
                webView?.open(`/meet/room/${meetId}`);
            } else {
                navigate(`/meet/room/${meetId}`);
            }
        }
    };

    const inCall = (data: { avatar?: string; id?: string; name: string }) => {
        ls.set('join_meet_data', data);
        if (appService.tauriIsRunning) {
            webView?.open('/meet/join');
        } else {
            navigate('/meet/join');
        }
    };

    const joinMeet = (meetId: string) => {
        ls.set('by_meet', true);
        navigate(`/meet/room/${meetId}`);
    };

    return { createMeet, joinMeet, inCall };
}

export default useMeet;

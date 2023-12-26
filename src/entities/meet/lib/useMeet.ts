import { useRouter, useWebView } from '../../../shared/hooks';
import { getRandomString } from '../../../shared/lib';
import { Notification } from '../../../shared/ui';
import { appService } from '../../app';
import meetApi from '../model/api';

function useMeet() {
    const { params, navigate } = useRouter();
    const notification = Notification.use();

    const { mutate: handleCreateMeeting } = meetApi.handleCreateMeeting();

    const webView = useWebView({
        id: 'meet',
        title: `Конференция`,
        onClose: () => {
            console.log('close');
        },
    });

    const createMeet = async (chatId?: number, users?: number[]) => {
        const meetId = getRandomString(30);
        if (webView?.isOpen() || params.meet_id) {
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

    const joinMeet = (path: string) => {
        if (webView?.isOpen() || params.meet_id) {
            return notification.info({ title: 'Сначала покиньте текущую конференцию', system: true });
        }
        if (appService.tauriIsRunning) {
            webView?.open(path);
        } else {
            navigate(path);
        }
    };

    return { createMeet, joinMeet };
}

export default useMeet;

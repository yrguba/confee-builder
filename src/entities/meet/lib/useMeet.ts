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
        onClose: () => {},
    });

    const createMeet = async (chatId?: number, user?: number) => {
        const meetId = getRandomString(30);
        if (webView?.isOpen() || params.meet_id) {
            notification.info({ title: 'Сначала покиньте текущую конференцию', system: true });
        } else if (chatId && user) {
            handleCreateMeeting({ chatId, confee_video_room: meetId, target_user_id: user });
            if (appService.tauriIsRunning) {
                webView?.open(`/meet/${meetId}`);
            } else {
                navigate(`/meet/${meetId}`);
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

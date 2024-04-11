import { useRouter, useRustServer, useStorage } from '../../../shared/hooks';
import { getRandomString } from '../../../shared/lib';
import { Notification } from '../../../shared/ui';
import { appService } from '../../app';
import { meetStore } from '../index';
import meetApi from '../model/api';

function useMeet() {
    const { params, navigate } = useRouter();
    const notification = Notification.use();

    const ls = useStorage();

    const { mutate: handleCreateMeeting } = meetApi.handleCreateMeeting();
    const { mutate: handleLeftCall } = meetApi.handleLeftCall();

    const calls = meetStore.use.calls();

    const { useWebview } = useRustServer();

    const createMeet = async (meetId: string) => {
        const webview = useWebview(`meet-${meetId}`, {
            title: `Конференция`,
            events: {
                onClose: () => {
                    console.log('close');
                    calls.set(calls.value.filter((i) => i.id !== meetId));
                    webview.close();
                },
            },
        });
    };

    const showIncomingCall = (meetId: string) => {
        if (appService.tauriIsRunning) {
            // webview?.open({ path: `/meet/incoming_call/${meetId}` });
        } else {
            navigate(`/meet/incoming_call/${meetId}`);
        }
    };

    const joinMeet = (meetId: string) => {
        navigate(`/meet/room/${meetId}`);
    };

    return { createMeet, joinMeet, showIncomingCall };
}

export default useMeet;

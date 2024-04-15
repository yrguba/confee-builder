import { JitsiMeeting } from '@jitsi/react-sdk';
import { WebviewWindow } from '@tauri-apps/api/window';
import React from 'react';
import { useIdle } from 'react-use';

import { useRustServer, useStorage } from 'shared/hooks';
import { BaseTypes } from 'shared/types';

import styles from './styles.module.scss';
import { Button } from '../../../../shared/ui';
import { appService } from '../../../app';
import { ViewerProxy } from '../../../viewer/model/types';
import { DOMAIN, INTERFACE_CONFIG_OVERWRITE, GENERAL_SETTINGS } from '../../lib/config';

type Props = {
    meetId: string;
    invite: () => void;
    viewer?: ViewerProxy | null;
    chatId?: number;
    close: () => void;
} & BaseTypes.Statuses;

function MeetRoomView(props: Props) {
    const { close, chatId, viewer, meetId, invite } = props;

    const conferenceName = meetId;
    const userName = viewer?.full_name;
    const avatarUrl = viewer?.full_avatar_url;

    const getIframeRef = (parentNode: HTMLDivElement) => {
        parentNode.style.height = '100vh';
        parentNode.style.width = '100%';
    };
    return conferenceName && userName && meetId ? (
        <div className={styles.wrapper}>
            {meetId && chatId && (
                <div className={styles.menu}>
                    <Button width="90px" height="30px" onClick={invite}>
                        Пригласить
                    </Button>
                </div>
            )}

            <JitsiMeeting
                domain={DOMAIN}
                roomName={conferenceName as string}
                configOverwrite={GENERAL_SETTINGS}
                interfaceConfigOverwrite={INTERFACE_CONFIG_OVERWRITE}
                userInfo={{
                    displayName: userName,
                    email: '',
                }}
                key={viewer.id}
                onApiReady={(externalApi) => {
                    externalApi.executeCommand('avatarUrl', avatarUrl || '');
                }}
                onReadyToClose={() => {
                    close();
                }}
                getIFrameRef={getIframeRef}
            />
        </div>
    ) : null;
}

export default MeetRoomView;

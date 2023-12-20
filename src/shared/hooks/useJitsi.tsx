import { JitsiMeeting } from '@jitsi/react-sdk';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const DOMAIN = 'video.confee.ru';
const GENERAL_SETTINGS = {
    startWithAudioMuted: true,
    startWithVideoMuted: true,
    disableModeratorIndicator: false,
    startScreenSharing: false,
    enableEmailInStats: false,
    toolbarButtons: ['chat', 'fullscreen', 'tileview', 'camera', 'microphone', 'desktop', 'recording', 'select-background', 'noisesuppression'],
};

const INTERFACE_CONFIG_OVERWRITE = {
    DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
};
function useJitsi() {
    const getIframeRef = (parentNode: HTMLDivElement) => {
        parentNode.style.height = '100vh';
        parentNode.style.width = '100%';
    };

    function ConferenceWebView() {
        const conferenceName = 'NAME';
        const userName = 'USER_NAME';
        const avatarUrl = 'AVATAR_URL';

        return conferenceName && userName ? (
            <JitsiMeeting
                domain={DOMAIN}
                roomName={conferenceName as string}
                configOverwrite={GENERAL_SETTINGS}
                interfaceConfigOverwrite={INTERFACE_CONFIG_OVERWRITE}
                userInfo={{
                    displayName: userName,
                    email: '',
                }}
                onApiReady={(externalApi) => {
                    externalApi.executeCommand('avatarUrl', avatarUrl || '');

                    externalApi.addListener('readyToClose', () => {});
                }}
                getIFrameRef={getIframeRef}
            />
        ) : (
            <></>
        );
    }

    return { getIframeRef, ConferenceWebView };
}

export default useJitsi;

import React, { JSX, useEffect } from 'react';
import { useUpdateEffect } from 'react-use';

import { callStore, useCall } from 'entities/call';
import { CreateMeetModal } from 'features/call';
import { Modal } from 'shared/ui';

import { appService } from '../../entities/app';

function CallProvider({ children }: { children: JSX.Element }) {
    const createCall = callStore.use.createCall();
    const incomingCall = callStore.use.incomingCall();

    const createMeetModal = Modal.use();

    const call = useCall();

    useUpdateEffect(() => {
        if (createCall.value) {
            if (createCall.value.isGroup) {
                createMeetModal.open();
            } else {
                call.outgoingPrivateCall(createCall.value, true);
                createCall.clear();
            }
        }
    }, [createCall.value]);

    useEffect(() => {
        const url = appService.getUrls().clientFullURL;
        if (incomingCall.value && !url.includes('pre_join') && !url.includes('room')) {
            call.incomingCall(incomingCall.value);
            incomingCall.clear();
        }
    }, [incomingCall.value]);

    return (
        <>
            {children}
            <CreateMeetModal onClose={createCall.clear} {...createMeetModal} />
        </>
    );
}

export default CallProvider;

import React, { JSX, useEffect } from 'react';
import { useUpdateEffect } from 'react-use';

import { meetApi, meetStore, useMeet } from 'entities/meet';
import { CreateMeetModal } from 'features/meet';
import { Modal } from 'shared/ui';

import { appService } from '../../entities/app';
import { useRouter } from '../../shared/hooks';

function MeetProvider({ children }: { children: JSX.Element }) {
    const createCall = meetStore.use.createCall();
    const incomingCall = meetStore.use.incomingCall();

    const createMeetModal = Modal.use();

    const meet = useMeet();

    useUpdateEffect(() => {
        if (createCall.value) {
            if (createCall.value.isGroup) {
                createMeetModal.open();
            } else {
                meet.outgoingPrivateCall(createCall.value, true);
                createCall.clear();
            }
        }
    }, [createCall.value]);

    useEffect(() => {
        const url = appService.getUrls().clientFullURL;
        if (incomingCall.value && !url.includes('pre_join') && !url.includes('room')) {
            meet.incomingCall(incomingCall.value);
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

export default MeetProvider;

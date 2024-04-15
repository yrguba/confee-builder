import React, { JSX } from 'react';
import { useUpdateEffect } from 'react-use';

import { meetApi, meetStore, useMeet } from 'entities/meet';
import { CreateMeetModal } from 'features/meet';
import { Modal } from 'shared/ui';

function MeetProvider({ children }: { children: JSX.Element }) {
    const createCall = meetStore.use.createCall();
    const incomingCall = meetStore.use.incomingCall();
    const { mutate: handleCreateMeet } = meetApi.handleCreateMeet();

    const createMeetModal = Modal.use();

    const meet = useMeet();

    useUpdateEffect(() => {
        if (createCall.value) {
            if (createCall.value.isGroup) {
                createMeetModal.open();
            } else {
                meet.outgoingPrivateCall(createCall.value);
                createCall.clear();
            }
        }
    }, [createCall.value]);

    useUpdateEffect(() => {
        if (incomingCall.value) {
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

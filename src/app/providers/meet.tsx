import React, { JSX } from 'react';
import { useUpdateEffect } from 'react-use';

import { meetApi, meetStore, useMeet } from 'entities/meet';
import { CreateMeetModal } from 'features/meet';
import { Modal } from 'shared/ui';

function MeetProvider({ children }: { children: JSX.Element }) {
    const createMeet = meetStore.use.createMeet();
    const incomingCall = meetStore.use.incomingCall();
    const { mutate: handleCreateMeet } = meetApi.handleCreateMeet();

    const createMeetModal = Modal.use();

    const meet = useMeet();

    useUpdateEffect(() => {
        if (createMeet.value) {
            if (createMeet.value.chat.is_group) {
                createMeetModal.open();
            } else {
                const { secondUser } = createMeet.value.chat;
                if (secondUser) {
                    meet.outgoingPrivateCall({
                        roomId: createMeet.value.roomId,
                        chatId: createMeet.value.chat.id,
                        userId: secondUser.id,
                        avatar: secondUser.avatar,
                        name: secondUser.full_name,
                    });
                }
            }
            createMeet.clear();
        }
    }, [createMeet.value]);

    useUpdateEffect(() => {
        if (incomingCall.value) {
            meet.incomingPrivateCall(incomingCall.value);
            incomingCall.clear();
        }
    }, [incomingCall.value]);

    return (
        <>
            {children}
            <CreateMeetModal onClose={createMeet.clear} {...createMeetModal} />
        </>
    );
}

export default MeetProvider;

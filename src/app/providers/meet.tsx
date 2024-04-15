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
                const secondUserId = createMeet.value.chat.secondUser?.id;
                if (secondUserId) {
                    handleCreateMeet({
                        confee_video_room: createMeet.value.meetId,
                        chatId: createMeet.value.chat.id,
                        targets_user_id: [secondUserId],
                    });
                    meet.openNewWindow({ meetId: createMeet.value.meetId, chatId: createMeet.value.chat.id });
                }
            }
            createMeet.clear();
        }
    }, [createMeet.value]);

    useUpdateEffect(() => {
        if (incomingCall.value) {
            meet.openNewWindow({ meetId: incomingCall.value.meetId, chatId: incomingCall.value.chatId });
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

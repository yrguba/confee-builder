import React, { JSX, useEffect } from 'react';
import { useEffectOnce, useUpdateEffect } from 'react-use';

import { meetStore, useMeet } from 'entities/meet';
import { CreateMeetModal, PreJoin } from 'features/meet';
import { Modal } from 'shared/ui';

import { appService } from '../../entities/app';
import meetApi from '../../entities/meet/model/api';
import { viewerStore } from '../../entities/viewer';

function MeetProvider({ children }: { children: JSX.Element }) {
    const createMeet = meetStore.use.createMeet();

    const { mutate: handleCreateMeeting } = meetApi.handleCreateMeeting();

    const createMeetModal = Modal.use();

    const meet = useMeet();

    useUpdateEffect(() => {
        if (createMeet.value) {
            const secondUserId = createMeet.value.chat.secondUser?.id;
            if (secondUserId) {
                handleCreateMeeting({
                    confee_video_room: createMeet.value.meetId,
                    chatId: createMeet.value.chat.id,
                    targets_user_id: [secondUserId],
                });
            }
            if (createMeet.value.chat.is_group) {
                createMeetModal.open();
            } else {
                meet.openCall(createMeet.value.meetId);
            }
            createMeet.clear();
        }
    }, [createMeet.value]);

    return (
        <>
            {children}
            <CreateMeetModal onClose={createMeet.clear} {...createMeetModal} />
        </>
    );
}

export default MeetProvider;

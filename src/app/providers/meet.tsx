import React, { JSX, useEffect } from 'react';
import { useUpdateEffect } from 'react-use';

import { meetStore, useMeet } from 'entities/meet';
import { CreateMeetModal, IncomingCall, OutGoingCall } from 'features/meet';
import { Modal } from 'shared/ui';

import meetApi from '../../entities/meet/model/api';
import { viewerStore } from '../../entities/viewer';

function MeetProvider({ children }: { children: JSX.Element }) {
    const calls = meetStore.use.calls();
    const createMeet = meetStore.use.createMeet();

    const viewer = viewerStore.use.viewer();

    const { mutate: handleCreateMeeting } = meetApi.handleCreateMeeting();

    const incomingCallModal = Modal.use();
    const outgoingCallModal = Modal.use();
    const createMeetModal = Modal.use();

    const meet = useMeet();

    const lastCall = calls.value[calls.value.length - 1];

    const onClose = () => {
        calls.set(calls.value.filter((i) => i.id !== lastCall?.id));
    };

    useUpdateEffect(() => {
        if (createMeet.value) {
            if (createMeet.value.chat.is_group) {
                createMeetModal.open();
            } else {
                const secondUserId = createMeet.value.chat.secondUser?.id;
                if (secondUserId) {
                    handleCreateMeeting({ confee_video_room: createMeet.value.meetId, chatId: createMeet.value.chat.id, targets_user_id: [secondUserId] });
                    calls.set([
                        ...calls.value,
                        {
                            id: createMeet.value.meetId,
                            name: createMeet.value.chat.name,
                            avatar: createMeet.value.chat.avatar || '',
                            chatId: createMeet.value.chat.id,
                            status: 'outgoing',
                            usersIds: [secondUserId],
                            muted: createMeet.value.chat.is_muted,
                            userId: viewer.value.id,
                        },
                    ]);
                }
            }
        }
        createMeet.clear();
    }, [createMeet.value]);

    useUpdateEffect(() => {
        console.log(calls.value);
        if (calls.value.length) {
            calls.value.forEach((call) => {
                if (call.status === 'incoming') {
                    meet.openCall(call.id, call.name, 'incoming', call.chatId, incomingCallModal.open);
                }
                if (call.status === 'outgoing') {
                    meet.openCall(call.id, call.name, 'outgoing', call.chatId, outgoingCallModal.open);
                }
            });
        }
    }, [calls.value]);

    return (
        <>
            {children}
            <CreateMeetModal onClose={createMeet.clear} {...createMeetModal} />
            <Modal onClose={onClose} {...incomingCallModal}>
                <IncomingCall meetId={lastCall?.id} />
            </Modal>
            <Modal onClose={onClose} {...outgoingCallModal}>
                <OutGoingCall meetId={lastCall?.id} />
            </Modal>
        </>
    );
}

export default MeetProvider;

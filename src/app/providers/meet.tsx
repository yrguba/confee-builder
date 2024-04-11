import React, { JSX, useEffect } from 'react';
import { useEffectOnce, useUpdateEffect } from 'react-use';

import { meetStore, useMeet } from 'entities/meet';
import { CreateMeetModal, IncomingCall, OutGoingCall } from 'features/meet';
import { Modal } from 'shared/ui';

import { appService } from '../../entities/app';
import meetApi from '../../entities/meet/model/api';
import { viewerStore } from '../../entities/viewer';

function MeetProvider({ children }: { children: JSX.Element }) {
    const activeCalls = meetStore.use.activeCalls();
    const outgoingCalls = meetStore.use.outgoingCalls();
    const incomingCalls = meetStore.use.incomingCalls();
    const createMeet = meetStore.use.createMeet();

    const viewer = viewerStore.use.viewer();

    const { mutate: handleCreateMeeting } = meetApi.handleCreateMeeting();

    const incomingCallModal = Modal.use();
    const outgoingCallModal = Modal.use();
    const createMeetModal = Modal.use();

    const meet = useMeet();

    const lastIncomingCalls = incomingCalls.value[incomingCalls.value.length - 1];

    const onClose = () => {
        incomingCalls.set(incomingCalls.value.filter((i) => i.id !== lastIncomingCalls?.id));
        incomingCallModal.close();
        outgoingCallModal.close();
    };

    useEffectOnce(() => {
        // window.addEventListener('message', (d) => console.log('dwaddwa', d), false);
    });

    useUpdateEffect(() => {
        if (createMeet.value) {
            if (createMeet.value.chat.is_group) {
                createMeetModal.open();
            } else if (!activeCalls.value.find((i) => i?.chatId === createMeet.value.chat.id) && outgoingCalls.value?.chatId !== createMeet.value.chat.id) {
                const secondUserId = createMeet.value.chat.secondUser?.id;
                if (secondUserId) {
                    handleCreateMeeting({ confee_video_room: createMeet.value.meetId, chatId: createMeet.value.chat.id, targets_user_id: [secondUserId] });
                    outgoingCalls.set({
                        id: createMeet.value.meetId,
                        name: createMeet.value.chat.name,
                        avatar: createMeet.value.chat.avatar || '',
                        chatId: createMeet.value.chat.id,
                        usersIds: [secondUserId],
                        muted: createMeet.value.chat.is_muted,
                        userId: viewer.value.id,
                    });
                    // ou.set([
                    //     ...incomingCalls.value,
                    //     {
                    //         id: createMeet.value.meetId,
                    //         name: createMeet.value.chat.name,
                    //         avatar: createMeet.value.chat.avatar || '',
                    //         chatId: createMeet.value.chat.id,
                    //         usersIds: [secondUserId],
                    //         muted: createMeet.value.chat.is_muted,
                    //         userId: viewer.value.id,
                    //     },
                    // ]);
                }
                meet.openCall(createMeet.value.meetId, createMeet.value.chat.name, 'outgoing', createMeet.value.chat.id, outgoingCallModal.open);
                createMeet.clear();
            }
        }
    }, [createMeet.value]);

    useUpdateEffect(() => {
        incomingCalls.value.forEach((call) => {
            meet.openCall(call.id, call.name, 'incoming', call.chatId, incomingCallModal.open);
        });
    }, [incomingCalls.value]);
    console.log(JSON.stringify(lastIncomingCalls));
    return (
        <>
            {children}
            <CreateMeetModal onClose={createMeet.clear} {...createMeetModal} />
            <Modal onClose={onClose} {...incomingCallModal}>
                <iframe
                    src={`${appService.getUrls().clientBaseURL}/meet/incoming_call/${JSON.stringify({
                        ...lastIncomingCalls,
                        avatar: lastIncomingCalls?.avatar?.split('/').join('|'),
                    })}`}
                    height={500}
                    width={500}
                />
                {/* <IncomingCall reject={onClose} meetId={lastIncomingCalls?.id} /> */}
            </Modal>
            <Modal onClose={onClose} {...outgoingCallModal}>
                <OutGoingCall />
            </Modal>
        </>
    );
}

export default MeetProvider;

import React, { JSX, useEffect } from 'react';
import { useUpdateEffect } from 'react-use';

import { meetStore, useMeet } from 'entities/meet';
import { CreateMeetModal, IncomingCall, OutGoingCall } from 'features/meet';
import { Modal } from 'shared/ui';

function MeetProvider({ children }: { children: JSX.Element }) {
    const calls = meetStore.use.calls();
    const createMeet = meetStore.use.createMeet();

    const callModal = Modal.use();
    const createMeetModal = Modal.use();

    const meet = useMeet();

    const lastCall = calls.value[calls.value.length - 1];

    const onClose = () => {
        calls.set(calls.value.filter((i) => i.id !== lastCall?.id));
    };

    useUpdateEffect(() => {
        if (createMeet.value) {
            createMeetModal.open();
            // meet.openCreateMeet(createMeet.value.chat);
        }
    }, [createMeet.value]);

    useUpdateEffect(() => {
        if (calls.value.length) {
            calls.value.forEach((call) => {
                // if (call.status === 'incoming') {
                //     showCall(call.id, call.name, 'incoming', call.chatId, call.usersIds, callModal.open);
                // }
                // if (call.status === 'outgoing') {
                //     showCall(call.id, call.name, 'outgoing', call.chatId, call.usersIds, callModal.open);
                // }
            });
        }
    }, [calls.value]);

    // useUpdateEffect(() => {
    //     openCreateMeet.value ? createMeetModal.open() : createMeetModal.close();
    // }, [openCreateMeet.value]);

    return (
        <>
            {children}
            <CreateMeetModal onClose={createMeet.clear} {...createMeetModal} />
            <Modal onClose={onClose} {...callModal}>
                {lastCall?.status === 'outgoing' && <OutGoingCall meetId={lastCall?.id} />}
            </Modal>
            <Modal onClose={onClose} {...callModal}>
                {lastCall?.status === 'incoming' && <IncomingCall meetId={lastCall?.id} />}
            </Modal>
        </>
    );
}

export default MeetProvider;

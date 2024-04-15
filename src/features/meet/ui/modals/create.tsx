import React from 'react';
import { useUpdateEffect } from 'react-use';
import useFileUploader from 'react-use-file-uploader';

import { chatApi, chatProxy, CreateChatModalView } from 'entities/chat';
import { useContacts } from 'entities/contact';
import { viewerApi } from 'entities/viewer';
import { useArray, useEasyState, useRouter } from 'shared/hooks';
import { Modal, Notification, ModalTypes, CardTypes, Input } from 'shared/ui';

import { CreateMeetModalView, meetStore, useMeet } from '../../../../entities/meet';
import { viewerStore } from '../../../../entities/viewer';
import { getRandomString } from '../../../../shared/lib';

function CreateMeetModal(modal: ModalTypes.UseReturnedType) {
    const { navigate, pathname, params } = useRouter();

    const viewer = viewerStore.use.viewer();
    const createCall = meetStore.use.createCall();
    const selectedUsers = useArray<CardTypes.CardListItem>({ multiple: true });

    const tabsAndLists = useContacts();

    const meet = useMeet();

    const createMeet = () => {
        meet.createGroupCall({
            avatar: '',
            name: '',
            chatId: createCall.value.chatId,
            initiatorId: viewer.value.id,
            callId: 0,
            roomId: getRandomString(30),
            users_ids: selectedUsers.getIds(),
        });
        modal.close();
    };

    return <CreateMeetModalView tabsAndLists={tabsAndLists} selectedUsers={selectedUsers} createMeet={createMeet} />;
}

export default function (modal: ModalTypes.UseReturnedType) {
    return (
        <Modal {...modal} centered={false}>
            <CreateMeetModal {...modal} />
        </Modal>
    );
}

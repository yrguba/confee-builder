import React from 'react';
import { useUpdateEffect } from 'react-use';
import useFileUploader from 'react-use-file-uploader';

import { chatApi, chatProxy, CreateChatModalView } from 'entities/chat';
import { useContacts } from 'entities/contact';
import { viewerApi } from 'entities/viewer';
import { useArray, useEasyState, useRouter } from 'shared/hooks';
import { Modal, Notification, ModalTypes, CardTypes, Input } from 'shared/ui';

import { CreateMeetModalView, meetStore } from '../../../../entities/meet';

function CreateMeetModal(modal: ModalTypes.UseReturnedType) {
    const { navigate, pathname, params } = useRouter();

    const calls = meetStore.use.calls();

    const selectedUsers = useArray<CardTypes.CardListItem>({ multiple: true });

    const tabsAndLists = useContacts();

    const createMeet = () => {
        // calls.set([
        //     ...calls.value,
        //     {
        //         id: extraInfo.confee_video_room,
        //         avatar: data.chat.avatar,
        //         name: data.chat.name,
        //         muted: extraInfo.muted,
        //         userId: extraInfo.for_user_id,
        //         status: 'outgoing',
        //     },
        // ]);
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

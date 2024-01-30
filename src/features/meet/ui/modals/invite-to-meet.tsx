import React, { useEffect } from 'react';

import { InviteToMeetModalView, meetApi } from 'entities/meet';
import { useArray, useRouter, useStorage } from 'shared/hooks';
import { CardTypes, Modal, ModalTypes } from 'shared/ui';

import { chatApi, chatProxy, chatService } from '../../../../entities/chat';
import { contactApi } from '../../../../entities/contact';

function InviteToMeetModal(modal: ModalTypes.UseReturnedType) {
    const { navigate, pathname, params } = useRouter();

    const ls = useStorage();

    const chatId = ls.get('meet_chat_id');
    const { data: chatData } = chatApi.handleGetChat({ chatId });
    const proxyChat = chatProxy(chatData?.data.data);

    const { mutate: handleInvite } = meetApi.handleCreateMeeting();
    const selectedUsers = useArray<CardTypes.CardListItem>({ multiple: true });

    const sendInvites = () => {
        if (selectedUsers.array.length && params.meet_id && chatId) {
            handleInvite({ confee_video_room: params.meet_id, chatId, targets_user_id: selectedUsers.array.map((i) => Number(i.id)) });
            modal.close();
        }
    };

    const users = chatService.getMembersWithoutMe(proxyChat);

    return <InviteToMeetModalView sendInvites={sendInvites} users={users?.filter((i) => !i.deleted_at)} selectedUsers={selectedUsers} />;
}

export default function (modal: ModalTypes.UseReturnedType) {
    return (
        <Modal centered={false} {...modal}>
            <InviteToMeetModal {...modal} />
        </Modal>
    );
}

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { ChatUsersListView, ChatApi } from 'entities/chat';
import { UserDossierView, UserTypes, UsersListView } from 'entities/user';
import { Modal, useModal } from 'shared/ui';

type Props = {};

function ChatUsersList(props: Props) {
    const params = useParams();

    if (!params.chat_id) return null;

    const [user, setUser] = useState<UserTypes.User | null>(null);
    const userInfoModal = useModal();

    const { data } = ChatApi.handleGetChat({ chatId: Number(params.chat_id) });

    const userClick = (user: UserTypes.User) => {
        setUser(user);
    };

    useEffect(() => {
        user ? userInfoModal.open() : userInfoModal.close();
    }, [user]);

    return (
        <>
            <ChatUsersListView users={data?.data?.data.members || []} userClick={userClick} />
            <Modal {...userInfoModal} onOk={() => setUser(null)} onClose={() => setUser(null)}>
                <UserDossierView direction="column" user={user} />
            </Modal>
        </>
    );
}

export default ChatUsersList;

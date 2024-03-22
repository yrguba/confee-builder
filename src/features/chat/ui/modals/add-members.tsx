import React, { useEffect } from 'react';
import { useUpdateEffect } from 'react-use';

import { chatApi, chatProxy, chatTypes, AddMembersInChatModalView } from 'entities/chat';
import { contactProxy, contactApi, useContacts } from 'entities/contact';
import { viewerApi } from 'entities/viewer';
import { useArray, useEasyState, useRouter } from 'shared/hooks';
import { Modal, Notification, ModalTypes, CardTypes } from 'shared/ui';

function AddMembersInChatModal(modal: ModalTypes.UseReturnedType) {
    const { navigate, pathname, params } = useRouter();

    const notifications = Notification.use();

    const chatId = Number(params.chat_id);
    const isGroup = useEasyState(false);
    const { mutate: handleAddMembersPersonalChat, isLoading } = chatApi.handleAddMembersPersonalChat();
    const { mutate: handleAddMembersCompanyChat } = chatApi.handleAddMembersCompanyChat();
    const companyId = useEasyState<number | null>(null);

    const { data: chatData } = chatApi.handleGetChat({ chatId: params.chat_id });
    const proxyChat = chatProxy(chatData?.data.data);

    const tabsAndLists = useContacts();

    const selectedUsers = useArray<CardTypes.CardListItem>({ multiple: true });

    const add = () => {
        if (!selectedUsers.array.length) {
            return notifications.error({ title: `Выберите участников` });
        }
        if (selectedUsers.array.length && !isGroup) {
            handleAddMembersPersonalChat(
                { chatId, user_ids: selectedUsers.array.map((i) => Number(i.id)) },
                {
                    onSuccess: (data) => modal.close(),
                }
            );
        } else {
            handleAddMembersCompanyChat(
                {
                    chatId,
                    employee_ids: selectedUsers.array.map((i) => Number(i.id)),
                },
                {
                    onSuccess: (data) => modal.close(),
                }
            );
        }
    };

    useEffect(() => {
        if (proxyChat) {
            if (proxyChat?.is_personal) {
            } else {
                tabsAndLists.getDepartments({ companyId: proxyChat.company_id });
            }
        }
    }, [proxyChat?.is_personal, tabsAndLists.activeTab?.id]);

    return <AddMembersInChatModalView tabsAndLists={tabsAndLists} selectedUsers={selectedUsers} add={add} chat={proxyChat} loading={isLoading} />;
}

export default function (modal: ModalTypes.UseReturnedType) {
    return (
        <Modal centered={false} {...modal}>
            <AddMembersInChatModal {...modal} />
        </Modal>
    );
}

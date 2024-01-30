import React, { useEffect } from 'react';
import { useUpdateEffect } from 'react-use';

import { chatApi, chatProxy, chatTypes, AddMembersInChatModalView } from 'entities/chat';
import { contactProxy, contactApi, useContactsTabsAndLists } from 'entities/contact';
import { viewerApi } from 'entities/viewer';
import { useArray, useEasyState, useRouter } from 'shared/hooks';
import { Modal, Notification, ModalTypes, CardTypes } from 'shared/ui';

function AddMembersInChatModal(modal: ModalTypes.UseReturnedType) {
    const { navigate, pathname, params } = useRouter();

    const notifications = Notification.use();

    const { mutate: handleAddMembersPersonalChat, isLoading } = chatApi.handleAddMembersPersonalChat();
    const { mutate: handleAddMembersCompanyChat } = chatApi.handleAddMembersCompanyChat();

    const { data: viewerData } = viewerApi.handleGetViewer();

    const { data: chatData } = chatApi.handleGetChat({ chatId: params.chat_id });
    const proxyChat = chatProxy(chatData?.data.data);

    const tabsAndLists = useContactsTabsAndLists({ companies: viewerData?.data.data.companies, redirect: false });

    const selectedContacts = useArray<CardTypes.CardListItem>({ multiple: true });
    const selectedEmployees = useArray<CardTypes.CardListItem>({ multiple: true });

    const add = () => {
        if (!selectedContacts.array.length && !selectedEmployees.array.length) {
            return notifications.error({ title: `Выберите участников` });
        }
        if (selectedContacts.array.length && params.chat_id) {
            handleAddMembersPersonalChat(
                { chatId: params.chat_id, user_ids: selectedContacts.array.map((i) => i.payload.id) },
                {
                    onSuccess: (data) => modal.close(),
                }
            );
        }
        if (selectedEmployees.array.length && params.chat_id) {
            handleAddMembersCompanyChat(
                {
                    chatId: params.chat_id,
                    employee_ids: selectedEmployees.array.map((i) => i.payload.id),
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
                tabsAndLists.setActiveTab(tabsAndLists.tabs[0]);
            } else {
                tabsAndLists.setActiveTab(tabsAndLists.tabs[1]);
            }
        }
    }, [proxyChat?.is_personal]);

    return (
        <AddMembersInChatModalView
            tabsAndLists={tabsAndLists}
            selectedContacts={selectedContacts}
            selectedEmployees={selectedEmployees}
            add={add}
            chat={proxyChat}
            loading={isLoading}
        />
    );
}

export default function (modal: ModalTypes.UseReturnedType) {
    return (
        <Modal centered={false} {...modal}>
            <AddMembersInChatModal {...modal} />
        </Modal>
    );
}

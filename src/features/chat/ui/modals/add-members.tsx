import React, { useEffect } from 'react';

import { chatApi, chatProxy, chatTypes, AddMembersInChatModalView } from 'entities/chat';
import { contactProxy, contactApi, useContactsTabsAndLists } from 'entities/contact';
import { viewerApi } from 'entities/viewer';
import { useArray, useEasyState, useRouter } from 'shared/hooks';
import { Modal, Notification, ModalTypes, CardTypes } from 'shared/ui';

function AddMembersInChatModal(modal: ModalTypes.UseReturnedType) {
    const { navigate, pathname, params } = useRouter();

    const notifications = Notification.use();

    const selectedContacts = useArray<CardTypes.CardListItem>({ multiple: true });
    const selectedEmployees = useArray<CardTypes.CardListItem>({ multiple: true });

    const { mutate: handleAddMembersPersonalChat, isLoading } = chatApi.handleAddMembersPersonalChat();
    const { mutate: handleAddMembersCompanyChat } = chatApi.handleAddMembersCompanyChat();

    const { data: viewerData } = viewerApi.handleGetViewer();

    const tabsAndLists = useContactsTabsAndLists({ companies: viewerData?.companies });

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

    return (
        <AddMembersInChatModalView
            tabsAndLists={tabsAndLists}
            selectedContacts={selectedContacts}
            selectedEmployees={selectedEmployees}
            add={add}
            loading={isLoading}
        />
    );
}

export default function (modal: ModalTypes.UseReturnedType) {
    return (
        <Modal {...modal}>
            <AddMembersInChatModal {...modal} />
        </Modal>
    );
}

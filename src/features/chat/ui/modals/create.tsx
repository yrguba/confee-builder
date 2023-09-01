import React from 'react';

import { chatApi, chatProxy, chatTypes, CreateChatModalView } from 'entities/chat';
import { contactProxy, contactApi, useContactsTabsAndLists } from 'entities/contact';
import { useArray, useEasyState, useRouter } from 'shared/hooks';
import { Modal, Notification, ModalTypes, CardTypes } from 'shared/ui';

import { viewerApi } from '../../../../entities/viewer';

function CreateChatModal(modal: ModalTypes.UseReturnedType) {
    const { navigate } = useRouter();

    const notifications = Notification.use();

    const isGroup = useEasyState(false);
    const selectedContacts = useArray<CardTypes.CardListItem>({ multiple: isGroup.value });
    const selectedEmployees = useArray<CardTypes.CardListItem>({ multiple: isGroup.value });

    const { mutate: handleCreatePersonalChat, isLoading } = chatApi.handleCreatePersonalChat();
    const { data: contactsData } = contactApi.handleGetContacts({ type: 'registered' });
    const { data: viewerData } = viewerApi.handleGetViewer();

    const createChat = () => {
        if (!selectedContacts.array.length) {
            return notifications.error({ title: isGroup.value ? `Выберите участников` : `Выберите кому хотите написать` });
        }
        handleCreatePersonalChat(
            { user_ids: selectedContacts.array.map((i) => i.id), is_group: isGroup.value },
            {
                onSuccess: (data) => {
                    modal.close();
                    navigate(`/chats/chat/${data.data.data.id}`);
                },
            }
        );
    };

    const tabsAndLists = useContactsTabsAndLists({ companies: viewerData?.companies, contacts: contactsData });

    return (
        <CreateChatModalView
            isGroup={isGroup}
            tabsAndLists={tabsAndLists}
            selectedContacts={selectedContacts}
            selectedEmployees={selectedEmployees}
            createChat={createChat}
            loading={isLoading}
        />
    );
}

export default function (modal: ModalTypes.UseReturnedType) {
    return (
        <Modal {...modal}>
            <CreateChatModal {...modal} />
        </Modal>
    );
}

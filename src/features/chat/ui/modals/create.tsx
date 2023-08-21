import React from 'react';

import { chatApi, CreateChatModalView, chatTypes } from 'entities/chat';
import { viewerApi, contactProxy, viewerTypes } from 'entities/viewer';
import { useArray, useEasyState, useRouter } from 'shared/hooks';
import { generateItems } from 'shared/lib';
import { Modal, Notification } from 'shared/ui';

function CreteChatModal() {
    const { navigate } = useRouter();

    const createChatModal = Modal.use<chatTypes.Modals>('createChat');
    const notifications = Notification.use();

    const isGroup = useEasyState(false);
    const selectedContacts = useArray<viewerTypes.ContactProxy>({ multiple: isGroup.value });
    const { mutate: handleCreateChat, isLoading } = chatApi.handleCreateChat();
    const { data: contactsData } = viewerApi.handleGetContacts();

    const createChat = () => {
        if (!selectedContacts.array.length) {
            return notifications.error({ title: isGroup.value ? `Выберите участников` : `Выберите кому хотите написать` });
        }
        handleCreateChat(
            { user_ids: selectedContacts.array.map((i) => i.user_id), is_group: isGroup.value },
            {
                onSuccess: (data) => {
                    createChatModal.close();
                    navigate(`/chats/chat/${data.data.data.id}`);
                },
            }
        );
    };

    const onClose = () => {
        selectedContacts.clear();
    };

    return (
        <Modal {...createChatModal} onClose={onClose}>
            <CreateChatModalView
                isGroup={isGroup}
                contacts={contactsData?.map((i) => contactProxy(i))}
                selectedContacts={selectedContacts}
                createChat={createChat}
                loading={isLoading}
            />
        </Modal>
    );
}

export default CreteChatModal;

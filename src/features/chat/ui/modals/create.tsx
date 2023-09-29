import React from 'react';
import { useUpdateEffect } from 'react-use';

import { chatApi, chatProxy, chatTypes, CreateChatModalView } from 'entities/chat';
import { contactProxy, contactApi, useContactsTabsAndLists } from 'entities/contact';
import { viewerApi } from 'entities/viewer';
import { useArray, useEasyState, useRouter } from 'shared/hooks';
import { Modal, Notification, ModalTypes, CardTypes } from 'shared/ui';

import { companyApi } from '../../../../entities/company';

function CreateChatModal(modal: ModalTypes.UseReturnedType) {
    const { navigate, pathname } = useRouter();

    const notifications = Notification.use();

    const isGroup = useEasyState(false);
    const selectedContacts = useArray<CardTypes.CardListItem>({ multiple: isGroup.value });
    const selectedEmployees = useArray<CardTypes.CardListItem>({ multiple: isGroup.value });

    const { mutate: handleCreatePersonalChat, isLoading } = chatApi.handleCreatePersonalChat();
    const { mutate: handleCreateCompanyChat } = chatApi.handleCreateCompanyChat();

    const { data: viewerData } = viewerApi.handleGetViewer();

    const tabsAndLists = useContactsTabsAndLists({ companies: viewerData?.companies, redirect: false });

    const createChat = () => {
        const chatsType = pathname.split('/')[2];
        if (!selectedContacts.array.length && !selectedEmployees.array.length) {
            return notifications.error({ title: `Выберите участников` });
        }
        if (selectedContacts.array.length) {
            handleCreatePersonalChat(
                { user_ids: selectedContacts.array.map((i) => i.payload.id), is_group: isGroup.value },
                {
                    onSuccess: (data) => {
                        modal.close();
                        navigate(`/chats/${chatsType !== 'company' ? chatsType : 'personal'}/chat/${data.data.data.id}`);
                    },
                }
            );
        }
        if (selectedEmployees.array.length) {
            handleCreateCompanyChat(
                {
                    body: { employee_ids: selectedEmployees.array.map((i) => i.payload.id), is_group: isGroup.value },
                    companyId: tabsAndLists.activeTab?.payload?.id,
                },
                {
                    onSuccess: (data) => {
                        modal.close();
                        navigate(`/chats/${chatsType !== 'personal' ? chatsType : 'company'}/${tabsAndLists.activeTab?.payload?.id}/chat/${data.data.data.id}`);
                    },
                }
            );
        }
    };

    useUpdateEffect(() => {
        selectedContacts.clear();
        selectedEmployees.clear();
    }, [tabsAndLists.activeTab?.id]);

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
        <Modal {...modal} centered={false}>
            <CreateChatModal {...modal} />
        </Modal>
    );
}

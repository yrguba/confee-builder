import React from 'react';
import { useUpdateEffect } from 'react-use';
import useFileUploader from 'react-use-file-uploader';

import { chatApi, chatProxy, chatTypes, CreateChatModalView } from 'entities/chat';
import { contactProxy, contactApi, useContactsTabsAndLists } from 'entities/contact';
import { viewerApi } from 'entities/viewer';
import { useArray, useEasyState, useRouter } from 'shared/hooks';
import { Modal, Notification, ModalTypes, CardTypes, Input } from 'shared/ui';

import { ChatProxy } from '../../../../entities/chat/model/types';
import { companyApi } from '../../../../entities/company';
import { getFormData } from '../../../../shared/lib';

function CreateChatModal(modal: ModalTypes.UseReturnedType) {
    const { navigate, pathname, params } = useRouter();

    const notifications = Notification.use();

    const isGroup = useEasyState(false);
    const chatAvatar = useEasyState<string | null>(null);
    const chatName = Input.use({});

    const selectedContacts = useArray<CardTypes.CardListItem>({ multiple: isGroup.value });
    const selectedEmployees = useArray<CardTypes.CardListItem>({ multiple: isGroup.value });

    const { mutate: handleCreatePersonalChat, isLoading } = chatApi.handleCreatePersonalChat();
    const { mutate: handleCreateCompanyChat } = chatApi.handleCreateCompanyChat();
    const { mutate: handleUpdateChatName } = chatApi.handleUpdateChatName();
    const { mutate: handleAddAvatar } = chatApi.handleAddAvatar();

    const { data: viewerData } = viewerApi.handleGetViewer();

    const tabsAndLists = useContactsTabsAndLists({ companies: viewerData?.companies, redirect: false });

    const { open: selectFile } = useFileUploader({
        accept: 'image',
        onAfterUploading: (data) => {
            chatAvatar.set(data.files[0].fileUrl);
        },
    });

    const getScreenshot = (data: string) => chatAvatar.set(data);

    const createChat = () => {
        const chatsType = pathname.split('/')[2];
        if (!selectedContacts.array.length && !selectedEmployees.array.length) {
            return notifications.error({ title: `Выберите участников` });
        }
        if (isGroup && !chatName.value) {
            return notifications.error({ title: `Введите название чата` });
        }
        const updGroupChat = (chat: ChatProxy) => {
            if (chatName.value && chat.id) {
                handleUpdateChatName({
                    chatId: chat.id,
                    name: chatName.value,
                    type: chat?.is_personal ? 'personal' : 'company',
                    companyId: params.company_id,
                });
            }
            if (chatAvatar.value && chat.id) {
                handleAddAvatar({ chatId: chat.id, img: chatAvatar.value });
            }
        };
        if (selectedContacts.array.length) {
            handleCreatePersonalChat(
                { user_ids: selectedContacts.array.map((i) => i.payload.id), is_group: isGroup.value },
                {
                    onSuccess: (res) => {
                        const chat = chatProxy(res.data.data);
                        const chatId = chat?.id;
                        if (chat) {
                            updGroupChat(chat);
                            modal.close();
                            navigate(`/chats/${chatsType !== 'company' ? chatsType : 'personal'}/chat/${chatId}`);
                        }
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
                    onSuccess: (res) => {
                        const chat = chatProxy(res.data.data);
                        const chatId = chat?.id;
                        if (chat) {
                            updGroupChat(chat);
                            modal.close();
                            navigate(`/chats/${chatsType !== 'personal' ? chatsType : 'company'}/${tabsAndLists.activeTab?.payload?.id}/chat/${chatId}`);
                        }
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
            chatName={chatName}
            avatar={chatAvatar.value}
            avatarActions={{
                getScreenshot,
                selectFile,
                deleteFile: () => chatAvatar.set(null),
            }}
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

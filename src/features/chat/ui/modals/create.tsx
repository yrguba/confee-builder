import React from 'react';
import { useUpdateEffect } from 'react-use';
import useFileUploader from 'react-use-file-uploader';

import { chatApi, chatProxy, CreateChatModalView } from 'entities/chat';
import { useContacts } from 'entities/contact';
import { viewerApi } from 'entities/viewer';
import { useArray, useEasyState, useRouter } from 'shared/hooks';
import { Modal, Notification, ModalTypes, CardTypes, Input } from 'shared/ui';

function CreateChatModal(modal: ModalTypes.UseReturnedType) {
    const { navigate, pathname, params } = useRouter();

    const notifications = Notification.use();

    const companyId = useEasyState<number | null>(null);
    const isGroup = useEasyState(false);
    const chatAvatar = useEasyState<string | null>(null);
    const chatAvatarFile = useEasyState<any>(null);
    const chatDescription = useEasyState('');
    const chatName = Input.use({});

    const selectedUsers = useArray<CardTypes.CardListItem>({ multiple: isGroup.value });

    const { mutate: handleCreatePersonalChat, isLoading } = chatApi.handleCreatePersonalChat();
    const { mutate: handleCreateCompanyChat } = chatApi.handleCreateCompanyChat();

    const { data: viewerData } = viewerApi.handleGetViewer();

    const tabsAndLists = useContacts();

    const { open: selectFile } = useFileUploader({
        accept: 'image',
        onAfterUploading: (data) => {
            chatAvatar.set(data.files[0].fileUrl);
            chatAvatarFile.set(data.files[0].file);
        },
    });

    const getScreenshot = (data: string) => chatAvatar.set(data);

    const createChat = () => {
        const chatsType = pathname.split('/')[2];
        if (!selectedUsers.array.length) {
            return notifications.error({ title: `Выберите участников` });
        }
        if (isGroup.value && !chatName.value) {
            return notifications.error({ title: `Введите название чата` });
        }
        if (!companyId.value) {
            handleCreatePersonalChat(
                {
                    user_ids: selectedUsers.array.map((i) => Number(i.id)),
                    is_group: isGroup.value,
                    name: chatName.value,
                    avatar: chatAvatarFile.value,
                    description: chatDescription.value,
                },
                {
                    onSuccess: (res) => {
                        const chat = chatProxy(res.data.data);
                        const chatId = chat?.id;
                        if (chat) {
                            modal.close();
                            navigate(`/chats/${chatsType !== 'company' ? chatsType : 'personal'}/chat/${chatId}`);
                        }
                    },
                }
            );
        } else {
            handleCreateCompanyChat(
                {
                    body: {
                        employee_ids: selectedUsers.array.map((i) => Number(i.id)),
                        is_group: isGroup.value,
                        name: chatName.value,
                        avatar: chatAvatarFile.value,
                        description: chatDescription.value,
                    },
                    companyId: tabsAndLists.activeTab?.payload?.companyId,
                },
                {
                    onSuccess: (res) => {
                        const chat = chatProxy(res.data.data);
                        const chatId = chat?.id;
                        if (chat) {
                            modal.close();
                            navigate(`/chats/${chatsType !== 'personal' ? chatsType : 'company'}/${companyId.value}/chat/${chatId}`);
                        }
                    },
                }
            );
        }
    };

    useUpdateEffect(() => {
        companyId.set(tabsAndLists.activeTab?.payload?.companyId || null);
        selectedUsers.clear();
    }, [tabsAndLists.activeTab?.id]);

    return (
        <CreateChatModalView
            isGroup={isGroup}
            tabsAndLists={tabsAndLists}
            selectedUsers={selectedUsers}
            createChat={createChat}
            loading={isLoading}
            chatName={chatName}
            avatar={chatAvatar.value}
            chatDescription={chatDescription}
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

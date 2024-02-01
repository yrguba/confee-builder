import React from 'react';

import { chatApi, chatProxy } from 'entities/chat';
import { messageApi, messageTypes, useMessageStore, MessageMenuView } from 'entities/message';
import { MediaContentType, MessageProxy } from 'entities/message/model/types';
import { useRouter, useCopyToClipboard, useTextToSpeech, useFs } from 'shared/hooks';
import { Modal, Notification } from 'shared/ui';

import { ForwardMessagesModal } from '../index';

type MessageMenuProps = {
    message: MessageProxy;
};

function MessageMenu(props: MessageMenuProps) {
    const { params } = useRouter();
    const [state, copyToClipboard] = useCopyToClipboard();
    const chatId = Number(params.chat_id);

    const { saveFromBack } = useFs();

    const { playSpeech } = useTextToSpeech();

    const { data: chatData } = chatApi.handleGetChat({ chatId });

    const proxyChat = chatProxy(chatData?.data.data);

    const replyMessage = useMessageStore.use.replyMessage();
    const editMessage = useMessageStore.use.editMessage();
    const forwardMessages = useMessageStore.use.forwardMessages();
    const highlightedMessages = useMessageStore.use.highlightedMessages();

    const downloadFile = useMessageStore.use.downloadFile();

    const { mutate: handleDeleteMessage } = messageApi.handleDeleteMessage();
    const { mutate: handleSendReaction } = messageApi.handleSendReaction();

    const notification = Notification.use();

    const forwardMessagesModal = Modal.use();

    const confirmDeleteMessage = Modal.useConfirm<{ messageId: number }>((value, callbackData) => {
        value && callbackData && handleDeleteMessage({ chatId, messageIds: [callbackData.messageId], fromAll: true });
    });

    const messageMenuAction = (action: messageTypes.MessageMenuActions, message: messageTypes.MessageProxy) => {
        switch (action) {
            case 'reply':
                return replyMessage.set(message);
            case 'edit':
                if (message.type !== 'text') return notification.info({ title: 'Пока недоступно для изменения', system: true });
                return editMessage.set(message);
            case 'fixed':
                return notification.inDev();
            case 'copy':
                copyToClipboard(message.text);
                return notification.success({ title: 'Текст скопирован в буфер', system: true });
            case 'forward':
                forwardMessages.set({ fromChatName: chatData?.data.data.name || '', toChatId: null, messages: [message], redirect: false });
                return forwardMessagesModal.open();
            case 'delete':
                return confirmDeleteMessage.open({ messageId: message.id });
            case 'highlight':
                return highlightedMessages.push(message);
            case 'play':
                return playSpeech(message.text);
            case 'save':
                console.log(downloadFile.value);
            // downloadFile?.value?.callback();
            // if (file?.url && file?.name) {
            //     console.log(file.url);
            //     saveFromBack({ baseDir: 'download', url: file.url, fileName: file.name });
            //     file?.id && idOfSavedFile.set(file.id);
            //     notification.success({
            //         title: `${file?.type ? messageDictionaries.mediaContent[file?.type] : ''} ${file?.type === 'documents' ? 'сохранен' : 'сохранено'}`,
            //         system: true,
            //     });
            // }
        }
    };

    return (
        <>
            <Modal.Confirm {...confirmDeleteMessage} title="Удалить сообщение" closeText="Отмена" okText="Удалить" />
            <ForwardMessagesModal {...forwardMessagesModal} />
            <MessageMenuView chat={proxyChat} message={props.message} messageMenuAction={messageMenuAction} />
        </>
    );
}

export default MessageMenu;

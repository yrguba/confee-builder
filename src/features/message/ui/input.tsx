import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { useAppStore } from 'entities/app';
import { ChatApi } from 'entities/chat';
import { MessageApi, MessageInputView, useMessageStore } from 'entities/message';
import { MediaContentModal, SwiperModal } from 'entities/modal';
import { UserTypes } from 'entities/user';
import { ViewerService } from 'entities/viewer';
import { useAudioRecorder } from 'shared/hooks';
import { Modal, useModal } from 'shared/ui';

type Props = {};

function MessageInput(props: Props) {
    const params = useParams();
    const chatId = Number(params.chat_id);
    const modalMediaContent = useModal();

    const { mutate: handleSendTextMessage, isLoading } = MessageApi.handleSendTextMessage();
    const { mutate: handleSendFileMessage } = MessageApi.handleSendFileMessage();
    const { mutate: handleMessageAction } = MessageApi.handleMessageAction();
    const { mutate: handleReplyMessage } = MessageApi.handleReplyMessage();
    const { mutate: handleChangeTextInMessages } = MessageApi.handleChangeTextInMessages();

    const setNotifications = useAppStore.use.setNotifications();

    const messageToEdit = useMessageStore.use.messageToEdit();
    const setMessageToEdit = useMessageStore.use.setMessageToEdit();
    const messageToReply = useMessageStore.use.messageToReply();
    const setMessageToReply = useMessageStore.use.setMessageToReply();

    const mediaContentToSend = useMessageStore.use.mediaContentToSend();
    const setMediaContentToSend = useMessageStore.use.setMediaContentToSend();

    const setIsOpenEmojiPicker = useMessageStore.use.setIsOpenEmojiPicker();
    const setIsOpenInputMenu = useMessageStore.use.setIsOpenInputMenu();

    const { data: chatsData } = ChatApi.handleGetChats();
    const chat = chatsData?.data?.find((chat) => chat.id === Number(params.chat_id));

    const [valueTextMessage, setValueTextMessage] = useState('');

    const audioRecorder = useAudioRecorder({
        onAfterSaving: (data) => {
            handleSendFileMessage({
                files: data,
                chatId,
            });
        },
    });

    const inputOnChange = (event: any) => {
        handleMessageAction({ chatId, action: 'typing' });
        setValueTextMessage(event.target.value);
    };

    const changeTextInMessage = () => {
        messageToEdit && handleChangeTextInMessages({ chatId, messageId: messageToEdit.id, text: valueTextMessage });
        setMessageToEdit(null);
        setValueTextMessage('');
    };

    const replyToMessage = () => {
        messageToReply && handleReplyMessage({ chatId, messageId: messageToReply.id, text: valueTextMessage, reply: messageToReply });
        setMessageToReply(null);
        setValueTextMessage('');
    };

    const sendMessage = () => {
        if (valueTextMessage) {
            if (messageToEdit) return changeTextInMessage();
            if (messageToReply) return replyToMessage();
            handleSendTextMessage({ text: valueTextMessage, chatId });
            setValueTextMessage('');
        }
    };

    const onKeyDown = (event: any) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            if (event.shiftKey || event.ctrlKey) {
                setValueTextMessage((prev) => `${prev}\n`);
            } else {
                if (messageToEdit) return changeTextInMessage();
                if (messageToReply) return replyToMessage();
                sendMessage();
            }
        }
    };

    const clickOnEmoji = (emoji: string) => {
        setValueTextMessage((prev) => prev + emoji);
    };

    const onOkModalMediaContent = () => {
        handleSendFileMessage({
            files: mediaContentToSend?.formData,
            chatId,
        });
        setMediaContentToSend(null);
    };

    useEffect(() => {
        if (messageToEdit) {
            setValueTextMessage(messageToEdit.text);
        } else {
            setValueTextMessage('');
        }
    }, [messageToEdit]);

    useEffect(() => {
        if (mediaContentToSend) modalMediaContent.open();
    }, [mediaContentToSend]);

    useEffect(() => {
        setValueTextMessage('');
    }, [chatId]);

    const getTagAUsers = (): UserTypes.User[] | null => {
        if (!chat || !chat.is_group) return null;
        const words = valueTextMessage.split(' ');
        const all = words.find((word) => /^@$/.test(word));
        const tags = words.filter((word) => /@[a-zA-Zа-яА-я0-9]/.test(word));
        const lastWordIsTag = /@[a-zA-Zа-яА-я0-9]/.test(words[words.length - 1]);
        const suitable: UserTypes.User[] = [];
        const users = chat.members.filter((user) => !!user.nickname && user.id !== ViewerService.getViewer()?.id);
        if (all) {
            suitable.splice(0, 0, ...users);
            return suitable;
        }
        if (tags.length && lastWordIsTag) {
            tags.forEach((tag) => {
                users.forEach((user) => {
                    if (user.nickname.includes(tag.substring(1))) {
                        suitable.push(user);
                    }
                });
            });
            return suitable;
        }
        return null;
    };

    const clickUser = (user: UserTypes.User) => {
        const val = valueTextMessage.split('@');
        val[val.length - 1] = `${user.nickname} `;
        setValueTextMessage(val.join('@'));
    };

    return (
        <>
            <MessageInputView
                clickUser={clickUser}
                tagAUsers={getTagAUsers()}
                audioRecorder={audioRecorder}
                messageToEdit={messageToEdit}
                messageToReply={messageToReply}
                removeMessageToEdit={() => setMessageToEdit(null)}
                removeMessageToReply={() => setMessageToReply(null)}
                onChange={inputOnChange}
                onKeyDown={onKeyDown}
                value={valueTextMessage}
                setIsOpenEmojiPicker={setIsOpenEmojiPicker}
                setIsOpenInputMenu={setIsOpenInputMenu}
                clickOnEmoji={clickOnEmoji}
                btnClick={sendMessage}
                loading={isLoading}
            />
            <Modal {...modalMediaContent} onOk={onOkModalMediaContent} onClose={() => setMediaContentToSend(null)} headerText="">
                {mediaContentToSend?.type === 'image' && (
                    <SwiperModal startWithIt={1} files={mediaContentToSend?.list.map((i) => ({ url: i.url, size: 0, name: '', extension: 'img' })) || []} />
                )}
                {mediaContentToSend?.type === 'document' && <MediaContentModal list={mediaContentToSend?.list.map((i) => i)} type="document" />}
            </Modal>
        </>
    );
}

export default MessageInput;

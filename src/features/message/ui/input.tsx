import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { MessageApi, MessageInputView, useMessageStore } from 'entities/message';
import { useAudioRecorder } from 'shared/hooks';

import { MediaContentModal } from '../../../entities/modal';
import { Modal, useModal } from '../../../shared/ui';

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

    const messageToEdit = useMessageStore.use.messageToEdit();
    const setMessageToEdit = useMessageStore.use.setMessageToEdit();
    const messageToReply = useMessageStore.use.messageToReply();
    const setMessageToReply = useMessageStore.use.setMessageToReply();

    const mediaContentToSend = useMessageStore.use.mediaContentToSend();
    const setMediaContentToSend = useMessageStore.use.setMediaContentToSend();

    const setIsOpenEmojiPicker = useMessageStore.use.setIsOpenEmojiPicker();
    const setIsOpenInputMenu = useMessageStore.use.setIsOpenInputMenu();

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
        messageToReply && handleReplyMessage({ chatId, messageId: messageToReply.id, text: valueTextMessage });
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
            if (event.shiftKey) {
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

    return (
        <>
            <MessageInputView
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
            <Modal {...modalMediaContent} onOk={onOkModalMediaContent} onClose={() => setMediaContentToSend(null)}>
                <MediaContentModal type={mediaContentToSend?.type} list={mediaContentToSend?.list} />
            </Modal>
        </>
    );
}

export default MessageInput;

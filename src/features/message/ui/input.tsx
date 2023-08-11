import React, { useEffect } from 'react';
import { useParams } from 'react-router';

import { chatApi, chatProxy } from 'entities/chat';
import { messageApi, MessageInputView, useMessageStore } from 'entities/message';
import { useEasyState, useFileUploader } from 'shared/hooks';

function MessageInput() {
    const params = useParams();
    const chatId = Number(params.chat_id);

    const { mutate: handleSendTextMessage, isLoading } = messageApi.handleSendTextMessage();

    const { data: chatData } = chatApi.handleGetChat({ chatId });

    const setReplyMessage = useMessageStore.use.setReplyMessage();
    const replyMessage = useMessageStore.use.replyMessage();

    const messageTextState = useEasyState('');

    const { open: openFilesDownloader } = useFileUploader({
        accept: 'all',
        multiple: true,
        onAfterUploading: (data) => {
            console.log('wdad');
        },
    });

    const sendMessage = () => {
        if (messageTextState.value) {
            if (replyMessage) {
                setReplyMessage(null);
                messageTextState.set('');
                return handleSendTextMessage({ text: messageTextState.value, chatId, params: { reply_to_message_id: replyMessage.id } });
            }
            messageTextState.set('');
            return handleSendTextMessage({ text: messageTextState.value, chatId });
        }
    };

    const onKeyDown = (event: any) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            if (event.shiftKey || event.ctrlKey) {
                messageTextState.set((prev) => `${prev}\n`);
            } else {
                sendMessage();
            }
        }
    };

    useEffect(() => {
        messageTextState.set('');
    }, [chatId]);

    return (
        <>
            <MessageInputView
                chat={chatProxy(chatData)}
                onKeyDown={onKeyDown}
                messageTextState={messageTextState}
                btnClick={sendMessage}
                loading={isLoading}
                clickUploadFiles={openFilesDownloader}
                replyMessage={{ value: replyMessage, set: setReplyMessage }}
            />
        </>
    );
}

export default MessageInput;

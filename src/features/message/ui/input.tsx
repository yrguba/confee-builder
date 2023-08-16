import React, { useEffect } from 'react';
import { useParams } from 'react-router';

import { chatApi, chatProxy } from 'entities/chat';
import { messageApi, MessageInputView, useMessageStore } from 'entities/message';
import { MessageType } from 'entities/message/model/types';
import { useEasyState, useFileUploader, useAudioRecorder } from 'shared/hooks';

function MessageInput() {
    const params = useParams();
    const chatId = Number(params.chat_id);

    const { mutate: handleSendTextMessage, isLoading } = messageApi.handleSendTextMessage();
    const { mutate: handleSendFileMessage } = messageApi.handleSendFileMessage();
    const { mutate: handleEditTextMessage } = messageApi.handleEditTextMessage();
    const { mutate: handleMessageTyping } = messageApi.handleMessageTyping();

    const { data: chatData } = chatApi.handleGetChat({ chatId });

    const replyMessage = useMessageStore.use.replyMessage();
    const editMessage = useMessageStore.use.editMessage();

    const messageTextState = useEasyState('');

    const voiceRecord = useAudioRecorder({
        onAfterSaving: (data) => {
            console.log(data);
        },
    });

    const { open: openFilesDownloader } = useFileUploader({
        accept: 'all',
        multiple: true,
        onAfterUploading: (data) => {
            if (data.sortByAccept) {
                Object.entries(data.sortByAccept).forEach(([key, value]) => {
                    if (value.length) {
                        const formData = new FormData();
                        value.forEach((i) => {
                            formData.append(`files[${key}s][]`, i.file);
                        });
                        handleSendFileMessage({
                            chatId,
                            files: formData,
                            filesForMock: value.map((i) => i.fileUrl),
                            filesType: `${key}s` as MessageType,
                        });
                    }
                });
            }
        },
    });

    const sendTextMessage = () => {
        if (messageTextState.value) {
            if (replyMessage.value) {
                replyMessage.set(null);
                messageTextState.set('');
                return handleSendTextMessage({
                    text: messageTextState.value,
                    chatId,
                    params: { reply_to_message_id: replyMessage.value?.id },
                    replyMessage: replyMessage.value,
                });
            }
            if (editMessage.value) {
                editMessage.set(null);
                messageTextState.set('');
                return handleEditTextMessage({
                    text: messageTextState.value,
                    chatId,
                    messageId: editMessage.value.id,
                });
            }
            messageTextState.set('');
            return handleSendTextMessage({ text: messageTextState.value, chatId });
        }
    };

    const getVoiceEvents = (e: 'start' | 'send' | 'stop' | 'cancel') => {
        console.log(e);
        switch (e) {
            case 'start':
                voiceRecord.startRecording().then();
                break;
            case 'send':
                voiceRecord.saveRecording();
                break;
            case 'cancel':
                voiceRecord.cancelRecording();
        }
    };

    useEffect(() => {
        messageTextState.value && handleMessageTyping({ chatId });
    }, [messageTextState.value]);

    useEffect(() => {
        messageTextState.set('');
    }, [chatId]);

    useEffect(() => {
        editMessage.value && messageTextState.set(editMessage.value.text);
    }, [editMessage.value]);

    return (
        <>
            <MessageInputView
                chat={chatProxy(chatData)}
                messageTextState={messageTextState}
                sendTextMessage={sendTextMessage}
                loading={isLoading}
                clickUploadFiles={openFilesDownloader}
                replyMessage={replyMessage}
                editMessage={editMessage}
                getVoiceEvents={getVoiceEvents}
                voiceRecord={voiceRecord as any}
            />
        </>
    );
}

export default MessageInput;

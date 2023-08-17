import React, { useEffect } from 'react';
import { useParams } from 'react-router';

import { chatApi, chatProxy } from 'entities/chat';
import { messageApi, MessageInputView, useMessageStore } from 'entities/message';
import { MessageType, VoiceEvents } from 'entities/message/model/types';
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
    const forwardMessage = useMessageStore.use.forwardMessage();
    const highlightedMessages = useMessageStore.use.highlightedMessages();

    const messageTextState = useEasyState('');
    const voiceEvent = useEasyState<VoiceEvents | null>(null);

    const voiceRecord = useAudioRecorder({});

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
                            params: { reply_to_message_id: replyMessage.value?.id },
                            replyMessage: replyMessage.value,
                            filesForMock: value.map((i) => ({ link: i.fileUrl })),
                            filesType: `${key}s` as MessageType,
                        });
                    }
                });
            }
        },
    });

    const deleteVoice = () => {
        voiceEvent.set(null);
        voiceRecord.cancelRecording();
    };

    const sendMessage = () => {
        if (voiceRecord.recorderState.formData) {
            handleSendFileMessage({
                chatId,
                filesType: 'voices',
                files: voiceRecord.recorderState.formData,
                filesForMock: [{ link: voiceRecord.recorderState.audio || '' }],
                params: { reply_to_message_id: replyMessage.value?.id },
                replyMessage: replyMessage.value,
            });
            return deleteVoice();
        }
        if (messageTextState.value) {
            if (editMessage.value) {
                editMessage.set(null);
                messageTextState.set('');
                return handleEditTextMessage({
                    text: messageTextState.value,
                    chatId,
                    messageId: editMessage.value.id,
                });
            }
            handleSendTextMessage({
                text: messageTextState.value,
                chatId,
                params: { reply_to_message_id: replyMessage.value?.id },
                replyMessage: replyMessage.value,
            });
            if (replyMessage.value) replyMessage.set(null);
            messageTextState.set('');
        }
    };

    const getVoiceEvents = (event: VoiceEvents) => {
        voiceEvent.set(event);
        switch (event) {
            case 'start':
                return voiceRecord.startRecording().then();
            case 'send':
                return voiceRecord.saveRecording('send');
            case 'stop':
                return voiceRecord.saveRecording('stop');
            case 'cancel':
                voiceRecord.cancelRecording();
        }
    };

    useEffect(() => {
        if (voiceEvent.value === 'send') {
            sendMessage();
        }
    }, [voiceRecord.recorderState.initRecording]);

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
                sendMessage={sendMessage}
                loading={isLoading}
                clickUploadFiles={openFilesDownloader}
                replyMessage={replyMessage}
                editMessage={editMessage}
                forwardMessage={forwardMessage}
                highlightedMessages={highlightedMessages}
                getVoiceEvents={getVoiceEvents}
                voiceRecord={voiceRecord as any}
                deleteVoice={deleteVoice}
                showVoice={voiceEvent.value === 'stop'}
            />
        </>
    );
}

export default MessageInput;

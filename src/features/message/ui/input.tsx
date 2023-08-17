import React, { useEffect } from 'react';
import { useParams } from 'react-router';

import { chatApi, chatProxy } from 'entities/chat';
import { messageApi, MessageInputView, useMessageStore } from 'entities/message';
import { MessageType, VoiceEvents, VoiceState } from 'entities/message/model/types';
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
                            filesForMock: value.map((i) => ({ link: i.fileUrl })),
                            filesType: `${key}s` as MessageType,
                        });
                    }
                });
            }
        },
    });

    const sendVoice = (formData: FormData | null, url: string) => {
        voiceEvent.set(null);
        formData &&
            handleSendFileMessage({
                chatId,
                filesType: 'voices',
                files: formData,
                filesForMock: [{ link: url }],
                params: { reply_to_message_id: replyMessage.value?.id },
                replyMessage: replyMessage.value,
            });
    };

    const deleteVoice = () => {
        voiceEvent.set(null);
        voiceRecord.cancelRecording();
    };

    const sendMessage = () => {
        if (voiceRecord.recorderState.formData) {
            return sendVoice(voiceRecord.recorderState.formData, voiceRecord.recorderState.audio || '');
        }
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
            sendVoice(voiceRecord.recorderState.formData, voiceRecord.recorderState.audio || '');
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
                getVoiceEvents={getVoiceEvents}
                voiceRecord={voiceRecord as any}
                deleteVoice={deleteVoice}
                showVoice={voiceEvent.value === 'stop'}
            />
        </>
    );
}

export default MessageInput;

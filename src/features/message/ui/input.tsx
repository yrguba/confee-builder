import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useLifecycles, useUpdateEffect } from 'react-use';

import { chatApi, chatProxy } from 'entities/chat';
import { companyTypes } from 'entities/company';
import { messageApi, MessageInputView, messageStore } from 'entities/message';
import { VoiceEvents } from 'entities/message/model/types';
import { userProxy, userTypes } from 'entities/user';
import { useEasyState, useFileUploader, useAudioRecorder, useThrottle } from 'shared/hooks';

import { viewerService, viewerStore } from '../../../entities/viewer';
import { chunkString, debounce, getRandomString } from '../../../shared/lib';
import { Modal } from '../../../shared/ui';
import { FilesToSendModal } from '../index';

const [throttleMessageTyping] = useThrottle((cl) => cl(), 2000);

function MessageInput() {
    const params = useParams();
    const chatId = Number(params.chat_id);

    const viewer = viewerStore.use.viewer();

    const { mutate: handleCheckText } = messageApi.handleCheckText();
    const { mutate: handleSendTextMessage, isLoading } = messageApi.handleSendTextMessage();
    const { mutate: handleSendFileMessage } = messageApi.handleSendFileMessage();
    const { mutate: handleEditTextMessage } = messageApi.handleEditTextMessage();
    const { mutate: handleMessageTyping } = messageApi.handleMessageTyping();
    const { mutate: handleForwardMessages } = messageApi.handleForwardMessages();
    const { mutate: handleAddDraft } = messageApi.handleAddDraft();

    const { data: chatData } = chatApi.handleGetChat({ chatId });

    const proxyChat = chatProxy(chatData?.data.data);

    const replyMessage = messageStore.use.replyMessage();
    const editMessage = messageStore.use.editMessage();
    const forwardMessages = messageStore.use.forwardMessages();
    const highlightedMessages = messageStore.use.highlightedMessages();
    const voiceRecordingInProgress = messageStore.use.voiceRecordingInProgress();
    const goDownList = messageStore.use.goDownList();
    const isFileDrag = messageStore.use.isFileDrag();
    const filesToSend = messageStore.use.filesToSend();

    const messageTextState = useEasyState('');
    const voiceEvent = useEasyState<VoiceEvents | null>(null);
    const tagUsers = useEasyState<userTypes.UserProxy[]>([]);

    const recordForChatId = useEasyState<number | null>(null);
    const voiceRecord = useAudioRecorder({});

    const filesToSendModal = Modal.use();

    const {
        open: openFilesDownloader,
        clear,
        copyFromClipboard,
        dropContainerRef,
    } = useFileUploader({
        accept: 'all',
        multiple: true,
        maxImgWidthOrHeight: 1800,
        onAfterUploading: (data) => {
            if (data.sortByAccept) {
                filesToSend.set(data.sortByAccept);
                filesToSendModal.open();
            }
        },
    });

    const deleteVoice = () => {
        voiceEvent.set(null);
        voiceRecord.cancelRecording();
        voiceRecordingInProgress.set(false);
    };

    const sendMessage = async () => {
        if (forwardMessages.value?.fromChatName) {
            setTimeout(() => {
                handleForwardMessages({
                    chatId,
                    messages: forwardMessages.value?.messages as any,
                    filesIds: forwardMessages.value?.filesIds,
                });
            }, 1000);
            forwardMessages.clear();
            highlightedMessages.clear();
        }
        if (voiceRecord.recorderState.formData) {
            handleSendFileMessage({
                chatId,
                filesType: 'voices',
                files: voiceRecord.recorderState.formData,
                filesForMock: [{ id: 0, url: voiceRecord.recorderState.audio || '' }],
                params: { reply_to_message_id: replyMessage.value?.id },
                replyMessage: replyMessage.value,
            });
            return deleteVoice();
        }
        if (messageTextState.value) {
            if (editMessage.value?.id) {
                editMessage.clear();
                messageTextState.set('');
                return handleEditTextMessage({
                    text: messageTextState.value,
                    chatId,
                    messageId: editMessage.value?.id,
                });
            }

            const textChunk = chunkString(messageTextState.value, 4096);

            const sendChunks = (chunkOrder: number) => {
                handleSendTextMessage(
                    {
                        text: textChunk[chunkOrder],
                        chatId,
                        params: { reply_to_message_id: replyMessage.value?.id },
                        replyMessage: replyMessage.value,
                    },
                    {
                        onSuccess: () => {
                            if (textChunk[chunkOrder + 1]) {
                                sendChunks(chunkOrder + 1);
                            }
                        },
                    }
                );
            };
            sendChunks(0);

            if (replyMessage.value?.id) replyMessage.clear();
            messageTextState.set('');
            // handleAddDraft({
            //     text: '',
            //     chatId,
            // });
        }
        goDownList.set(true);
        setTimeout(() => goDownList.set(false), 1000);
    };

    const getVoiceEvents = (event: VoiceEvents) => {
        voiceEvent.set(event);
        switch (event) {
            case 'start':
                recordForChatId.set(chatId);
                voiceRecordingInProgress.set(true);
                return voiceRecord.startRecording().then();
            case 'send':
                return voiceRecord.saveRecording('send');
            case 'stop':
                return voiceRecord.saveRecording('stop');
            case 'cancel':
                deleteVoice();
        }
    };

    const sendDraft = () => {};

    useUpdateEffect(() => {
        const text = messageTextState.value;
        const lasWord = text.split(' ').pop();
        if (lasWord && lasWord.includes('@')) {
            const arr: any = proxyChat?.is_personal ? proxyChat?.members : proxyChat?.employee_members;
            const members = arr?.filter((i: any) => i.nickname?.includes(lasWord.substring(1))).map((i: any) => userProxy(i)) as any;
            tagUsers.set(members || []);
        } else {
            tagUsers.set([]);
        }
    }, [messageTextState.value]);

    useEffect(() => {
        if (voiceEvent.value === 'send') {
            sendMessage();
        }
        if (!voiceRecord.recorderState.initRecording) {
            recordForChatId.set(null);
        }
    }, [voiceRecord.recorderState.initRecording]);

    useEffect(() => {
        throttleMessageTyping(() => {
            messageTextState.value && handleMessageTyping({ chatId });
        });
    }, [messageTextState.value]);

    useEffect(() => {
        messageTextState.set('');
        if (chatId !== recordForChatId.value) {
            deleteVoice();
        }
    }, [chatId]);

    useEffect(() => {
        messageTextState.set(editMessage.value?.text || '');
    }, [editMessage.value?.id]);

    useEffect(() => {
        copyFromClipboard();
    }, []);

    return (
        <>
            <FilesToSendModal onClose={clear} modal={filesToSendModal} />
            {!proxyChat?.isDeleted && (
                <MessageInputView
                    tagUsers={tagUsers}
                    chat={proxyChat}
                    messageTextState={messageTextState}
                    sendMessage={sendMessage}
                    loading={isLoading}
                    clickUploadFiles={openFilesDownloader}
                    replyMessage={replyMessage}
                    editMessage={editMessage}
                    forwardMessages={forwardMessages}
                    highlightedMessages={highlightedMessages}
                    getVoiceEvents={getVoiceEvents}
                    voiceRecord={voiceRecord as any}
                    deleteVoice={deleteVoice}
                    showVoice={voiceEvent.value === 'stop'}
                    dropContainerRef={dropContainerRef}
                    isFileDrag={isFileDrag}
                    sendDraft={sendDraft}
                />
            )}
        </>
    );
}

export default MessageInput;

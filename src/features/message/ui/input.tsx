import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useUpdateEffect } from 'react-use';

import { chatApi, chatProxy } from 'entities/chat';
import { companyTypes } from 'entities/company';
import { messageApi, MessageInputView, useMessageStore } from 'entities/message';
import { VoiceEvents } from 'entities/message/model/types';
import { userProxy, userTypes } from 'entities/user';
import { useEasyState, useFileUploader, useAudioRecorder, useThrottle } from 'shared/hooks';

import { viewerService } from '../../../entities/viewer';
import { chunkString, getRandomString } from '../../../shared/lib';
import { Modal } from '../../../shared/ui';
import { FilesToSendModal } from '../index';

const [throttleMessageTyping] = useThrottle((cl) => cl(), 2000);

function MessageInput() {
    const params = useParams();
    const chatId = Number(params.chat_id);
    const viewerId = viewerService.getId();

    const { mutate: handleSendTextMessage, isLoading } = messageApi.handleSendTextMessage();
    const { mutate: handleSendFileMessage } = messageApi.handleSendFileMessage();
    const { mutate: handleEditTextMessage } = messageApi.handleEditTextMessage();
    const { mutate: handleMessageTyping } = messageApi.handleMessageTyping();
    const { mutate: handleForwardMessages } = messageApi.handleForwardMessages();

    const { data: chatData } = chatApi.handleGetChat({ chatId });

    const proxyChat = chatProxy(chatData?.data.data);

    const replyMessage = useMessageStore.use.replyMessage();
    const editMessage = useMessageStore.use.editMessage();
    const forwardMessages = useMessageStore.use.forwardMessages();
    const highlightedMessages = useMessageStore.use.highlightedMessages();
    const voiceRecordingInProgress = useMessageStore.use.voiceRecordingInProgress();
    const goDownList = useMessageStore.use.goDownList();
    const isFileDrag = useMessageStore.use.isFileDrag();

    const messageTextState = useEasyState('');
    const voiceEvent = useEasyState<VoiceEvents | null>(null);
    const tagUsers = useEasyState<userTypes.UserProxy[]>([]);

    const recordForChatId = useEasyState<number | null>(null);
    const voiceRecord = useAudioRecorder({});

    const filesToSendModal = Modal.use();

    const {
        open: openFilesDownloader,
        sortByAccept,
        clear,
        copyFromClipboard,
        dropContainerRef,
    } = useFileUploader({
        accept: 'all',
        multiple: true,
        onAfterUploading: (data) => {
            if (data.sortByAccept) {
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
        if (forwardMessages.value.fromChatName) {
            setTimeout(() => {
                handleForwardMessages({
                    chatId,
                    messages: forwardMessages.value.messages,
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
            if (editMessage.value.id) {
                editMessage.clear();
                messageTextState.set('');
                return handleEditTextMessage({
                    text: messageTextState.value,
                    chatId,
                    messageId: editMessage.value.id,
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

            if (replyMessage.value.id) replyMessage.clear();
            messageTextState.set('');
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

    useUpdateEffect(() => {
        const text = messageTextState.value;
        const lasWord = text.split(' ').pop();
        if (lasWord && lasWord.includes('@')) {
            const arr: any = proxyChat?.is_personal ? proxyChat?.members : proxyChat?.employee_members;
            const members = arr?.filter((i: any) => viewerId !== i.id && i.nickname?.includes(lasWord.substring(1))).map((i: any) => userProxy(i)) as any;
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
        messageTextState.set(editMessage.value.text || '');
    }, [editMessage.value.id]);

    useEffect(() => {
        copyFromClipboard();
    }, []);

    return (
        <>
            <FilesToSendModal onClose={clear} modal={filesToSendModal} files={sortByAccept as any} />
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
                />
            )}
        </>
    );
}

export default MessageInput;

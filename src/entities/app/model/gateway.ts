import { useEffect } from 'react';

import { ChatService } from 'entities/chat';
import { ViewerService } from 'entities/viewer';
import { socketIo } from 'shared/configs';

import useAppStore from './store';
import { MessageTypes } from '../../message';

function AppGateway() {
    const setNotifications = useAppStore.use.setNotifications();
    const viewer = ViewerService.getViewer();
    useEffect(() => {
        socketIo.on('receiveMessage', ({ message }: { message: { chat_id: string } & MessageTypes.Message }) => {
            console.log(message);
            const openChatId = ChatService.getOpenChatId();
            if (message.user.id !== viewer?.id && Number(message.chat_id) !== openChatId) {
                const { message_type, user } = message;
                const getAction = () => {
                    if (message_type === 'images') return `отправил картинку.`;
                    if (message_type === 'audios') return `отправил аудио.`;
                    if (message_type === 'videos') return `отправил видео.`;
                    if (message_type === 'documents') return `отправил документ.`;
                    if (message_type === 'text') return `Написал сообщение.`;
                };
                setNotifications({ description: 'Новое сообщение', text: `${user?.name} ${getAction()}`, scope: 'all' });
            }
        });

        socketIo.on('receiveReactions', ({ data }) => {});
        socketIo.on('receiveForwardMessage', ({ chat_id, message }) => {
            if (message.user.id !== viewer?.id) {
                const { message_type, user } = message;
                setNotifications({ description: 'Новое сообщение.', text: `${user.name} переслал сообщения`, scope: 'all' });
            }
        });
    }, []);
}

export default AppGateway;

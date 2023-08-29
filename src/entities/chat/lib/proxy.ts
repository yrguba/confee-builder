import { viewerService } from 'entities/viewer';
import { dateConverter, getEnding } from 'shared/lib';

import { userService } from '../../user';
import { ChatProxy, Chat } from '../model/types';

function chatProxy(chat: Chat | undefined): any {
    const viewerId = viewerService.getId();
    if (!chat) return null;
    return new Proxy(chat, {
        get(target: ChatProxy, prop: keyof ChatProxy, receiver): ChatProxy[keyof ChatProxy] {
            switch (prop) {
                case 'secondMember':
                    if (target.is_group) return null;
                    return target?.members?.find((i) => i.id !== viewerId) || null;

                case 'secondMemberStatus':
                    if (chat?.is_group) return null;
                    return receiver?.secondMember?.is_online ? 'ONLINE' : null;

                case 'checkIsMyLastMessage':
                    return target.last_message.author.id === viewerId;

                case 'lastMessageTitle':
                    if (target.typing) return target.typing;
                    if (!target.last_message) return '';
                    const { type, text } = target.last_message;
                    if (type === 'images') return 'Отправил фото';
                    if (type === 'audios') return 'Отправил аудио';
                    if (type === 'videos') return 'Отправил видео';
                    if (type === 'voices') return 'Отправил голосовое';
                    if (type === 'documents') return 'Отправил файл';
                    return text;

                case 'date':
                    return dateConverter(target.last_message.created_at);

                case 'subtitle':
                    if (target.typing) return target.typing;
                    if (target.is_group) {
                        const word = getEnding(target.members.length, ['участник', 'участника', 'участников']);
                        return `${target.members.length} ${word}`;
                    }
                    return userService.getUserNetworkStatus(chat.members?.find((i) => i.id !== viewerId) || null);

                default:
                    return target[prop];
            }
        },
    });
}

export default chatProxy;

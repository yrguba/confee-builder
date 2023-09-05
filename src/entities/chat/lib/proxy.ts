import { viewerService } from 'entities/viewer';
import { dateConverter, getEnding } from 'shared/lib';

import { userProxy, userService } from '../../user';
import { ChatProxy, Chat } from '../model/types';

function chatProxy(chat: Chat | undefined): any {
    const viewerId = viewerService.getId();
    if (!chat) return null;
    return new Proxy(chat, {
        get(target: ChatProxy, prop: keyof ChatProxy, receiver: ChatProxy): ChatProxy[keyof ChatProxy] {
            const secondMember = target.is_group ? null : target?.members?.find((i) => i.id !== viewerId) || null;
            const secondMemberProxy = secondMember ? userProxy(secondMember) : null;
            switch (prop) {
                case 'is_personal':
                    return !target.employee_members?.length;

                case 'secondMember':
                    return secondMemberProxy;

                case 'checkIsMyLastMessage':
                    return target.last_message.author?.id === viewerId;

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

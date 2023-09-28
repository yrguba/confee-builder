import { viewerService } from 'entities/viewer';
import { dateConverter, getEnding } from 'shared/lib';

import { employeeProxy } from '../../company';
import { userProxy, userService } from '../../user';
import { UserProxy } from '../../user/model/types';
import { ChatProxy, Chat } from '../model/types';

function chatProxy(chat: Chat | undefined): ChatProxy | null {
    const viewerId = viewerService.getId();
    if (!chat) return null;
    return new Proxy(chat, {
        get(target: ChatProxy, prop: keyof ChatProxy, receiver: ChatProxy): ChatProxy[keyof ChatProxy] {
            const secondUser = target.is_group ? undefined : target?.members?.find((i) => i.id !== viewerId);
            const secondUserProxy = secondUser ? userProxy(secondUser) : null;
            const secondEmployee = target.is_group ? undefined : target?.employee_members?.find((i) => i.id !== viewerId);
            const secondEmployeeProxy = secondEmployee ? employeeProxy(secondEmployee) : null;

            switch (prop) {
                case 'is_personal':
                    return !target.employee_members?.length;

                case 'secondUser':
                    return secondUserProxy;

                case 'secondEmployee':
                    return secondEmployeeProxy;

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
                        const memberCount = target.members?.length || target.employee_members?.length;
                        const word = getEnding(memberCount, ['участник', 'участника', 'участников']);
                        return `${memberCount} ${word}`;
                    }
                    return secondUserProxy?.networkStatus || secondEmployeeProxy?.status || secondUserProxy?.formatted_last_active || '';

                default:
                    return target[prop];
            }
        },
    }) as ChatProxy;
}

export default chatProxy;

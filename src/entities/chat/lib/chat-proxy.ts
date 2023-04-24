import { ViewerService } from 'entities/viewer';

import { ChatProxy, Chat } from '../model/types';

function chatProxy(chat: Chat): any {
    const viewer = ViewerService.getViewer();
    return new Proxy(chat, {
        get(target: ChatProxy, prop: keyof ChatProxy, receiver): ChatProxy[keyof ChatProxy] {
            switch (prop) {
                case 'messageAction':
                    return target[prop];
                case 'secondMember':
                    if (target.is_group) return null;
                    const found = chat.chatUsers.find((i) => i.id !== viewer?.id);
                    return found || null;

                case 'lastMessage':
                    if (!target.message.length) return '';
                    const lastMsg = target.message[0];
                    if (lastMsg.message_type === 'images') return 'Отправил фото';
                    if (lastMsg.message_type === 'audios') return 'Отправил аудио';
                    if (lastMsg.message_type === 'videos') return 'Отправил видео';
                    if (lastMsg.message_type === 'voices') return 'Отправил голосовое';
                    return lastMsg.text;

                default:
                    return Reflect.get(target, prop, receiver);
            }
        },
        set(target: ChatProxy, prop: keyof ChatProxy, value, receiver) {
            switch (prop) {
                case 'messageAction':
                    return Reflect.set(target, prop, value, receiver);
                default:
                    return false;
            }
        },
    });
}

export default chatProxy;

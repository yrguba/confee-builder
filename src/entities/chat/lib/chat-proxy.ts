import { ViewerService } from 'entities/viewer';

import { ChatProxy, Chat } from '../model/types';

function chatProxy(chat: Chat): any {
    // const viewer = ViewerService.getViewer();
    return new Proxy(chat, {
        get(target: ChatProxy, prop: keyof ChatProxy, receiver): ChatProxy[keyof ChatProxy] {
            switch (prop) {
                case 'messageAction':
                    return target[prop];
                case 'secondMember':
                    if (target.is_group) return null;
                    // const found = chat.members.find((i) => i.id !== viewer?.id);
                    return null;

                case 'lastMessageTitle':
                    if (!target.last_message) return '';
                    const { type, text } = target.last_message;
                    if (type === 'images') return 'Отправил фото';
                    if (type === 'audios') return 'Отправил аудио';
                    if (type === 'videos') return 'Отправил видео';
                    if (type === 'voices') return 'Отправил голосовое';
                    if (type === 'documents') return 'Отправил файл';
                    return text;

                default:
                    return target[prop];
            }
        },
        set(target: ChatProxy, prop: keyof ChatProxy, value, receiver) {
            switch (prop) {
                case 'messageAction':
                    return Reflect.set(target, prop, value, receiver);
                default:
                    return Reflect.set(target, prop, value, receiver);
            }
        },
    });
}

export default chatProxy;

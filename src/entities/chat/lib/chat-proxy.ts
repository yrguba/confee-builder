import { ChatProxy, Chat } from '../model/types';

function chatProxy(chat: Chat): any {
    return new Proxy(chat, {
        get(target: ChatProxy, prop: keyof ChatProxy, receiver): ChatProxy[keyof ChatProxy] {
            switch (prop) {
                case 'messageAction':
                    return target[prop];
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

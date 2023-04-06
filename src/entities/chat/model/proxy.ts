import { ChatProxy, Chat } from './types';

function chatProxy(chat: Chat): any {
    return new Proxy(chat, {
        get(target: ChatProxy, prop: keyof ChatProxy, receiver): ChatProxy[keyof ChatProxy] {
            switch (prop) {
                default:
                    return target[prop];
            }
        },
    });
}

export default chatProxy;

import { Message, MessageProxy, MessageStatus } from './types';

function messageProxy(prevMessage: Message, message: Message, viewerId: number | null) {
    return new Proxy(message, {
        get(target: MessageProxy, prop: keyof MessageProxy, receiver): MessageProxy[keyof MessageProxy] {
            switch (prop) {
                case 'isMy':
                    return target.user.id === viewerId && target.message_type !== 'system';

                case 'isFirstUnread':
                    if (!prevMessage && target.message_status === 'pending') return true;
                    if (!prevMessage) return false;
                    return target.message_status === 'pending' && prevMessage.message_status !== 'pending';

                default:
                    return target[prop];
            }
        },
    });
}

export default messageProxy;

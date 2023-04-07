import moment from 'moment';

import { Message, MessageProxy, MessageStatus } from './types';

function messageProxy(prevMessage: Message, message: Message, viewerId: number | null): any {
    return new Proxy(message, {
        get(target: MessageProxy, prop: keyof MessageProxy, receiver): MessageProxy[keyof MessageProxy] {
            switch (prop) {
                case 'isMy':
                    return target?.user?.id === viewerId && target.message_type !== 'system';

                case 'isFirstUnread':
                    if (!prevMessage && target.message_status === 'pending') return true;
                    if (!prevMessage) return false;
                    return target.message_status === 'pending' && prevMessage.message_status !== 'pending';

                case 'firstOfDay':
                    if (!prevMessage || moment(prevMessage?.created_at).startOf('day').unix() < moment(message?.created_at).startOf('day').unix()) {
                        return moment(message?.created_at).calendar().split(',')[0];
                    }
                    return '';

                default:
                    return target[prop];
            }
        },
    });
}

export default messageProxy;

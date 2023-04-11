import moment from 'moment';

import { ChatProxy } from '../../chat/model/types';
import { Message, MessageProxy, MessageStatus } from '../model/types';

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
        set(target: Message, prop: keyof MessageProxy, value, receiver) {
            return Reflect.set(target, prop, value, receiver);
        },
    });
}

export default messageProxy;

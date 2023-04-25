import moment from 'moment';

import { Message, MessageProxy } from '../model/types';

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
                        const dateNow = moment().unix();
                        const dateMessage = moment(message?.created_at).unix();
                        if (dateNow - dateMessage > 86400) {
                            return moment(message?.created_at)
                                .format('LL')
                                .split(' ')
                                .splice(0, moment().startOf('year').unix() > dateMessage ? 4 : 2)
                                .join(' ');
                        }
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

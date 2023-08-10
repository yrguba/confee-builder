import moment from 'moment';

import { dateConverter } from '../../../shared/lib';
import { viewerService } from '../../viewer';
import { Message, MessageProxy } from '../model/types';

function messageProxy(prevMessage: any, message: Message, firstUnreadMessage?: Message): any {
    const viewerId = viewerService.getId();

    return new Proxy(message, {
        get(target: MessageProxy, prop: keyof MessageProxy, receiver): MessageProxy[keyof MessageProxy] {
            switch (prop) {
                case 'isMy':
                    if (target.isMock) return true;
                    return target?.author?.id === viewerId && target.type !== 'system';

                case 'authorName':
                    return message?.author?.id === viewerId ? 'Вы' : message?.author?.first_name;

                case 'date':
                    return dateConverter(target.created_at, true);

                case 'isFirstUnread':
                    return firstUnreadMessage?.id === message.id;

                case 'systemMessageText':
                    if (receiver.firstOfDay) return receiver.firstOfDay;
                    if (receiver.type === 'system') return receiver.text;
                    if (receiver.isFirstUnread) return 'Непрочитанные';
                    return '';

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

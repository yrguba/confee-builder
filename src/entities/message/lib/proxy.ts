import moment from 'moment';

import { dateConverter } from '../../../shared/lib';
import momentLocalZone from '../../../shared/lib/moment-local-zone';
import { viewerService } from '../../viewer';
import { Message, MessageProxy } from '../model/types';

function messageProxy(prevMessage: Message | null, message: Message, nextMessage: Message): any {
    const viewerId = viewerService.getId();

    return new Proxy(message, {
        get(target: MessageProxy, prop: keyof MessageProxy, receiver): MessageProxy[keyof MessageProxy] {
            switch (prop) {
                case 'isMy':
                    if (target.isMock) return true;
                    return target?.author?.id === viewerId && target.type !== 'system';

                case 'lastMessageInBlock':
                    return message?.author?.id !== nextMessage?.author?.id;

                case 'authorName':
                    return message?.author?.id === viewerId ? 'Вы' : message?.author?.first_name;

                case 'date':
                    return dateConverter(target.created_at, true);

                case 'isFirstUnread':
                    return prevMessage?.is_read && !message.is_read;

                case 'systemMessages':
                    const arr = [];
                    if (receiver.firstOfDay) arr.push(receiver.firstOfDay);
                    if (receiver.type === 'system') arr.push(receiver.text);
                    if (receiver.isFirstUnread) arr.push('Непрочитанные');
                    return arr;

                case 'firstOfDay':
                    if (
                        !prevMessage ||
                        momentLocalZone(prevMessage?.created_at).startOf('day').unix() < momentLocalZone(message?.created_at).startOf('day').unix()
                    ) {
                        const dateNow = momentLocalZone().unix();
                        const dateMessage = momentLocalZone(message?.created_at).unix();
                        if (dateNow - dateMessage > 86400) {
                            return moment(message?.created_at)
                                .format('LL')
                                .split(' ')
                                .splice(0, momentLocalZone().startOf('year').unix() > dateMessage ? 4 : 2)
                                .join(' ');
                        }
                        return momentLocalZone(message?.created_at).calendar().split(',')[0];
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

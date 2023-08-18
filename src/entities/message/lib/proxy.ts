import moment from 'moment';

import { dateConverter } from '../../../shared/lib';
import momentLocalZone from '../../../shared/lib/moment-local-zone';
import { viewerService } from '../../viewer';
import { Message, MessageProxy } from '../model/types';

function messageProxy(data: { prevMessage?: Message | null; message: Message; nextMessage?: Message | null }): any {
    const viewerId = viewerService.getId();

    return new Proxy(data.message, {
        get(target: MessageProxy, prop: keyof MessageProxy, receiver): MessageProxy[keyof MessageProxy] {
            switch (prop) {
                case 'isMy':
                    if (target.isMock) return true;
                    return target?.author?.id === viewerId && target.type !== 'system';

                case 'lastMessageInBlock':
                    if (data.nextMessage?.isMock) return false;
                    if (!data.nextMessage) return true;
                    if (target.isMock) return false;
                    return target?.author?.id !== data.nextMessage?.author?.id;

                case 'authorName':
                    return target?.author
                        ? target?.author?.id === viewerId
                            ? 'Вы'
                            : target?.author?.first_name || target?.author?.last_name || target?.author?.nickname
                        : 'Неизвестный';

                case 'date':
                    return dateConverter(target.created_at, true);

                case 'isFirstUnread':
                    return data.prevMessage?.is_read && !target.is_read;

                case 'systemMessages':
                    const arr = [];
                    if (receiver.firstOfDay) arr.push(receiver.firstOfDay);
                    if (receiver.type === 'system') arr.push(receiver.text);
                    if (receiver.isFirstUnread) arr.push('Непрочитанные');
                    return arr;

                case 'firstOfDay':
                    if (
                        !data.prevMessage ||
                        momentLocalZone(data.prevMessage?.created_at).startOf('day').unix() < momentLocalZone(target?.created_at).startOf('day').unix()
                    ) {
                        const dateNow = momentLocalZone().unix();
                        const dateMessage = momentLocalZone(target?.created_at).unix();
                        if (dateNow - dateMessage > 86400) {
                            return moment(target?.created_at)
                                .format('LL')
                                .split(' ')
                                .splice(0, momentLocalZone().startOf('year').unix() > dateMessage ? 4 : 2)
                                .join(' ');
                        }
                        return momentLocalZone(target?.created_at).calendar().split(',')[0];
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

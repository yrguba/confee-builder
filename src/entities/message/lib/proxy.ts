import moment from 'moment';

import { dateConverter } from '../../../shared/lib';
import momentLocalZone from '../../../shared/lib/moment-local-zone';
import { employeeProxy } from '../../company';
import { userProxy } from '../../user';
import { viewerService } from '../../viewer';
import { Message, MessageProxy } from '../model/types';

function messageProxy(data: { prevMessage?: Message | null; message: Message; nextMessage?: Message | null }): MessageProxy {
    const viewerId = viewerService.getId();
    const employee = data.message.author_employee ? employeeProxy(data.message.author_employee) : null;
    const author = data.message.author ? userProxy(data.message.author) : null;
    return new Proxy(data.message, {
        get(target: MessageProxy, prop: keyof MessageProxy, receiver) {
            switch (prop) {
                case 'isMy':
                    if (target.isMock) return true;
                    return target?.author?.id === viewerId && target.type !== 'system';

                case 'firstMessageInBlock':
                    if (!data.prevMessage || data.prevMessage.type === 'system') return true;
                    return target?.author?.id !== data.prevMessage?.author?.id;

                case 'lastMessageInBlock':
                    if (!data.nextMessage) return true;
                    if (target.isMock) return false;
                    return target?.author?.id !== data.nextMessage?.author?.id;

                case 'action':
                    if (target.type === 'images') return 'Отправил фото';
                    if (target.type === 'audios') return 'Отправил аудио';
                    if (target.type === 'videos') return 'Отправил видео';
                    if (target.type === 'voices') return 'Отправил голосовое';
                    if (target.type === 'documents') return 'Отправил файл';
                    return target.text;

                case 'authorName':
                    return target?.author?.id === viewerId ? 'Вы' : employee?.full_name || author?.full_name || 'Неизвестный';

                case 'authorAvatar':
                    return employee ? employee?.avatar || '' : author?.avatar || '';

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
    }) as MessageProxy;
}

export default messageProxy;

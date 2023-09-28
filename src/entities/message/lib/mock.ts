import { useQueryClient } from '@tanstack/react-query';

import { viewerTypes } from 'entities/viewer';

import { Message, MessageProxy, MessageType } from '../model/types';

type Props = {
    text?: string;
    files?: any;
    type?: MessageType;
    author: viewerTypes.Viewer | undefined;
    reply?: Message | null;
    forward?: Message | null;
};

function mockMessage(data: Props): Message {
    return {
        author: data.author || {},
        id: new Date().valueOf(),
        text: data.text || '',
        files: data.files || null,
        is_read: true,
        created_at: new Date(),
        type: data.type || 'text',
        users_have_read: [],
        forwarded_from_message: data.forward,
        reactions: {},
        reply_to_message: data.reply || null,
        isMock: true,
        isMy: true,
    } as MessageProxy;
}
export default mockMessage;

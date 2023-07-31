import { useQueryClient } from '@tanstack/react-query';

import { viewerTypes } from 'entities/viewer';

import { Message, MessageProxy, MessageType } from '../model/types';

export default function (data: { text?: string; content?: any; type?: MessageType; viewer: viewerTypes.Viewer | undefined; reply?: Message | null }): Message {
    return {
        author: data.viewer || {},
        id: new Date().valueOf(),
        text: data.text || '',
        files: data.content || null,
        is_read: false,
        created_at: new Date(),
        type: data.type || 'text',
        users_have_read: [],
        forwarded_from_messages: [],
        reactions: {},
        reply_to_message: data.reply || null,
        isMock: true,
    } as MessageProxy;
}

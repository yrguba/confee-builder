import { useQueryClient } from '@tanstack/react-query';

import { ViewerTypes } from 'entities/viewer';

import { Message, MessageProxy, MessageType } from './types';

export default function (data: { text?: string; content?: any; type?: MessageType; viewer: ViewerTypes.Viewer | undefined }): Message {
    return {
        id: new Date().valueOf(),
        text: data.text || '',
        content: data.content || null,
        user: data.viewer || {},
        message_status: 'read',
        created_at: new Date(),
        message_type: data.type || 'text',
        users_have_read: [],
        forwarded_messages: [],
        reactions: {},
        reply_messages: [],
        isMock: true,
    } as MessageProxy;
}

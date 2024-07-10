import { useQueryClient } from '@tanstack/react-query';

import { viewerTypes } from 'entities/viewer';

import chatGptAvatar from '../../../assets/images/1-15-10.jpeg';
import { appService } from '../../app';
import { Employee } from '../../company/model/types';
import { Message } from '../../message/model/types';
import { User } from '../../user/model/types';
import { Chat } from '../model/types';

type Props = {
    name: string;
    id: number;
};

function mockChat(data: Props): Chat {
    return {
        name: data.name,
        avatar: `${appService.getUrls().clientBaseURL}${chatGptAvatar}`,
        created_at: new Date(),
        id: data.id,
        is_group: false,
        last_message: null,
        members: [],
        employee_members: [],
        members_count: null,
        employee_members_count: null,
        messages_count: 0,
        pending_messages_count: 0,
        updated_at: new Date(),
        permittedReactions: [],
        company_id: null,
        draft: null,
        is_muted: false,
        current_user_role: 'Owner',
        chat_pinned: false,
        calls: [],
    };
}
export default mockChat;

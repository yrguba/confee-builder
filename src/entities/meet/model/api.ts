import { useMutation, useQuery } from '@tanstack/react-query';

import { useWebSocket } from 'shared/hooks';

import { SocketIn, SocketOut } from './types';
import { axiosClient } from '../../../shared/configs';
import { httpHandlers } from '../../../shared/lib';
import { Chat } from '../../chat/model/types';

class MeetApi {
    socket = useWebSocket<SocketIn, SocketOut>();

    pathPrefix = '/api/v2/chats';

    handleCreateMeeting = () => {
        return useMutation((data: { chatId: number | string | undefined; target_user_id: string; confee_video_room: string }) =>
            axiosClient.post(`${this.pathPrefix}/${data.chatId}/for-company/add-members `, data)
        );
    };
}

export default new MeetApi();

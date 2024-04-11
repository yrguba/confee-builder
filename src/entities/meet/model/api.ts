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
        return useMutation((data: { chatId: number | string | undefined; targets_user_id?: number[]; confee_video_room: string }) =>
            axiosClient.post(`${this.pathPrefix}/${data.chatId}/call `, data)
        );
    };

    handleCallResponse = () => {
        console.log('tt');
        return {
            mutate: (chat_id: number | null, call_id: string, response: 'accepted' | 'reject' | 'timeout', user_id: number) => {
                this.socket.sendMessage('CallResponse', {
                    chat_id,
                    call_id,
                    response,
                    user_id,
                });
            },
        };
    };

    handleLeftCall = () => {
        return {
            mutate: (chatId: number | null, call_id: number) => {
                this.socket.sendMessage('LeftCall', {
                    chatId,
                    call_id,
                });
            },
        };
    };
}

export default new MeetApi();

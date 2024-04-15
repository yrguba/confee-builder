import { useMutation, useQuery } from '@tanstack/react-query';

import { useWebSocket } from 'shared/hooks';

import { SocketIn, SocketOut } from './types';
import { axiosClient } from '../../../shared/configs';
import { httpHandlers } from '../../../shared/lib';
import { Chat } from '../../chat/model/types';
import { useMeet } from '../index';

class MeetApi {
    socket = useWebSocket<SocketIn, SocketOut>();

    pathPrefix = '/api/v2/chats';

    handleGetMeet = (data: { chatId?: number; meetId?: string | undefined }) => {
        return useQuery(['get-meet', Number(data.meetId)], () => axiosClient.get(`${this.pathPrefix}/${data.chatId}/call/${data.meetId}/members`), {
            staleTime: Infinity,
            enabled: !!Number(data.chatId),
            select: (res) => {
                return res;
            },
        });
    };

    handleCreateMeet = () => {
        return useMutation((data: { chatId: number | undefined; targets_user_id?: number[]; confee_video_room: string }) =>
            axiosClient.post(`${this.pathPrefix}/${data.chatId}/call`, data)
        );
    };

    handleCallResponse = () => {
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

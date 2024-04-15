import { useMutation, useQuery } from '@tanstack/react-query';

import { useWebSocket } from 'shared/hooks';

import { CallResponse, SocketIn, SocketOut } from './types';
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

    handleCreateCall = () => {
        return useMutation((data: { chatId: number | undefined; targets_user_id?: number[]; confee_video_room: string }) =>
            axiosClient.post(`${this.pathPrefix}/${data.chatId}/call`, data)
        );
    };

    handleCallResponse = () => {
        return {
            mutate: (data: CallResponse) => {
                this.socket.sendMessage('CallResponse', data);
            },
        };
    };

    handleLeftCall = () => {
        return {
            mutate: (data: { chat_id: number | null; call_id: number }) => {
                this.socket.sendMessage('LeftCall', data);
            },
        };
    };
}

export default new MeetApi();

import { useMutation, useQuery } from '@tanstack/react-query';

import { useWebSocket } from 'shared/hooks';

import { CallResponse, SocketIn, SocketOut } from './types';
import { axiosClient } from '../../../shared/configs';

class CallApi {
    socket = useWebSocket<SocketIn, SocketOut>();

    pathPrefix = '/api/v2/chats';

    handleGetCall = (data: { chatId?: number; callId?: number }) => {
        return useQuery(['get-meet', Number(data.callId)], () => axiosClient.get(`${this.pathPrefix}/${data.chatId}/call/${data.callId}/members`), {
            staleTime: Infinity,
            enabled: !!Number(data.chatId),
            select: (res) => {
                return res.data.data;
            },
        });
    };

    handleCreateCall = () => {
        return useMutation((data: { chatId: number | undefined; targets_user_id?: number[] | string[]; confee_video_room: string }) =>
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

    handleJoinCall = () => {
        return {
            mutate: (data: { chat_id: number | null; call_id: number }) => {
                this.socket.sendMessage('JoinedCall', data);
            },
        };
    };
}

export default new CallApi();

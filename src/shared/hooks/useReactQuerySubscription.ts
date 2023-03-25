import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import { http } from 'shared/constanst';
import { TokenService } from 'shared/services';

async function useReactQuerySubscription(): Promise<{
    on: (action: string, callback: (arg: any) => void) => void;
    emit: (action: string, data: any) => void;
    // queryClient: any;
}> {
    // const [socket, setSocket] = useState<any>(null);
    const tokens = await TokenService.get();
    // const queryClient = useQueryClient();
    // useEffect(() => {
    const socket = io('http://dev.hoolichat.ru', {
        extraHeaders: {
            Authorization: `Bearer ${tokens ? tokens.access_token : ''}`,
        },
        forceNew: true,
    });
    // setSocket(socket);
    // }, []);
    return { on: socket.on, emit: socket.emit };
}

export default useReactQuerySubscription;

import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { ChatDossierView, ChatApi, useChatStore } from 'entities/chat';
import { usePrevious } from 'shared/hooks';

type Props = {
    direction?: 'column' | 'row';
};

function ChatDossier(props: Props) {
    const { direction } = props;

    const params = useParams();

    const queryClient = useQueryClient();
    // const { data, isLoading, isError, refetch } = UserApi.handleGetUser({ id: params.user_id });

    const users: any = queryClient.getQueryData(['get-users']);
    const user = users?.data.data.find((i: any) => i.id === 23);

    const prevUser = usePrevious(user);

    // useEffect(() => {
    //     refetch().then();
    // }, [params.user_id]);

    return <ChatDossierView chat={user || prevUser} loading={false} direction={direction} />;
}

export default ChatDossier;

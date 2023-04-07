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

    const { data, isLoading, isError } = ChatApi.handleGetChat({ chatId: Number(params.chat_id) });
    return <ChatDossierView chat={data?.data?.data} loading={isLoading} direction={direction} error={isError} />;
}

export default ChatDossier;

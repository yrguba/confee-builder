import React from 'react';
import { useParams } from 'react-router';
import { useLocation } from 'react-router-dom';

import { ChatApi } from 'entities/chat';
import { http } from 'shared/constanst';
import { ResponsiveMediaContents } from 'shared/ui';

type Props = {
    gap?: number;
    imgSize?: number;
    hardGrid?: boolean;
};

function ChatMediaContent(props: Props) {
    const { gap, imgSize, hardGrid } = props;

    const params = useParams();
    const { pathname } = useLocation();

    const getType = () => {
        const path = pathname.split('/').pop();
        if (path === 'files') return 'documents';
        return path;
    };

    const type = getType();

    if ((!params.chat_id && !params.user_id) || !type) return null;

    const { data } = ChatApi.handleGetChatFiles({
        id: params?.chat_id || params?.user_id,
        byUserId: !params.chat_id && !!params.user_id,
        fileType: type,
    });

    const files = data?.data?.data.files.map((i) => ({ url: `${http.url}${i.url}`, name: i.name }));
    return <ResponsiveMediaContents type={type as any} list={files || []} gap={gap} imgSize={imgSize} hardGrid={hardGrid} />;
}

export default ChatMediaContent;

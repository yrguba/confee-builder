import React from 'react';
import { useParams } from 'react-router';

import { ChatApi } from 'entities/chat';
import { http } from 'shared/constanst';
import { ResponsiveMediaContents } from 'shared/ui';

type Props = {
    gap?: number;
    imgSize?: number;
    hardGrid?: boolean;
};

function ChatImagesList(props: Props) {
    const { gap, imgSize, hardGrid } = props;

    const params = useParams();

    if (!params.chat_id && !params.user_id) return null;

    const { data } = ChatApi.handleGetChatFiles({
        id: params?.chat_id || params?.user_id,
        byUserId: !params.chat_id && !!params.user_id,
        fileType: 'images',
    });

    const images = data?.data?.data.files.map((i) => `${http.url}${i.url}`);
    return <ResponsiveMediaContents type="image" list={images || []} gap={gap} imgSize={imgSize} hardGrid={hardGrid} />;
}

export default ChatImagesList;

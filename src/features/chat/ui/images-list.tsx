import React from 'react';
import { useParams } from 'react-router';

import { ChatImagesListView, ChatApi } from 'entities/chat';
import { http } from 'shared/constanst';

type Props = {
    gap?: number;
    imgSize?: number;
    hardGrid?: boolean;
};

function ChatImagesList(props: Props) {
    const { gap, imgSize, hardGrid } = props;

    const params = useParams();

    if (!params.chat_id) return null;

    const { data } = ChatApi.handleGetChatFiles({ chatId: Number(params.chat_id), fileType: 'images' });
    const images = data?.data?.data.files.map((i) => `${http.url}${i.url}`);
    return <ChatImagesListView images={images || []} gap={gap} imgSize={imgSize} hardGrid={hardGrid} />;
}

export default ChatImagesList;

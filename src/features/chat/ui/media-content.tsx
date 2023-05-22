import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useLocation } from 'react-router-dom';
import { number } from 'yup';

import { ChatApi } from 'entities/chat';
import { http } from 'shared/constanst';
import { ResponsiveMediaContents, useModal, Modal } from 'shared/ui';

import { SwiperModal } from '../../../entities/modal';

type Props = {
    gap?: number;
    imgSize?: number;
    hardGrid?: boolean;
};

function ChatMediaContent(props: Props) {
    const { gap, imgSize, hardGrid } = props;

    const params = useParams();
    const { pathname } = useLocation();

    const modalSwiper = useModal();

    const [startWithIt, setStartWithIt] = useState(1);

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

    const imgClick = (index: number) => {
        setStartWithIt(index);
        modalSwiper.open();
    };

    const files = data?.data?.data.files.map((i) => ({ url: `${http.url}${i.url}`, name: i.name }));
    return (
        <>
            <ResponsiveMediaContents imgClick={imgClick} type={type as any} list={files || []} gap={gap} imgSize={imgSize} hardGrid={hardGrid} />
            <Modal {...modalSwiper} onOk={modalSwiper.close} onClose={modalSwiper.close}>
                <SwiperModal startWithIt={startWithIt} files={files as any} />
            </Modal>
        </>
    );
}

export default ChatMediaContent;

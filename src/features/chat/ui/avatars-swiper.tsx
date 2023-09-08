import React from 'react';

import { chatApi } from 'entities/chat';
import { useEasyState } from 'shared/hooks';
import { Modal, Input, Notification, ModalTypes, Image } from 'shared/ui';

type Props = {
    chatId: number;
};

function ChatAvatarsSwiper(props: Props) {
    const { data: imagesData } = chatApi.handleGetAvatars({ chatId: props.chatId });

    const swiperState = useEasyState<{ visible: boolean; initial: number }>({ visible: true, initial: 0 });

    const updItems = imagesData?.map((i, index) => ({
        id: i,
        url: i || '',
    }));

    return (
        <Image.Swiper
            initialSlide={swiperState.value.initial}
            closeClick={() => swiperState.set({ visible: false, initial: 1 })}
            visible={swiperState.value.visible}
            items={imagesData?.length ? updItems : []}
        />
    );
}

export default ChatAvatarsSwiper;

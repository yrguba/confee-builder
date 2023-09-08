import React from 'react';

import { userApi, UserProfileView } from 'entities/user';
import { useEasyState } from 'shared/hooks';
import { Modal, Input, Notification, ModalTypes, Image } from 'shared/ui';

type Props = {
    userId: number;
};

function UserAvatarsSwiper(props: Props) {
    const { data: imagesData } = userApi.handleGetAvatars({ userId: props.userId });

    const swiperState = useEasyState<{ visible: boolean; initial: number }>({ visible: false, initial: 1 });

    const updItems = imagesData?.map((i, index) => ({
        id: i.id,
        url: i.link || '',
        width: '49%',
        horizontalImgWidth: '99%',
        height: '200px',
        onClick: () => swiperState.set({ visible: true, initial: index }),
    }));

    return (
        <Image.Swiper
            initialSlide={swiperState.value.initial}
            closeClick={() => swiperState.set({ visible: false, initial: 1 })}
            visible={swiperState.value.visible}
            items={updItems}
        />
    );
}

export default UserAvatarsSwiper;

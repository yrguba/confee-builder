import React from 'react';

import { userApi } from 'entities/user';
import { useEasyState } from 'shared/hooks';
import { Modal, Input, Notification, ModalTypes, Image } from 'shared/ui';

type Props = {
    userId?: number;
    visible: boolean;
    onClose: () => void;
};

function UserAvatarsSwiper(props: Props) {
    const { userId, onClose, visible } = props;

    const { data: imagesData } = userApi.handleGetAvatars({ userId });

    const updItems = imagesData?.map((i, index) => ({
        id: i,
        url: i || '',
    }));

    return <Image.Swiper initialSlide={0} closeClick={onClose} visible={visible} items={updItems?.length ? updItems.reverse() : []} />;
}

export default UserAvatarsSwiper;

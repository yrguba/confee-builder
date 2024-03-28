import React from 'react';

import { useEasyState } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Box, Image } from 'shared/ui';

import styles from './styles.module.scss';
import usePhotoVideoSwiper from '../../../../../app/lib/usePhotoVideoSwiper';
import { MessageProxy } from '../../../../model/types';
import Info from '../../info';

type Props = {
    message: MessageProxy;
} & BaseTypes.Statuses;

function ImagesMessage(props: Props) {
    const { message } = props;

    const swiper = usePhotoVideoSwiper();

    const visibleInfo = useEasyState(false);

    const images = message.files.length ? message.files : message.forwarded_from_message?.files;

    const updItems = images?.map((i, index) => ({
        id: i.id,
        name: i.name,
        url: i.url || '',
        width: 'auto',
        height: '220px',
    }));

    const imgClick = () => {
        swiper.open({ items: updItems as any });
    };

    return (
        <div className={styles.wrapper} onMouseEnter={() => visibleInfo.set(true)} onMouseLeave={() => visibleInfo.set(false)}>
            <Image.List
                imgClick={imgClick}
                visibleDropdown={false}
                items={updItems}
                style={{ maxWidth: updItems && updItems?.length < 2 ? '250px' : '360px' }}
            />
            <Box.Animated visible={visibleInfo.value} className={styles.info}>
                <Info
                    date={message.date}
                    is_edited={message.is_edited}
                    sendingError={message.sendingError}
                    sending={message.sending}
                    isMy={message.isMy}
                    checked={!!message.users_have_read?.length}
                />
            </Box.Animated>
        </div>
    );
}

export default ImagesMessage;

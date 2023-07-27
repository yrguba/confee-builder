import React, { useState } from 'react';

import { Avatar, Title, DropdownMenu, DropdownTypes, WebCameraPhoto, Box } from 'shared/ui';

import Icons from './icons';
import styles from './styles.module.scss';
import { AvatarChangeProps } from '../../types';

function AvatarChange(props: AvatarChangeProps) {
    const { img, name, selectFile, size = 80, deleteFile, getScreenshot } = props;

    const [visibleCamera, setVisibleCamera] = useState(false);

    const action = (data: string) => {
        setVisibleCamera(false);
        getScreenshot(data);
    };

    const items: DropdownTypes.DropdownMenuItem[] = [
        { id: 0, icon: <Icons variants="select" />, title: 'Выбрать файл', action: selectFile },
        { id: 1, icon: <Icons variants="makePhoto" />, title: 'Сделать фото', action: () => setVisibleCamera(!visibleCamera) },
        { id: 2, icon: <Icons variants="delete" />, isRed: true, title: 'Удалить фото', action: deleteFile },
    ];

    return (
        <div className={styles.wrapper}>
            <Box.Animated visible={visibleCamera} className={styles.webCamera}>
                <WebCameraPhoto getScreenshot={action} />
            </Box.Animated>
            <DropdownMenu closeAfterClick position="right-bottom" left={44} top={50} items={items}>
                <div className={styles.circle}>
                    <Avatar img={img || ''} name={name} size={size} />
                    <div className={styles.cover}>Сменить</div>
                </div>
            </DropdownMenu>
        </div>
    );
}

export default AvatarChange;

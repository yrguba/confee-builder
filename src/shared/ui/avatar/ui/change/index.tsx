import React, { useEffect, useState } from 'react';

import { Avatar, Title, Dropdown, DropdownTypes, WebCameraPhoto, Box } from 'shared/ui';

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
        { id: 0, icon: <Icons variant="select" />, title: 'Выбрать файл', action: selectFile },
        { id: 1, icon: <Icons variant="makePhoto" />, title: 'Сделать фото', action: () => setVisibleCamera(!visibleCamera) },
        { id: 2, icon: <Icons variant="delete" />, isRed: true, title: 'Удалить фото', action: deleteFile, hidden: !img },
    ];

    return (
        <div className={styles.wrapper}>
            <Box.Animated visible={visibleCamera} className={styles.webCamera}>
                <WebCameraPhoto getScreenshot={action} />
            </Box.Animated>
            <Dropdown.Menu closeAfterClick position="right-bottom" items={items.filter((i) => !i.hidden)} left={size - 70}>
                <div className={styles.circle}>
                    <Avatar img={img || ''} name={name} size={size} />
                    <div className={styles.cover}>Сменить</div>
                </div>
            </Dropdown.Menu>
        </div>
    );
}

export default AvatarChange;

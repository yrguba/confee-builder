import React, { useState } from 'react';

import { Avatar, DropdownTypes, WebCameraPhoto, Box, ContextMenu, ContextMenuTypes } from 'shared/ui';

import Icons from './icons';
import styles from './styles.module.scss';
import { useEasyState } from '../../../../hooks';
import { AvatarChangeProps } from '../../types';

function AvatarChange(props: AvatarChangeProps) {
    const { img, name, clickAvatar, dropdownLeft, dropdownTop, selectFile, circle = true, size = 80, deleteFile, getScreenshot } = props;

    const [visibleCamera, setVisibleCamera] = useState(false);

    const visibleMenu = useEasyState(false);

    const action = (data: string) => {
        setVisibleCamera(false);
        getScreenshot(data);
    };

    const items: ContextMenuTypes.ContextMenuItem[] = [
        { id: 0, icon: <Icons variant="select" />, title: 'Выбрать файл', callback: selectFile },
        { id: 1, icon: <Icons variant="makePhoto" />, title: 'Сделать фото', callback: () => setVisibleCamera(!visibleCamera) },
        { id: 2, icon: <Icons variant="delete" />, isRed: true, title: 'Удалить фото', callback: deleteFile, hidden: !img },
    ];

    const clickContextMenu = (e: any) => {
        e.preventDefault();
        visibleMenu.set(true);
    };

    return (
        <div className={styles.wrapper} onMouseLeave={() => visibleMenu.set(false)} onContextMenu={clickContextMenu}>
            <Box.Animated visible={visibleCamera} className={styles.webCamera}>
                <WebCameraPhoto getScreenshot={action} />
            </Box.Animated>
            <ContextMenu visible={visibleMenu.value} items={items.filter((i) => !i.hidden)} />
            <div className={styles.avatar} style={{ borderRadius: circle ? '50%' : 8 }}>
                <Avatar clickAvatar={clickAvatar} circle={circle} img={img || ''} name={name} size={size} />
                {/* <div className={styles.cover}>Сменить</div> */}
            </div>
        </div>
    );
}

export default AvatarChange;

import React, { useState } from 'react';

import { BaseTypes } from 'shared/types';
import { Avatar, Title, DropdownMenu, DropdownTypes, WebCamera, Box } from 'shared/ui';

import Icons from './icons';
import styles from './styles.module.scss';
import { Viewer } from '../../model/types';

type Props = {
    viewer: Viewer | BaseTypes.Empty;
    selectFile: () => void;
    getScreenshot: (data: string) => void;
    deleteFile: () => void;
    avatar?: string;
};

function AvatarEditor(props: Props) {
    const { avatar, viewer, selectFile, deleteFile, getScreenshot } = props;

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
                <WebCamera getScreenshot={action} />
            </Box.Animated>
            <DropdownMenu closeAfterClick position="right-bottom" left={44} top={50} items={items}>
                <div className={styles.circle}>
                    <Avatar withHttp={false} img={avatar || ''} name={viewer?.first_name} size={100} />
                    <div className={styles.cover}>Сменить</div>
                </div>
            </DropdownMenu>
        </div>
    );
}

export default AvatarEditor;

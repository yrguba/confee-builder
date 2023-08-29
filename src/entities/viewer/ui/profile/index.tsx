import React from 'react';

import { BaseTypes } from 'shared/types';
import { Avatar, Icons, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { Viewer } from '../../model/types';

type Props = {
    user: Viewer | BaseTypes.Empty;
    selectFile: () => void;
    deleteFile: () => void;
    getScreenshot: (img: string) => void;
    modals: {
        openChangeNameModal: () => void;
        openChangeAboutMeModal: () => void;
        openChangeNickname: () => void;
        openChangePhone: () => void;
        openChangeEmail: () => void;
        openChangeBirth: () => void;
    };
} & BaseTypes.Statuses;

function ViewerProfileView(props: Props) {
    const { user, deleteFile, selectFile, getScreenshot, modals } = props;

    const items = [
        { id: 0, title: `${user?.first_name} ${user?.last_name}`, subtitle: 'Имя и фамилия', onClick: modals.openChangeNameModal },
        // { id: 1, title: '', subtitle: 'О себе', onClick: () => '' },
        { id: 2, title: user?.nickname, subtitle: 'Никнейм', onClick: modals.openChangeNickname },
        { id: 3, title: user?.phone, subtitle: 'Номер телефона', onClick: modals.openChangePhone },
        { id: 4, title: user?.email, subtitle: 'Почта', onClick: modals.openChangeEmail },
        { id: 5, title: user?.birth?.split(' ')[0] || '', subtitle: 'Дата рождения', onClick: modals.openChangeBirth },
    ];

    return (
        <div className={styles.wrapper}>
            <Title variant="H2">Личная информация</Title>
            <div className={styles.body}>
                {items.map((item) => (
                    <div key={item.id} className={styles.item} onClick={item.onClick}>
                        {item.id === 0 && (
                            <Avatar.Change
                                selectFile={selectFile}
                                deleteFile={deleteFile}
                                getScreenshot={getScreenshot}
                                img={user?.avatar}
                                name={user?.first_name}
                            />
                        )}
                        <div className={styles.left}>
                            <div className={styles.aboutMe}>
                                <Title textWrap variant="H3M">
                                    {item.title}
                                </Title>
                            </div>
                            <Title primary={false} variant="H4M">
                                {item.subtitle}
                            </Title>
                        </div>
                        <div>
                            <Icons variant="arrow-drop-right" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ViewerProfileView;

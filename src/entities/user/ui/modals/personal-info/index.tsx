import React from 'react';

import { BaseTypes } from 'shared/types';
import { Avatar, Icons, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { viewerTypes } from '../../../../viewer';
import { User } from '../../../model/types';

type Props = {
    user: User | BaseTypes.Empty;
    isViewer?: boolean;
    selectFile: () => void;
    deleteFile: () => void;
    getScreenshot: (img: string) => void;
    getChangeModals: (modalName: viewerTypes.ModalName, disabled?: boolean) => void;
} & BaseTypes.Statuses;

function PersonalInfoModalView(props: Props) {
    const { user, isViewer, deleteFile, selectFile, getScreenshot, getChangeModals } = props;

    const items = [
        { id: 0, title: `${user?.first_name} ${user?.last_name}`, subtitle: 'Имя и фамилия', onClick: () => getChangeModals('change-name') },
        {
            id: 1,
            title: '1dwdwd',
            subtitle: 'О себе',
            onClick: () => getChangeModals('change-name', true),
        },
        { id: 2, title: user?.nickname, subtitle: 'Никнейм', onClick: () => getChangeModals('change-nickname') },
        { id: 3, title: user?.phone, subtitle: 'Номер телефона', onClick: () => getChangeModals('change-name', true) },
        { id: 4, title: user?.email, subtitle: 'Почта', onClick: () => getChangeModals('change-name', true) },
        { id: 5, title: user?.birth?.split(' ')[0] || '', subtitle: 'Дата рождения', onClick: () => getChangeModals('change-birth') },
    ];

    return (
        <div className={styles.wrapper}>
            <Title variant="H2">Личная информация</Title>
            <div className={styles.body}>
                {items.map((item) => (
                    <div key={item.id} className={styles.item} style={{ pointerEvents: isViewer ? 'visible' : 'none' }} onClick={item.onClick}>
                        {item.id === 0 && (
                            <Avatar.Change
                                withUrl
                                selectFile={selectFile}
                                deleteFile={deleteFile}
                                getScreenshot={getScreenshot}
                                img={user?.avatar?.path}
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
                        {isViewer && (
                            <div>
                                <Icons variants="arrow-drop-right" />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PersonalInfoModalView;

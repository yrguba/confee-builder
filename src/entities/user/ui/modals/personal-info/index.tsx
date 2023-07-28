import React from 'react';

import { AppService } from 'entities/app';
import { BaseTypes } from 'shared/types';
import { Avatar, Icons, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { User } from '../../../model/types';

type Props = {
    user: User | BaseTypes.Empty;
    isViewer?: boolean;
    selectFile: () => void;
    deleteFile: () => void;
    getScreenshot: (img: string) => void;
} & BaseTypes.Statuses;

function PersonalInfoModalView(props: Props) {
    const { user, isViewer, deleteFile, selectFile, getScreenshot } = props;

    const { url } = AppService.getUrls();

    const items = [
        { id: 0, title: `${user?.first_name} ${user?.last_name}`, subtitle: 'Имя и фамилия' },
        { id: 1, title: '12З', subtitle: 'О себе' },
        { id: 2, title: user?.nickname, subtitle: 'Никнейм' },
        { id: 3, title: user?.phone, subtitle: 'Номер телефона' },
        { id: 4, title: user?.email, subtitle: 'Почта' },
        { id: 5, title: user?.birth, subtitle: 'Дата рождения' },
    ];

    return (
        <div className={styles.wrapper}>
            <Title variant="H2">Личная информация</Title>
            <div className={styles.body}>
                {items.map((item) => (
                    <div key={item.id} className={styles.item}>
                        {item.id === 0 ? (
                            isViewer ? (
                                <Avatar.Change
                                    withUrl
                                    selectFile={selectFile}
                                    deleteFile={deleteFile}
                                    getScreenshot={getScreenshot}
                                    img={user?.avatar.path}
                                    name={user?.first_name}
                                />
                            ) : (
                                <Avatar withUrl img={user?.avatar.path} name={user?.first_name} />
                            )
                        ) : null}
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
                                <Icons variants="rightArrow" />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PersonalInfoModalView;

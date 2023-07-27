import React, { ReactNode, useState } from 'react';

import { UseInputReturnedTypes } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Avatar, Box, Button, Icons, Input, LoadingIndicator, Select, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { useInput, useStyles } from '../../../../../shared/hooks';
import { ViewerTypes } from '../../../../viewer';
import { User } from '../../../model/types';
import UserStatusView from '../../status';

type Props = {
    user: User | BaseTypes.Empty;
    isViewer?: boolean;
} & BaseTypes.Statuses;

function PersonalInfoModalView(props: Props) {
    const { user, isViewer } = props;
    console.log(user);
    const [codeCountry, setCodeCountry] = useState('+7');

    const [activeTab, setActiveTab] = useState(0);

    const items = [
        { id: 0, title: `${user?.first_name} ${user?.last_active}`, subtitle: 'Имя и фамилия' },
        {
            id: 1,
            title: '12ЗанимаЗаЗанимаЗанимаЗанимаЗаниаЗанимаЗанимаЗанимаЗма',
            subtitle: 'О себе',
        },
        { id: 2, title: user?.nickname, subtitle: 'Никнейм' },
        { id: 3, title: user?.phone, subtitle: 'Номер телефона' },
        { id: 4, title: user?.email, subtitle: 'Почта' },
        { id: 5, title: user?.birth, subtitle: 'Дата рождения' },
    ];

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Title variant="H2">Личная информация</Title>
            </div>
            {/* <ItemWrapper> */}
            {/*    <div className={styles.header}>dwadd</div> */}
            {/* </ItemWrapper> */}
            <div className={styles.body}>
                {items.map((item) => (
                    <div key={item.id} className={styles.item}>
                        {item.id === 0 && <Avatar.Change selectFile={() => ''} deleteFile={() => ''} getScreenshot={() => ''} img="" name={user?.first_name} />}
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

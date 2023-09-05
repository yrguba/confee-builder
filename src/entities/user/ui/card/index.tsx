import React from 'react';

import { BaseTypes } from 'shared/types';
import { Avatar, Box, Button, Icons, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { useWidthMediaQuery } from '../../../../shared/hooks';

type Props = {
    avatar: string;
    name: string;
    nickname: string;
    phone: string;
    birth: string;
    aboutMe: string;
    visibleActionsMenu?: boolean;
    visibleHeader?: boolean;
    networkStatus?: string;
    type?: 'contact' | 'employee';
} & BaseTypes.Statuses;

function UserCardView(props: Props) {
    const { networkStatus, visibleHeader, type, avatar, name, nickname, aboutMe, birth, phone, loading, visibleActionsMenu } = props;

    const secondaryInfo: { id: number; title: string; subtitle: string }[] = [
        { id: 0, title: 'Никнейм', subtitle: `@${nickname}` },
        { id: 1, title: 'Номер телефона', subtitle: phone },
        { id: 2, title: 'Дата рождения', subtitle: birth },
        { id: 3, title: 'О себе', subtitle: '' },
    ];

    const sharedBtn: BaseTypes.Item[] = [
        { id: 0, title: 'Аудио', icon: 'phone', payload: '', callback: () => '' },
        { id: 1, title: 'Видео', icon: 'videocam', payload: '', callback: () => '' },
        { id: 2, title: 'Чат', icon: 'chat', payload: '', callback: () => '' },
    ];

    const btnsContact: BaseTypes.Item[] = [...sharedBtn, { id: 2, title: 'Ещё', icon: 'more', payload: '', callback: () => '' }];
    const btnsEmployee: BaseTypes.Item[] = [...sharedBtn, { id: 3, title: 'Выкл.', icon: 'mute', payload: '', callback: () => '' }];

    const sm = useWidthMediaQuery().to('sm');

    return (
        <Box.Animated visible loading={loading} className={styles.wrapper}>
            {visibleHeader && (
                <div className={styles.header}>
                    <div className={styles.name}>
                        <Title variant="H1">{name}</Title>
                        <Button tag>dw</Button>
                    </div>
                    <Title textAlign="right" variant="H4M">
                        {networkStatus}
                    </Title>
                </div>
            )}
            <div className={styles.body}>
                <div className={styles.avatar} style={{ width: sm ? 346 : 375 }}>
                    <Avatar circle={false} size={sm ? 346 : 375} img={avatar} />
                    {visibleActionsMenu && (
                        <div className={styles.btns} style={{ width: sm ? 346 : 375 }}>
                            {type === 'contact'
                                ? btnsContact.map((i) => (
                                      <Button
                                          direction="vertical"
                                          prefixIcon={i.id === 3 ? <Icons.Player variant={i.icon} /> : <Icons variant={i.icon} />}
                                          onClick={i.callback}
                                      >
                                          {i.title}
                                      </Button>
                                  ))
                                : btnsEmployee.map((i) => (
                                      <Button
                                          direction="vertical"
                                          prefixIcon={i.id === 3 ? <Icons.Player variant={i.icon} /> : <Icons variant={i.icon} />}
                                          onClick={i.callback}
                                      >
                                          {i.title}
                                      </Button>
                                  ))}
                        </div>
                    )}
                </div>

                <div className={styles.info}>
                    {!visibleHeader && <Title variant="H1">{name}</Title>}
                    <div className={styles.secondaryInfo}>
                        {secondaryInfo.map((i) => (
                            <div key={i.id} className={styles.item}>
                                <Title variant="H4M" primary={false}>
                                    {i.title}
                                </Title>
                                <Title variant="H3M">{i.subtitle}</Title>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Box.Animated>
    );
}

export default UserCardView;

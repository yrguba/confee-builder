import React from 'react';

import { BaseTypes } from 'shared/types';

import styles from './styles.module.scss';
import { momentLocalZone } from '../../../../../shared/lib';
import { Avatar, Button, Card, Icons, Title } from '../../../../../shared/ui';
import { Session } from '../../../model/types';

type Props = {
    sessions?: Session[];
} & BaseTypes.Statuses;

function SessionsModalView(props: Props) {
    const { sessions } = props;

    const currentSession = sessions?.find((i) => i.is_current);

    return (
        <div className={styles.wrapper}>
            <Title textAlign="center" variant="H2">
                Устройства
            </Title>
            <div className={styles.currentSession}>
                <Title color="inactive" variant="H4R">
                    Это устройство
                </Title>
                <SessionCard
                    isCurrent
                    os={currentSession?.os_name}
                    browser={currentSession?.browser}
                    location={currentSession?.location}
                    updated_at={currentSession?.updated_at}
                />
            </div>
            <Button>Завершить другие сеансы</Button>
            <div className={styles.otherSessions}>
                <Title color="inactive" variant="H4R">
                    Активные сеансы
                </Title>
                {sessions
                    ?.filter((i) => !i.is_current)
                    .map((i) => (
                        <div className={styles.item}>
                            <SessionCard os={i?.os_name} browser={i?.browser} location={i?.location} updated_at={i?.updated_at} />
                            <div>
                                <Icons variant="close" />
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

type CardProps = {
    isCurrent?: boolean;
    os?: string;
    browser?: string;
    location?: string;
    deviceName?: string;
    deviceType?: string;
    updated_at?: Date;
};

function SessionCard(props: CardProps) {
    const { isCurrent, os, location, browser, deviceName, deviceType = 'unknown', updated_at } = props;
    return (
        <div className={styles.card}>
            <div className={`${styles.icon} ${isCurrent ? styles.icon_current : ''}`}>
                <Icons.Devices variant={deviceType as any} />
            </div>
            <div className={styles.descriptoins}>
                <Title variant="H3M">{deviceName || 'Неизвестное устройство'}</Title>
                <Title variant="H4M">{os || 'Система не определена'}</Title>
                <Title textWrap primary={false} variant="H4R">
                    {`${location || 'Местоположение не определено'}, ${isCurrent ? 'в сети' : momentLocalZone(updated_at).format('DD.MM.YYYY, HH:mm ')}`}
                </Title>
            </div>
        </div>
    );
}

export default SessionsModalView;

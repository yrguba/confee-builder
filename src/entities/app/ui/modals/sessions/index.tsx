import React from 'react';

import { momentLocalZone } from 'shared/lib';
import { BaseTypes } from 'shared/types';
import { Button, Icons, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { Session } from '../../../../viewer/model/types';

type Props = {
    sessions?: Session[];
    deleteSessions: (ids: string[]) => void;
} & BaseTypes.Statuses;

function SessionsModalView(props: Props) {
    const { sessions, deleteSessions } = props;

    const currentSession = sessions?.find((i) => i.is_current);
    const otherSessions = sessions?.filter((i) => !i.is_current);
    const otherSessionsIds = otherSessions?.map((i) => i.id);
    return (
        <div className={styles.wrapper}>
            <div>
                <Title textAlign="center" variant="H2">
                    Устройства
                </Title>
            </div>
            <div className={styles.currentSession}>
                <Title color="inactive" variant="H4R">
                    Это устройство
                </Title>
                <SessionCard
                    isCurrent
                    os={currentSession?.os_name}
                    browser={currentSession?.browser}
                    location={decodeURI(currentSession?.location || '')}
                    updated_at={currentSession?.updated_at}
                    deviceName={decodeURI(currentSession?.device_name || '')}
                />
            </div>
            <div className={styles.clearOther}>
                <Button disabled={!otherSessionsIds?.length} onClick={() => otherSessionsIds?.length && deleteSessions(otherSessionsIds)}>
                    Завершить другие сеансы
                </Button>
            </div>
            {otherSessions?.length ? (
                <div className={styles.otherSessions}>
                    <Title color="inactive" variant="H4R">
                        Активные сеансы
                    </Title>
                    {otherSessions?.map((i) => (
                        <div key={i.id} className={styles.item}>
                            <SessionCard os={i?.os_name} browser={i?.browser} location={i?.location} updated_at={i?.updated_at} />
                            <div onClick={() => deleteSessions([i.id])}>
                                <Icons variant="close" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : null}
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

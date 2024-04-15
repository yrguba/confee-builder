import React from 'react';

import { BaseTypes } from 'shared/types';
import { Avatar, Button, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { Responses } from '../../model/types';

type Props = {
    joining: (value: boolean) => void;
    avatar?: string;
    name?: string;
    type: 'in' | 'out';
    response: Responses | null;
    createCall: () => void;
} & BaseTypes.Statuses;

function PreJoinView(props: Props) {
    const { createCall, response, type, joining, avatar, name } = props;
    console.log(response);

    const getTitle = () => {
        if (response === 'reject') return `${name} отменил звонок`;
        if (type === 'out') {
            if (response === 'timeout') return `${name} не ответил`;
            return `ждем ответа...`;
        }
        if (response === 'timeout') return `${name} звонил вам`;
        return 'приглашает присоединиться к конференции';
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.user}>
                <Avatar size={170} img={avatar} />
                <Title textAlign="center" variant="H2">
                    {name}
                </Title>
            </div>
            <Title textAlign="center" variant="H3R">
                {getTitle()}
            </Title>
            {type === 'in' ? (
                response === 'timeout' ? null : (
                    <div className={styles.btns}>
                        <Button onClick={() => joining(false)} variant="secondary">
                            Отклонить
                        </Button>
                        <Button onClick={() => joining(true)}>Присоединиться</Button>
                    </div>
                )
            ) : (
                <div className={styles.btns}>
                    <Button onClick={() => joining(false)} variant="secondary">
                        Отменить
                    </Button>
                    {(response === 'timeout' || response === 'reject') && (
                        <Button onClick={createCall} variant="secondary">
                            Перезвонить
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}

export default PreJoinView;

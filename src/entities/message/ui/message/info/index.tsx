import React from 'react';

import { BaseTypes } from 'shared/types';
import { Box, Icons, Title } from 'shared/ui';

import styles from './styles.module.scss';

type Props = {
    sending: boolean;
    sendingError: boolean;
    isMy: boolean;
    is_edited: boolean;
    date: string;
    checked: boolean;
} & BaseTypes.Statuses;

function Info(props: Props) {
    const { sending, is_edited, sendingError, isMy, date, checked } = props;

    return (
        <div className={styles.wrapper}>
            {is_edited && (
                <div className={styles.edited}>
                    <Title variant="Body14">Изменено</Title>
                </div>
            )}
            <div>
                <Title primary={false} variant="H4R">
                    {date}
                </Title>
            </div>
            <Box.Animated visible trigger={`${sending}${sendingError}`} className={styles.icon}>
                {isMy && !sending && !sendingError && <Icons variant={checked ? 'double-check' : 'check'} />}
                {sending && <Icons variant="clock" />}
                {sendingError && <Icons variant="error" />}
            </Box.Animated>
        </div>
    );
}

export default Info;

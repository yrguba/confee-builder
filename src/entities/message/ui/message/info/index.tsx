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
    bg?: boolean;
} & BaseTypes.Statuses;

function Info(props: Props) {
    const { bg, sending, is_edited, sendingError, isMy, date, checked } = props;

    return (
        <div className={styles.wrapper} style={{ background: bg ? 'rgba(1,1,1, 0.5)' : '' }}>
            {is_edited && (
                <div className={styles.edited}>
                    <Title color={bg ? 'fixed' : ''} variant="Body14">
                        Изменено
                    </Title>
                </div>
            )}
            <div className={styles.date}>
                <Title color={bg ? 'fixed' : ''} primary={false} variant="H4R">
                    {date}
                </Title>
            </div>
            <Box.Animated visible={sendingError || sending || isMy} trigger={`${sending}${sendingError}`} className={styles.icon}>
                {isMy && !sending && !sendingError && <Icons variant={checked ? 'double-check' : 'check'} />}
                {sending && <Icons variant="clock" />}
                {sendingError && <Icons variant="error" />}
            </Box.Animated>
        </div>
    );
}

export default Info;

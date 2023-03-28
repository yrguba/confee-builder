import React, { ReactNode } from 'react';

import { useDate } from 'shared/hooks';
import { baseTypes } from 'shared/types';

import styles from './styles.module.scss';
import { Massage } from '../../../model/types';
import Wrapper from '../wrapper';

type Props = {
    message: Massage;
} & baseTypes.Statuses;

function TextMessageView(props: Props) {
    const { message } = props;

    const date = useDate(message.created_at);

    return (
        <Wrapper avatar={message.user.avatar} name={message.user.name} date={date}>
            <div className={styles.wrapper}>{message.text}</div>
        </Wrapper>
    );
}

export default TextMessageView;

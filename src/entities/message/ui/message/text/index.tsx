import React, { ReactNode } from 'react';

import { baseTypes } from 'shared/types';

import styles from './styles.module.scss';
import { Massage } from '../../../model/types';
import Wrapper from '../wrapper';

type Props = {
    message: Massage;
} & baseTypes.Statuses;

function TextMessageView(props: Props) {
    const { message } = props;

    return (
        <Wrapper>
            <div className={styles.wrapper}>{message.id}</div>
        </Wrapper>
    );
}

export default TextMessageView;

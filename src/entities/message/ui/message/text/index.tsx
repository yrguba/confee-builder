import React, { ReactNode } from 'react';

import { baseTypes } from 'shared/types';

import styles from './styles.module.scss';
import Wrapper from '../wrapper';

type Props = {
    children: ReactNode;
} & baseTypes.Statuses;

function TextMessage(props: Props) {
    const { children } = props;

    return (
        <Wrapper>
            <div className={styles.wrapper}>{children}</div>;
        </Wrapper>
    );
}

export default TextMessage;

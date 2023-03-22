import React, { ReactNode } from 'react';

import { baseTypes } from 'shared/types';

import styles from './styles.module.scss';

type Props = {
    children: ReactNode;
} & baseTypes.Statuses;

function Wrapper(props: Props) {
    const { children } = props;

    return <div className={styles.wrapper}>{children}</div>;
}

export default Wrapper;

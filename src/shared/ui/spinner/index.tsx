import React from 'react';

import styles from './styles.module.scss';

type Props = {
    size?: number;
};

function Spinner(props: Props) {
    const { size = 30 } = props;
    return (
        <svg className={styles.spinner} viewBox="0 0 50 50" width={size} height={size}>
            <circle className={styles.path} cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
        </svg>
    );
}

export default Spinner;

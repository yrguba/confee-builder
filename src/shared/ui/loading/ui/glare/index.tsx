import React from 'react';

import styles from './styles.module.scss';

type Props = {
    visible: boolean;
};

function Glare(props: Props) {
    const { visible } = props;

    return visible ? <div className={styles.glare} /> : null;
}

export default Glare;

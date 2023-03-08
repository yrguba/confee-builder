import React from 'react';
import ReactSwitch, { ReactSwitchProps } from 'react-switch';

import styles from './styles.module.scss';

type Props = {} & ReactSwitchProps;

function Switch(props: Props) {
    const { ...other } = props;

    return <ReactSwitch className={styles.switch} {...other} />;
}

export default Switch;

import React from 'react';
import ReactSwitch from 'react-switch';

import styles from './styles.module.scss';
import { BaseSwitchProps } from '../types';

function Switch(props: BaseSwitchProps) {
    const { ...other } = props;

    return <ReactSwitch className={styles.switch} {...other} />;
}

export default Switch;
